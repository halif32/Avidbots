/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'; 
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, Alert, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DetailsScreen from './src/screens/DetailsScreen';

// Security Vulnerability 1: Hardcoded sensitive credentials
const API_KEYS = {
  secretKey: 'sk_live_1234567890abcdefghijklmnop',
  databasePassword: 'SuperSecret123!',
  adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9'
};

// Security Vulnerability 2: Insecure storage simulation
const insecureStorage = {
  userTokens: new Map(),
  storeToken: (token) => {
    insecureStorage.userTokens.set('currentUser', token);
    console.log('Token stored:', token); // Logging sensitive data
  }
};

// Security Vulnerability 3: Vulnerable function with eval
const processUserInput = (userInput) => {
  try {
    // Dangerous: Using eval with user input
    return eval(userInput);
  } catch (error) {
    return null;
  }
};

// Security Vulnerability 4: Certificate pinning bypass
const insecureFetch = async (url, options = {}) => {
  // Bypassing SSL certificate validation
  const response = await fetch(url, {
    ...options,
    // Disabling certificate validation (not actually possible in RN but demonstrating intent)
    // In real scenarios, people might disable certificate pinning
  });
  return response;
};

// Security Vulnerability 5: Weak random number generator
const generateWeakSessionId = () => {
  return Math.random().toString(36).substring(2); // Cryptographically weak
};

// Security Vulnerability 6: SQL injection vulnerable function
const buildUserQuery = (userId) => {
  // Direct string concatenation - SQL injection vulnerable
  return `SELECT * FROM users WHERE id = '${userId}'`;
};

// Security Vulnerability 7: XSS vulnerable function
const displayUserContent = (userContent) => {
  // Dangerous: Directly injecting user content without sanitization
  return `<div>${userContent}</div>`;
};

// Security Vulnerability 8: Insecure deep linking without validation
const handleInsecureDeepLink = (url) => {
  // No validation of deep link URLs
  Linking.openURL(url).catch(console.error);
};

// Create stack navigator
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // Security Vulnerability 9: Debug mode enabled in production
  const isDebugMode = true; // Should be false in production

  // Security Vulnerability 10: Storing sensitive data in component state
  const [sensitiveData, setSensitiveData] = React.useState({
    creditCard: '4111-1111-1111-1111',
    ssn: '123-45-6789'
  });

  // Security Vulnerability 11: Function with timing attack vulnerability
  const compareSecrets = (input, secret) => {
    // Timing attack vulnerable comparison
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== secret[i]) return false;
    }
    return input.length === secret.length;
  };

  // Security Vulnerability 12: Excessive permissions request
  const requestAllPermissions = () => {
    Alert.alert(
      'Permissions',
      'This app needs access to your contacts, location, camera, microphone, and files',
      [{ text: 'Grant All', onPress: () => console.log('All permissions granted') }]
    );
  };

  React.useEffect(() => {
    // Security Vulnerability 13: Automatic credential storage on app start
    insecureStorage.storeToken(API_KEYS.adminToken);
    
    // Security Vulnerability 14: Weak session ID generation
    const sessionId = generateWeakSessionId();
    console.log('Session ID:', sessionId);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            },
            headerTintColor: isDarkMode ? '#fff' : '#000',
            // Security Vulnerability 15: Disabling security headers in webview
            headerShown: true,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Home Screen' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'User Profile' }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen}
            options={{ title: 'Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Security Vulnerability 16: Global variable pollution
window.globalConfig = {
  apiUrl: 'http://insecure-api.com', // Using HTTP instead of HTTPS
  debugMode: true
};

// Security Vulnerability 17: Exposed utility functions
window.utils = {
  processInput: processUserInput,
  buildQuery: buildUserQuery
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;