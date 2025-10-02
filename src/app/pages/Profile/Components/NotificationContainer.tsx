import { Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import { checkNotifications } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';

export const NotificationContainer = () => {
	const { theme } = useTheme();
	const [notificationStatus, setNotificationStatus] = useState<boolean>(false);
	const { t } = useTranslation();
	const checkNotificationPermissions = async () => {
		const _notificationPermission = await checkNotifications();
		if (_notificationPermission.status === 'granted') {
			setNotificationStatus(true);
		} else {
			setNotificationStatus(false);
		}
	};

	const openSettings = () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings:');
		} else if (Platform.OS === 'android') {
			Linking.openSettings();
		}
	};

	useEffect(() => {
		checkNotificationPermissions();
	}, []);

	return (
		<View
			style={[
				globalStyles.paddingHorz10,
				globalStyles.paddinVert10,
				{ backgroundColor: theme.colors.ListItemBGColor },
			]}
		>
			{!notificationStatus ? (
				<View
					style={[
						globalStyles.marginTop10,
						globalStyles.w80,
						globalStyles.alignSelfCenter,
					]}
				>
					<Text
						style={[{ color: theme.colors.divider }, globalStyles.textCenter]}
					>
						{t('Push_Notification_Warning_Messages')}
					</Text>
				</View>
			) : null}
			<View
				style={[
					globalStyles.w90,
					globalStyles.alignSelfCenter,
					globalStyles.marginTop15,
				]}
			>
				<Text style={[{ color: theme.colors.formLabel }]}>{t('Alerts')}</Text>
				<TouchableOpacity
					style={[
						globalStyles.row,
						globalStyles.justifyBetween,
						globalStyles.paddinVert10,
					]}
					onPress={() => {
						openSettings();
					}}
				>
					<Text
						style={{
							color: theme.colors.textColor,
							fontWeight: '600',
							fontSize: 15,
						}}
					>
						{t('Set_Push_Notifications')}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
