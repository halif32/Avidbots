import { Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-root-toast';

/**
 * 
 * @param msg mesasge to show inside toast
 * @param duration duration for the toast, optional 
 */
const showToast = (msg: string, duration?: number) => {
	if(Platform.OS == 'android'){
		ToastAndroid.show(msg, duration || 1000);
	}
	else{
		const toastOpts = {
			duration: duration,
			position: Toast.positions.BOTTOM
		};
		Toast.show(msg, toastOpts);
	}
};

export {
	showToast
};