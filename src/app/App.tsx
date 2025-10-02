import { ThemeProvider } from '@rneui/themed';
import { Router } from './navigations/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { NetworkErrorScreen } from './components/NetworkErrorScreen';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { PermissionsAndroid, Platform } from 'react-native';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import { theme } from '../theme';
import { Provider } from 'react-redux';
import { store } from './store';
import SplashScreen from 'react-native-splash-screen';

/**
 * ? Here App/Device Level Providers can be specified
 * @returns Root App Component
 */

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [isAppReady, setIsAppReady] = useState(false);

  const checkInternetConnection = () => {
    NetInfo.refresh().then((state) => {
      setIsConnected(state.isConnected);
    });
  };

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;
      return enabled;
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  const initializeApp = async () => {
    try {
      // Initialize permissions
      if (Platform.OS === 'android') {
        try {
          const res = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (res === 'granted' || res === 'never_ask_again') {
            await requestUserPermission();
          }
        } catch (err) {
          console.error('Android permission error:', err);
        }
      } else {
        await requestUserPermission();
      }

      // Wait for initial network status
      const netInfoState = await NetInfo.fetch();
      setIsConnected(netInfoState.isConnected);

      // Mark app as ready
      setIsAppReady(true);
      
    } catch (error) {
      console.error('App initialization error:', error);
      setIsAppReady(true); // Still set ready even if there's an error
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  // Hide splash screen when app is ready
  useEffect(() => {
    if (isAppReady) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500); // Reduced delay since initialization is complete
    }
  }, [isAppReady]);

  // Subscribe to network state updates
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const ThemeProviderContainer = () => {
    // Show nothing until app is ready (splash screen will be visible)
    if (!isAppReady) {
      return null;
    }

    return (
      <ThemeProvider theme={theme}>
        <RootSiblingParent>
          {!isConnected ? (
            <NetworkErrorScreen checkInternetConnection={checkInternetConnection} />
          ) : (
            <Provider store={store}>
              <Router />
            </Provider>
          )}
        </RootSiblingParent>
      </ThemeProvider>
    );
  };

  return (
    <GlobalContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeContextProvider>
          <ThemeProviderContainer />
        </ThemeContextProvider>
      </GestureHandlerRootView>
    </GlobalContextProvider>
  );
};

export default App;