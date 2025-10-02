import { StyleSheet } from 'react-native';
import {
	horizontalResponsive,
	verticalResponsive,
} from 'utils/responsivenessControlFunction';
import { useTheme } from '@rneui/themed';

const {theme} = useTheme();
const notificationStyles = {
	// Tab Item Styles Only
	tabItem: StyleSheet.create({
		header: {
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: verticalResponsive(10),
			marginBottom: verticalResponsive(10),
		},
		title: {
			marginRight: horizontalResponsive(4),
			fontSize: 15,
			fontWeight: '700',
		},
		titleBadge: {
			backgroundColor: theme.colors?.background,
			borderRadius: horizontalResponsive(2),
		},
		titleBadgeText: {
			fontSize: 12,
			color: 'white',
			fontWeight: '700',
		},
		titleBadgeContainer: {
			marginTop: verticalResponsive(4),
		},
	}),

	// Tab View Item Style
	tabViewItem: StyleSheet.create({
		container: {
			flexDirection: 'column',
			width: '100%',
			justifyContent: 'flex-start',
			alightItems: 'center',
			backgroundColor: '#1A1A1A',
		},
	}),

	// Chat List Styles Only
	chat: StyleSheet.create({
		item: {
			justifyContent: 'space-between',
			flexDirection: 'row',
			width: '100%',
			marginTop: verticalResponsive(15),
			marginBottom: verticalResponsive(10),
			paddingLeft: horizontalResponsive(10),
			paddingRight: horizontalResponsive(10),
		},
		leftColumn: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'flex-start',
			flex: 80,
		},
		rightColumn: {
			alignItems: 'flex-end',
			flex: 20,
		},
		avatarContainer: {
			marginRight: horizontalResponsive(4),
		},
		username: {
			verticalAlign: 'top',
			fontSize: 14,
			fontWeight: '700',
			padding: 0,
			margin: 0,
		},
		robotStatus: {
			fontSize: 10,
			marginTop: verticalResponsive(2),
		},
		lastReceivedMessageTime: {
			fontSize: 12,
			color: theme.colors?.background,
			fontWeight: '500',
		},
		unreadMessagesBadge: {
			backgroundColor: theme.colors?.background,
		},
		unreadMessagesBadgeText: {
			fontSize: 11,
			color: 'white',
			fontWeight: '500',
		},
		unreadMessagesBadgeContainer: {
			marginTop: verticalResponsive(4),
		},
	}),
};

export default notificationStyles;
