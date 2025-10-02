import { useTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const {theme} = useTheme();
export const chatStyles = StyleSheet.create({
	listItem: {
		borderColor: theme.colors?.formBorder,
		borderWidth: 1,
		marginVertical: 10
	},
	// New message bubbles appears on the bottom of the screen
	messageContainer: {
		flexGrow: 1,
		justifyContent: 'flex-end'
	},
	chatInput: {
		borderWidth: 2,
		height: 36,
		padding: 0,
		lineHeight: 20,
		fontSize: 14
	},
	messageBubble: {
		marginVertical: 10,
		padding: 10,
		fontSize: 14,
		borderRadius: 10
	},
	senderBubble: {
		backgroundColor: theme.colors?.customColor,
		alignSelf: 'flex-end',
		borderTopRightRadius: 0,
		color: theme.colors.white
	},
	receiverBubble: {
		backgroundColor: theme.colors?.customColor2,
		alignSelf: 'flex-start',
		borderTopLeftRadius: 0,
		color: theme.colors.black
	}
});