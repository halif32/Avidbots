import { StyleSheet } from 'react-native';
import { horizontalResponsive, verticalResponsive } from '../../utils/responsivenessControlFunction';

export const ProfileStyles = StyleSheet.create({
	listViewContainer: {
		borderBottomWidth: horizontalResponsive(1),
		paddingVertical: verticalResponsive(20),
	},
	listTitleStyle: {
		marginLeft: horizontalResponsive(15),
		fontWeight: '600',
	},
	darkModeContainer: {
		borderBottomWidth: horizontalResponsive(1),
		paddingVertical: verticalResponsive(18),
	},
	darkModeTitleStyle: {
		marginLeft: horizontalResponsive(30),
		fontWeight: '600',
	},
	darkModeListItemContentStyle: {
		position: 'absolute',
		right: horizontalResponsive(10),
	},
	dropDownMenuMainContainer: {
		height: '1%',
		width: '25%',
	},
	dropDownSelectedTextStyle: {
		fontWeight: '300',
		fontSize: 15,
	},
	dropDownContainerStyle: {
		marginTop: verticalResponsive(5),
	},
	dropDownListItemText: {
		padding: verticalResponsive(5),
		paddingVertical: verticalResponsive(10),
	},
});
