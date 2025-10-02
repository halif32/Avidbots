import { StyleSheet } from 'react-native';
import {
	horizontalResponsive,
	verticalResponsive,
} from 'utils/responsivenessControlFunction';

export const loginStyles = StyleSheet.create({
	loginScreen: {
		paddingVertical: verticalResponsive(20),
	},
	inputBox: {
		borderRadius: horizontalResponsive(8),
		width: '90%',
	},
	forgotPasswordSection: {
		marginTop: verticalResponsive(10),
		justifyContent: 'flex-end',
		marginBottom: verticalResponsive(10),
	},
	logoPortrait: {
		width: horizontalResponsive(200),
		height: verticalResponsive(104),
		marginBottom: verticalResponsive(20),
	},
	logoLandscape: {
		width: horizontalResponsive(90),
		height: verticalResponsive(90),
	},
	logoTextPortrait: {
		width: horizontalResponsive(200),
		height: verticalResponsive(43),
		marginVertical: verticalResponsive(5),
	},
	logoTextLandscape: {
		width: horizontalResponsive(100),
		height: verticalResponsive(30),
		marginVertical: verticalResponsive(5),
	},
});
