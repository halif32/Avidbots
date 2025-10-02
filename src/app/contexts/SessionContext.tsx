import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';
import { navigationRef } from '../navigations';
import { useAuth } from './Auth';
import { useDomainContext } from './DomainContext';
import { useGlobalContext } from './GlobalContext';

// Define the context type
interface SessionContextType {
  isSessionTimeOut: boolean;
  isAppInactive: boolean;
  setSessionTimeOut(value: boolean): void;
  setAppInactive(value: boolean): void;
  appInactivityCheck(): void;
  navigationListeners(): void;
  appRevoking: boolean;
}

// Create the context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Create a provider component
interface SessionContextProviderProps {
  children: ReactNode;
}

export function SessionContextProvider({ children }: SessionContextProviderProps) {
  const { sessionTimeOut, setSignInDisabled } = useGlobalContext();
  const [isSessionTimeOut, setSessionTimeOut] = useState(false);
  const [isAppInactive, setAppInactive] = useState(false);
  const appState = useRef(AppState.currentState);
  const { updateEulaFlag } = useAuth();
  const { updateDomain, domainList } = useDomainContext();
  const minutesInMilliseconds = sessionTimeOut * 60 * 1000; //covert minutes to milliseconds to calculate difference
  const inactivityTimeout = useRef(0);
  const [appRevoking, setAppRevoking] = useState(false);
  const { authData } = useAuth();

  const navigationListeners = () => {
    navigationRef.addListener('state', () => {
      if (navigationRef.current !== null) {
        const curentRoute = navigationRef.current?.getCurrentRoute()?.name;
        if (curentRoute === 'Login') {
          clearTimeout(inactivityTimeout.current);
          setAppInactive(false);
          return;
        }
        if (curentRoute === 'Live View') {
          clearTimeout(inactivityTimeout.current);
        } else {
          if (authData) {
            setAppInactive(false);
            appInactivityCheck();
          }
        }
      }
    });
  };

  const getDomain = async () => {
    const _domain = await AsyncStorage.getItem('domain');
    const _domainObj = domainList.find((d) => d.url === _domain);
    if (_domain !== null) {
      updateDomain(_domainObj);
    }
  };

  const getEulaStatus = async () => {
    const _eulastatus = await AsyncStorage.getItem('eulaFlag');
    if (_eulastatus !== null) {
      updateEulaFlag(JSON.parse(_eulastatus));
    }
  };

  const revokeAppState = async () => {
    await getDomain(); // restores domain from Async storage
    await getEulaStatus(); // checks eulaStatus from Async storage
    navigationListeners();
    appInactivityCheck();
    setAppRevoking(false);
  };

  /**
   *
   * @returns true if session less than 240 or false if first login or session more than 240 minutes
   */
  const checkAppSession = async () => {
    const prevTimeStamp: any = await AsyncStorage.getItem('loginTime');
    if (prevTimeStamp === null) {
      return false;
    } else {
      const timeDiff = moment().diff(moment(JSON.parse(prevTimeStamp)), 'milliseconds');
      if (timeDiff > minutesInMilliseconds) {
        clearTimeout(inactivityTimeout.current);
        setSessionTimeOut(true); // displays sessionModal
        await getDomain(); // restores domain from Async storage
      } else {
        setAppRevoking(true);
        await revokeAppState();
        AsyncStorage.setItem('loginTime', JSON.stringify(new Date().getTime())); //resets AsyncStorage loginTime
      }
    }
  };

  //session time out
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      //app becomes active from background
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        await getDomain();
        //since app state is preserved even in background, nothing is executed
        setSignInDisabled(false);
      }

      //when app becomes active from killed state (active state for android and unknown for iOS)
      if (Platform.OS === 'android') {
        if (appState.current.match(/active/) && nextAppState === 'active') {
          clearTimeout(inactivityTimeout.current);
          await checkAppSession();
        }
      } else {
        if (appState.current.match(/unknown/) && nextAppState === 'active') {
          clearTimeout(inactivityTimeout.current);
          await checkAppSession();
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [appState.current]);

  const appInactivityCheck = () => {
    clearTimeout(inactivityTimeout.current);
    inactivityTimeout.current = setTimeout(() => {
      setAppInactive(true);
    }, minutesInMilliseconds); // Set the inactivity timeout duration (in milliseconds)
  };

  const contextValue: SessionContextType = {
    isSessionTimeOut,
    isAppInactive,
    setSessionTimeOut,
    setAppInactive,
    appInactivityCheck,
    navigationListeners,
    appRevoking,
  };

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
}

// Custom hook to access the context
export function useSessionContext() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a Provider');
  }
  return context;
}
