import { createNavigationContainerRef, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/Auth';
import { useContext, useEffect, useState } from 'react';
import { PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@rneui/themed';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { EulaStack } from './EulaStack';
import { ChatProvider } from '../contexts/ChatContext';
import { useSessionContext } from '../contexts/SessionContext';
import { SessionModal } from '../components/Modals/SessionModal';
import { useDomainContext } from '../contexts/DomainContext';
import { FullPageLoader } from '../components/Loader/Loader';
import { useGlobalContext } from '../contexts/GlobalContext';
import { getVersion } from 'react-native-device-info';
import { FirebaseProvider } from '../contexts/Notifications';
import ErrorBoundary from '../components/ErrorBoundary';

// Move export to top level
export const navigationRef = createNavigationContainerRef();

/**
 * ? App should have only one NavigationContainer
 * ? Providers that relate with user/api interaction can be specified here
 * @returns Navigation Container for the whole App
 */

export const Router = () => {
  const { authData, eulaFlag, signOut } = useContext(AuthContext);
  const { isSessionTimeOut, isAppInactive, setSessionTimeOut, setAppInactive, appInactivityCheck, navigationListeners, appRevoking } = useSessionContext();
  const { domain } = useDomainContext();
  const { currentVersion, setIsAppDeprecated } = useGlobalContext();
  const [isAppReadyToLoad, setAppReadyToLoad] = useState(false);

  const { theme } = useTheme();

  // DEV: Set to true to bypass login and show Home directly
  const BYPASS_AUTH = true;
  const isAuthenticated = BYPASS_AUTH || !!authData;
  const isEulaAccepted = BYPASS_AUTH || !!eulaFlag;

  // React Navigation themes
  const authStackTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.brandColor,
      background: theme.colors.background,
      card: theme.colors.cardBg || DefaultTheme.colors.card,
      text: theme.colors.textColor,
      border: theme.colors.borderColor,
      notification: theme.colors.notificationBackground,
    },
  };

  useEffect(() => {
    if (BYPASS_AUTH || domain !== '') {
      setAppReadyToLoad(true);
    }
  }, [domain]);

  useEffect(() => {
    if (isSessionTimeOut || isAppInactive) {
      if (!BYPASS_AUTH && authData) {
        signOut();
        setSessionTimeOut(false);
      }
    }
  }, [isSessionTimeOut, isAppInactive]);

  useEffect(() => {
    if (isAuthenticated) {
      navigationListeners();
      appInactivityCheck();
    }
    if (!isAuthenticated) {
      isSessionTimeOut ? setSessionTimeOut(false) : setAppInactive(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const _appVersion = getVersion();
    if (currentVersion === '') return;
    if (_appVersion !== currentVersion) {
      setIsAppDeprecated(true);
    }
  }, [currentVersion]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => { 
      if (isAuthenticated) { 
        appInactivityCheck(); 
      } 
      return false; 
    },
    onStartShouldSetPanResponderCapture: () => { 
      if (isAuthenticated) { 
        appInactivityCheck(); 
      } 
      return false; 
    }
  });

  return (
    <ErrorBoundary>
      <NavigationContainer ref={navigationRef} theme={isAuthenticated ? navTheme : authStackTheme}>
        <SafeAreaView {...panResponder.panHandlers} style={{ width: '100%', height: '100%' }}>
          {appRevoking ? <FullPageLoader /> : <></>}
          {(isSessionTimeOut || isAppInactive) ? <SessionModal /> : <></>}
          {isAppReadyToLoad && isAuthenticated ?
            <FirebaseProvider>
              <ChatProvider>
                {isEulaAccepted ? <AppStack /> : <EulaStack />}
              </ChatProvider>
            </FirebaseProvider>
            : <AuthStack />}
        </SafeAreaView>
      </NavigationContainer>
    </ErrorBoundary>
  );
};