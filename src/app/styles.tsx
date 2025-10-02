import { useTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import {
	horizontalResponsive,
	verticalResponsive,
} from 'utils/responsivenessControlFunction';

const { theme } = useTheme();

export const globalStyles = StyleSheet.create({
	// common layout
	container: {
		paddingHorizontal: horizontalResponsive(24),
		backgroundColor: 'transparent',
	},
	w100: {
		width: '100%',
	},
	h100: {
		height: '100%',
	},
	h25: {
		height: '25%',
	},
	h15: {
		height: '15%',
	},
	minHeight200: {
		minHeight: verticalResponsive(200),
	},
	minHeight100: {
		minHeight: verticalResponsive(5),
	},
	w80: {
		width: '80%',
	},
	w90: {
		width: '90%',
	},
	w50: {
		width: '50%',
	},
	column: {
		flexDirection: 'column',
	},
	row: {
		flexDirection: 'row',
	},
	flex1: {
		flex: 1,
	},
	flexGrow: {
		flexGrow: 1,
	},
	flexWrap: {
		flexWrap: 'wrap',
	},
	flexNoWrap: {
		flexWrap: 'nowrap',
	},
	justifyStart: {
		justifyContent: 'flex-start',
	},
	justifyCenter: {
		justifyContent: 'center',
	},
	justifyEnd: {
		justifyContent: 'flex-end',
	},
	justifyBetween: {
		justifyContent: 'space-between',
	},
	justifyAround: {
		justifyContent: 'space-around',
	},
	justifyEvenly: {
		justifyContent: 'space-evenly',
	},
	alignItemsStart: {
		alignItems: 'flex-start',
	},
	alignItemsCenter: {
		alignItems: 'center',
	},
	alignItemsEnd: {
		alignItems: 'flex-end',
	},
	alignSelfStretch: {
		alignSelf: 'stretch',
	},
	alignSelfEnd: {
		alignSelf: 'flex-end',
	},
	alignSelfCenter: {
		alignSelf: 'center',
	},

	//text alignments and formatting
	textRight: {
		textAlign: 'right',
	},
	textleft: {
		textAlign: 'left',
	},
	textCenter: {
		textAlign: 'center',
	},
	textUnderline: {
		textDecorationLine: 'underline',
	},
	textWhite: {
		color: theme.colors?.white,
	},

	//spacing utilities
	padding5: {
		padding: horizontalResponsive(5),
	},
	padding10: {
		padding: horizontalResponsive(10),
	},
	paddingRight: {
		paddingRight: horizontalResponsive(12),
	},
	paddingHorz0: {
		paddingHorizontal: 0,
	},
	paddingHorz10: {
		paddingHorizontal: horizontalResponsive(10),
	},
	paddinVert10: {
		paddingVertical: verticalResponsive(10),
	},
	paddingBottom20: {
		paddingBottom: verticalResponsive(20),
	},
	marginHorz10: {
		marginHorizontal: horizontalResponsive(10),
	},
	marginHorz15: {
		marginHorizontal: horizontalResponsive(15),
	},
	marginVer10: {
		marginVertical: verticalResponsive(10),
	},
	marginTop10: {
		marginTop: verticalResponsive(10),
	},
	marginTop20: {
		marginTop: verticalResponsive(20),
	},
	marginTop60: {
		marginTop: verticalResponsive(60),
	},
	marginBottom5: {
		marginBottom: verticalResponsive(5),
	},
	marginBottom15: {
		marginBottom: verticalResponsive(15),
	},
	marginLeft10: {
		marginLeft: horizontalResponsive(10),
	},
	marginRight10: {
		marginRight: horizontalResponsive(10),
	},
	margin0: {
		margin: 0,
	},

	//border styles
	noBorder: {
		borderBottomWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
		borderWidth: 0,
	},
	br8: {
		borderRadius: horizontalResponsive(8),
	},
	br14: {
		borderRadius: horizontalResponsive(14),
	},
	br12: {
		borderRadius: horizontalResponsive(12),
	},
	//backgrounds
	primarybg: {
		backgroundColor: theme.colors?.background,
	},
	transparentbg: {
		backgroundColor: 'transparent',
	},
	whiteBg: {
		backgroundColor: 'white',
	},
	h5: {
		fontSize: 30,
		marginBottom: verticalResponsive(25),
	},
	darkLoader: {
		color: theme.colors.black,
	},
	dropdown: {
		height: verticalResponsive(65),
		borderColor: theme.colors.white,
		borderWidth: 0.5,
		borderRadius: horizontalResponsive(8),
		paddingHorizontal: horizontalResponsive(8),
		alignSelf: 'stretch',
		backgroundColor: theme.colors.white,
	},
	icon: {
		marginRight: horizontalResponsive(5),
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: horizontalResponsive(22),
		top: verticalResponsive(8),
		zIndex: 999,
		paddingHorizontal: horizontalResponsive(8),
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		color: theme.colors?.formLabel,
	},
	iconStyle: {
		width: horizontalResponsive(20),
		height: verticalResponsive(20),
	},
	inputSearchStyle: {
		paddingVertical: verticalResponsive(1.5),
		fontSize: 16,
	},
	//tab navigator
	headerImageStyle: {
		width: '90%',
		height: '90%',
		resizeMode: 'contain',
		tintColor: 'white',
	},
	headerImageView: {
		width: horizontalResponsive(140),
		height: verticalResponsive(50),
	},
	headerTitle: { fontSize: 22, fontWeight: 'bold' },
	//authstach
	logoStyle: {
		width: 286,
		height: 54,
		flexShrink: 0,
		resizeMode: 'cover',
	},
	tagLine: {
		fontWeight: 'bold',
		fontStyle: 'normal',
		color: theme.colors.black,
		fontSize: 15,
		marginTop: 10,
	},
	//side menu
	menuTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: theme.colors.iconColor,
	},
	sidemenuLogo: {
		width: 200,
		height: 24,
		marginBottom: 25,
	},

	//Shadow
	cardShadow: {
		shadowColor: '#000', // for iOS
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5, // for Android
	},
	// notification styles
	emptyContainer:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginTop: 50,
	},
	containerContent:{
		borderWidth: 1,
		padding: 2,
		borderRadius: 10,
		marginTop: 20,
	}
});
