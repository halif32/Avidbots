/**
 * @name    RobotMonitorWebViewer
 * @brief   Displays the Robot Monitor inside a Web Viewer
 * @since   2023-05-18
 */
import { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { DeviceEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import { TABS, ROUTES } from 'constants/routes';
/**
 * Component that displays the Robot Monitor inside a Web Viewer
 *
 * @component RobotMonitorWebViewer
 *
 * @param {string} robot  The ID of the Robot to be monitored
 * @param {string} baseUrl  he base URL for the current environment, e.g.: https://alpha.avidbots.com/
 *
 * @example
 *  const baseUrl = 'https://alpha.avidbots.com/'
 *  const robot = { id: '1', ...}
 *  <RobotMonitorWebViewer robot={robot.id} baseUrl={baseUrl} ></RobotMonitorWebViewer>
 *
 * @example <RobotMonitorWebViewer robot='1' baseUrl='https://alpha.avidbots.com/' ></RobotMonitorWebViewer>
 */
export const RobotMonitorWebViewer = ({
	robot,
	baseUrl,
}: {
  robot: string;
  baseUrl: string;
}) => {
	// The Web Robot Monitor URL
	const [uri] = useState(`${baseUrl}#/robot/${robot}/monitor?view=mobileApp`);
	const navigation = useNavigation();
	const { theme } = useTheme();

	const handleBackNavigation = () => {
		navigation.navigate(TABS.HOME_TAB, {
			screen: ROUTES.HOME.MAIN,
			initial: false,
		});
	};

	useEffect(() => {
		navigation.addListener('focus', () => {
			navigation.setOptions({
				headerLeft: () => {
					return (
						<Icon
							onPress={handleBackNavigation}
							name="chevron-left"
							iconProps={{ name: 'chevron-left', color: theme.colors.black }}
						/>
					);
				},
			});
		});

		const backHandler = DeviceEventEmitter.addListener(
			'hardwareBackPress',
			handleBackNavigation
		);

		return () => backHandler.remove();
	}, []);

	return (
		<>
			<WebView
				useWebView2
				domStorageEnabled
				javaScriptEnabled
				sharedCookiesEnabled
				startInLoadingState={true}
				source={{
					uri,
				}}
				style={[globalStyles.flex1]}
			/>
		</>
	);
};
