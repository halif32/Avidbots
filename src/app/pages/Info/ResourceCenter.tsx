import WebView from 'react-native-webview';
import { globalStyles } from 'styles';

/**
	* Component that displays the Resource Center & FAQs inside a Web Viewer
	*
	* @component ResourceCenter
	* 
	* @param {string} uri  The URL for Resource Center and FAQs webpage
	* 
	* 
	*/

type ResourceCenterProps = { 
	route?: 
	{ params: 
		{ uri: string } 
	} 
}

export const ResourceCenter = (props: ResourceCenterProps) => {
	const uri  = props.route?.params.uri;
	return <WebView style={[globalStyles.flex1]} source={{ uri }} />;
};

