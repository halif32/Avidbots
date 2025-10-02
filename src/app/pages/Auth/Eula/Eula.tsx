
import { showAlert } from 'services/AlertService';
import { eulaObject, useAuth } from 'contexts/Auth';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { globalStyles } from 'styles';
import { Button, Text, useTheme } from '@rneui/themed';
import { eulaStyles } from './styles';
import { useDomainContext } from 'contexts/DomainContext';
import AuthService from 'services/AuthService';
import { useEffect, useState } from 'react';
import { useThemeContext } from 'contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

/**
	* Component that displays the Eula Terms and Conditions inside a Web Viewer
	*
	* @component Eula
	* 
	* @param {string} uri  The URL for Eula Terms and Conditions webpage
	* 
	*/


export const Eula = () => {
	const { theme } = useTheme();
	const { domain } = useDomainContext();
	const { signOut, updateEulaFlag } = useAuth();
	const authService = AuthService();
	const [eulaTheme, setEulaTheme] = useState(false);
	const {t}=useTranslation();
	const { getSystemMode } = useThemeContext();
	/**
		* @uri is the url for eula in the web
		*/
	const uri = eulaTheme ? `${domain}/v2/EULA?view=mobileApp&version=${eulaObject.eulaVersion}&theme=light` : `${domain}/v2/EULA?view=mobileApp&version=${eulaObject.eulaVersion}`;
	/**
		* if the user accepts the eula set modal visibility to false
		* invoke onAccept call back
		*/
	const handleEulaAccept = async () => {
		const isAccepted = await authService.acceptEula();

		if (isAccepted === 'accepted EULA') {
			// Logic to handle EULA acceptance
			eulaObject.isEulaAcccepted = true;
			updateEulaFlag(true);
		}

	};
	/**
		* if user reject the eula terms logout action is invoked
		*/
	const handleEulaReject = async () => {
		showAlert(
			t('Eula_Reject_Message'),
			[
				{ text: t('Yes'), onPress: () => signOut() },
				{ text: t('No'), onPress: () => { } }

			], t('Decline_Eula'));
		// Logic to handle EULA rejection and logout the user

	};
	const getTheme = async () => {

		const mode = await getSystemMode();
		if (mode == null) {
			setEulaTheme(false);
		} else {
			setEulaTheme(true);
		}
	};

	useEffect(() => {
		getTheme();
	}, []);

	return (

		<View style={[globalStyles.flex1]}>

			<View style={[globalStyles.justifyCenter, globalStyles.alignItemsCenter, globalStyles.paddinVert10, { backgroundColor: theme.colors.headerBackground }]}>
				<Text style={[eulaStyles.textStyle]}>{t('End_User_Licence_Agreement')}</Text>
			</View>

			<WebView
				useWebView2
				domStorageEnabled
				javaScriptEnabled
				sharedCookiesEnabled
				style={[globalStyles.flex1]}
				source={{ uri }}
			/>

			<View style={[globalStyles.row, globalStyles.padding10, { backgroundColor: theme.colors.footerBackground }]}>
				<View style={[globalStyles.flex1]}>
					<Button type='outline' title={t('Decline')} onPress={handleEulaReject}></Button>
				</View>
				<View style={[globalStyles.flex1]}>
					<Button type='solid' title={t('Accept')} onPress={handleEulaAccept}></Button>
				</View>
			</View>

		</View>
	);
};
