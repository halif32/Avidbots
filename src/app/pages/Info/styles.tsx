import { StyleSheet } from 'react-native';
import {
	horizontalResponsive,
	verticalResponsive,
} from 'utils/responsivenessControlFunction';
import { useTheme } from '@rneui/themed';

const {theme} = useTheme();
export const InfoStyles = StyleSheet.create({
	infoDetailsContainer: {
		padding: horizontalResponsive(10),
		borderRadius: horizontalResponsive(6),
		marginBottom: verticalResponsive(25),
	},
	headerTitle: { textAlign: 'center', fontWeight: '500' },
	infoText: {
		marginTop: verticalResponsive(15),
		fontWeight: '500',
	},
	text: {
		fontWeight: 'normal',
		fontSize: 11,
		fontFamily: 'Montserrat-Regular',
	},
	image: {
		width: '100%',
		height: verticalResponsive(350),
		marginTop: verticalResponsive(15),
		paddingTop: 0,
		borderRadius: horizontalResponsive(10),
		flex: 1,
	},
	button: {
		padding: horizontalResponsive(15),
		borderRadius: horizontalResponsive(8),
		width: horizontalResponsive(160),
		alignItems: 'center',
	},
	buttonText: {
		fontWeight: '500',
		fontSize: 15,
		color: theme.colors.black,
	},
	goBacktTextStyle: {
		textAlign: 'center',
		fontSize: 18,
		marginLeft: horizontalResponsive(10),
		fontWeight: '600',
	},
});
