import { Alert } from 'react-native';

type AlertButton = {
    text: string,
    onPress: () => unknown
}

/**
 * 
 * @param message message to show on alert body
 * @param cta_buttons array of buttons to be present in alert
 * @param alertTitle title of the alert box, optional
 */

const showAlert = (message: string, cta_buttons: Array<AlertButton>,  alertTitle?: string) => {
	Alert.alert(alertTitle || '', message, cta_buttons);
};

export {
	showAlert
};