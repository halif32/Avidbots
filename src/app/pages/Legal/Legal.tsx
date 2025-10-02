import { View } from 'react-native';
import WebView from 'react-native-webview';
import { eulaObject } from 'contexts/Auth';
import { useDomainContext } from 'contexts/DomainContext';
import { useThemeMode } from '@rneui/themed';


/**
	* Component that displays the accepted Eula Terms and Conditions legal Page inside a Web Viewer
	*
	* @component Legal
	* 
	* @param {string} uri  The URL for accepted Eula Terms and Conditions legal webpage
	* 
	*/


export const Legal = () => {

	const { domain } = useDomainContext();
	const { mode } = useThemeMode();

	/**
	 * write theme
	 */
	const theme = mode === 'light'? mode : '';


	/**
		* @uri is the url for accepted eula legal page in the web
		*/
	const uri = `${domain}/v2/legal?view=mobileApp&version=${eulaObject.eulaVersion}&theme=${theme}`;

	return (

		<View style={{flex:1}}>
			<WebView
				useWebView2
				domStorageEnabled
				javaScriptEnabled
				sharedCookiesEnabled
				style={{flex:1}} source={{ uri }} />
		</View>
	);
};
