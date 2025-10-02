import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Endpoints from 'constants/endpoints';
import { useDomainContext } from 'contexts/DomainContext';
import AxiosService from 'contexts/Interceptors';


function NotificationService() {

	const {domain} = useDomainContext();
	const axiosInstance = AxiosService();
	const { notifications } = Endpoints(domain);

	const requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;
		if (enabled) {
			return enabled;
		}
	};
	
	const initialFcmToken = async () => {
		try {
			const token = await messaging().getToken();
			const oldToken = await AsyncStorage.getItem('fcmToken');
			const storedToken = await getFcmToken(token);

			if (!storedToken || storedToken !== token) {

				// below delete token ensures multi used app tokens are preserved in the db instead of deleting
				const deleteToken = oldToken === token ? null: oldToken;
				// call the createFcmToken API
				await createFcmToken(token,deleteToken);
				return;
			}
			await updateFcmTokenStatus(token,'active');

			return;
		} catch (e) {
			return e;
		}
	};
	
	const getFcmToken = async (token: string) => {
		try {
			const response = await axiosInstance.get(notifications.fcm_token(token), {});
			if (response) {
				const res = response?.data;

				if(res === 'Device Token Not Found') {
					return undefined;
				}
				// store fcm token in async storage
				const parse = JSON.parse(JSON.stringify(res));
				// set the fcm token in async storage if the parse.deviceToken exist and not null
				if (parse.deviceToken && parse.deviceToken !== null) {
					await AsyncStorage.setItem('fcmToken', parse.deviceToken);
					return parse.deviceToken;
				}
				return undefined;
			}

		} catch (e) {
			return undefined;

		}
	};

	const createFcmToken = async (deviceToken: string, oldToken:string | null): Promise<any> => {
		const body = JSON.stringify({
			deviceToken: deviceToken,
			oldDeviceToken: oldToken
		});
		const response = await axiosInstance.post(notifications.create_fcm_token, body,{});
		const res =  JSON.parse(JSON.stringify(response.data));
		const parse = JSON.parse(JSON.stringify(res));
		if (parse.deviceToken && parse.deviceToken !== null) {
			await AsyncStorage.setItem('fcmToken', parse.deviceToken);
			return parse.deviceToken;
		}
		return undefined;
	};

	const updateFcmTokenStatus = async (deviceToken: string, status:string): Promise<any> => {
		const body = JSON.stringify({
			deviceToken: deviceToken,
			tokenStatus:status
		});
		try {
			const response = await axiosInstance.post(notifications.update_fcm_token_status, body,{});
			if(!response.data) {
				return false;
			}
			return true;
		}
		catch (e) {
			return false;
		}
	};

	const getNotificationLogs = async (offset?:any): Promise<any> => {

		const offsetValue = offset? offset:0;
		const params: any = {
			limit:10,
			offset: offsetValue
		};

		const queryString = new URLSearchParams(params).toString();
		
		try {
			const response = await axiosInstance.get(notifications.logs(queryString), {});
			return response.data;
		} catch (error) {
			// Handle the error here
			return error; // Optionally re-throw the error to propagate it further
		}
	};
	
	const markNotificationAsRead = async (notificationId: string): Promise<any> => {
		try {

			if(!domain) {
				const checkDomain =  await AsyncStorage.getItem('domain');
				if(!checkDomain) {
					return undefined;
				}
				const response = await axiosInstance.post(notifications.markNotificationAsRead(checkDomain,notificationId),
					{});
				return response.data;
			} else {
				const response = await axiosInstance.post(notifications.markNotificationAsRead(domain,notificationId),
					{});
				return response.data;

			}

		} catch (error) {
			// Handle error if needed
			console.error('Error marking markNotificationAsRead as read:', error);
			throw error; // Optionally re-throw the error to propagate it further
		}
	};

	return {
		requestUserPermission,
		initialFcmToken,
		getNotificationLogs,
		markNotificationAsRead,
		getFcmToken,
		updateFcmTokenStatus,
		createFcmToken,
	};
}

export default NotificationService;






