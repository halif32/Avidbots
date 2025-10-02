import { useTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const {theme} = useTheme();
export const eulaStyles = StyleSheet.create({

	textStyle: {
		fontSize: 22,
		fontWeight: '600',
		lineHeight: 30,
		color:theme.colors.white
	},
	lightColor : {
		color:theme.colors.white,
	},
	darkColor : {
		color:'#2D2B2E'
	},
	lightHeader : {
		backgroundColor : theme.colors.brandColor
	},
	lightFooter : {
		backgroundColor : theme.colors.white
	},
	darkHeaderAndFooter: {
		backgroundColor : '#2D2B2E'
	}
});