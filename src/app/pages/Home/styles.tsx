import { StyleSheet } from 'react-native';
import {
	horizontalResponsive,
	verticalResponsive,
} from 'utils/responsivenessControlFunction';

export const HomeStyles = StyleSheet.create({
	mainViewStyle: {
		paddingTop: verticalResponsive(25),
		paddingBottom: verticalResponsive(12),
	},
	leftIconStyle: {
		marginRight: horizontalResponsive(10),
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	}
});
