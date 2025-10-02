import { createContext, useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
//import  NotificationService  from '../services/notificationService';
import { useNavigation } from '@react-navigation/native';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({children}) => {
	const [pushNotifications, setPushNotifications] = useState([]);
	const [unReadCount, setUnReadCount] = useState(0);
	const navigation = useNavigation();
	//const notificationService = NotificationService();

	useEffect(() => {
		// This is a in-app notification. When the app is active
		const unsubscribe = messaging().onMessage(() => {
			setPushNotifications([]);
			setUnReadCount(prevUnReadCount => prevUnReadCount + 1);

		});


		// This is a push notification. When the app in inactive (Killed / session timeout)
		messaging().setBackgroundMessageHandler(async () => {
			setPushNotifications([]);
			setUnReadCount(prevUnReadCount => prevUnReadCount + 1);
		});


		messaging()
			.getInitialNotification()
			.then();

		messaging().onNotificationOpenedApp(() => {
			const screenToNavigate = 'Notifications'; // Assuming you send screen info in the notification payload
			navigation.navigate(screenToNavigate);
		});

		return unsubscribe;
	}, []);

	return (
		<FirebaseContext.Provider value={{ pushNotifications, setPushNotifications, unReadCount, setUnReadCount }}>
			{children}
		</FirebaseContext.Provider>
	);
};