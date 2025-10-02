import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import NotificationCard from 'components/NotificationCard';
import { FirebaseContext } from 'contexts/Notifications';
import NotificationService from 'services/notificationService';
import { useTranslation } from 'react-i18next';
import { robotStyles } from 'pages/Robots/styles';
import { globalStyles } from 'styles';

const EmptyNotifications = () => {
	const { theme } = useTheme();
	return (
		<View style={[globalStyles.emptyContainer]}>
			<Icon name="bell" size={60} color={theme.colors.textColor} />
			<Text style={{ textAlign: 'center', marginTop: 10 }}>
        Wow! You have received no notifications in the last 30 days!{' '}
			</Text>
			<View
				style={[
					globalStyles.containerContent,
					{
						borderColor: theme.colors.ListItemBGColor,
					},
				]}
			>
				<ListItem style={{ alignItems: 'center', marginBottom: -10 }}>
					<Icon name="info" size={20} />
					<Text
						style={[
							robotStyles.noteText,
							{ fontSize: 14, marginTop: 0, marginLeft: -10 },
						]}
					>
            Need robot alerts?
					</Text>
				</ListItem>
				<ListItem>
					<Text style={[robotStyles.noteText, { fontSize: 14, marginTop: 0 }]}>
            From your Command Center web application, go to{' '}
						<Icon name="settings" size={10} /> {'>'} My profile {'>'}{' '}
            Subscriptions.
					</Text>
				</ListItem>
				<ListItem style={{ marginTop: -20 }}>
					<Text style={[robotStyles.noteText, { fontSize: 14, marginTop: 0 }]}>
            Click +Alert, then select your preferred Alert, choose Avidbots
            Mobile as your Contact Method and click Add.
					</Text>
				</ListItem>
			</View>
		</View>
	);
};

export const NotificationsSyncContainer = () => {
	const { pushNotifications } = useContext(FirebaseContext);

	const notificationService = NotificationService();
	const [loading, setLoading] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [offset, setOffset] = useState(0);
	const [endReached, setEndReached] = useState(false);
	const [showError, setShowError] = useState(false);
	const offSetSize = 10;
	const { t } = useTranslation();
	const handleEndReached = () => {
		if (!loading && !endReached) {
			setOffset((prevOffset) => prevOffset + offSetSize);
		}
	};

	const restartNotificationContainer = () => {
		setNotifications([]);
		setOffset(0);
	};

	const loadNotifications = async (onoffsetChange?: number) => {
		try {
			setLoading(true);
			let newNotifications: any[];
			if (onoffsetChange === 0) {
				newNotifications = await notificationService.getNotificationLogs(0);
			} else {
				newNotifications = await notificationService.getNotificationLogs(
					offset
				);
			}

			if (
				newNotifications.length > 0 &&
        notifications.length > 0 &&
        notifications[notifications.length - 1]._id === newNotifications[0]._id
			) {
				// Remove the first element in newNotifications
				const updatedNewNotifications = newNotifications.slice(1);
				setNotifications((prevNotifications) => [
					...prevNotifications,
					...updatedNewNotifications,
				]);
			} else {
				// Concatenate new notifications if no duplication found
				setNotifications((prevNotifications) => [
					...prevNotifications,
					...newNotifications,
				]);
			}

			if (newNotifications.length === 0) {
				setEndReached(true); // Indicates that all data has been loaded
			}
		} catch (error) {
			// Handle error
			setShowError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		restartNotificationContainer();
		const refreshContainer = async () => {
			await loadNotifications(0);
		};
		refreshContainer();
	}, [pushNotifications]);

	useEffect(() => {
		const loadContainer = async () => {
			if (offset !== 0) {
				await loadNotifications();
			}
		};
		loadContainer();
	}, [offset]);

	const renderItem = ({ item }) => (
		<NotificationCard key={item._id} data={item} />
	);

	return (
		<View style={{ flex: 1 }}>
			{showError ? (
				<Text>{t('Error_In_Fetching_Notifications')}</Text>
			) : (
				<FlatList
					data={notifications}
					renderItem={renderItem}
					keyExtractor={(item) => item._id}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.1}
					ListFooterComponent={loading ? <ActivityIndicator /> : null}
					ListEmptyComponent={loading ? null : <EmptyNotifications />}
				/>
			)}
		</View>
	);
};
