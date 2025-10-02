/* eslint-disable no-unsafe-optional-chaining */

import { useContext, useEffect, useState } from 'react';
import { Tab, Text, TabView, Avatar, Badge , useTheme } from '@rneui/themed';
import { NotificationsSyncContainer } from 'components/NotificationsSyncContainer';
import { TouchableOpacity, View } from 'react-native';
import { ChatContext } from 'contexts/ChatContext';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import notificationStyles from './Notification.styles';
import { formatElapsedTime, getNameInitials } from 'shared/Helper';
import TabItemWithBadge from 'components/TabItemWithBadge/TabItemWithBadge';
import { FirebaseContext } from 'contexts/Notifications';
import { useDomainContext } from 'contexts/DomainContext';
import { ROUTES, TABS } from 'constants/routes';

export const Notifications = () => {
	const navigation = useNavigation();
	const { domain } = useDomainContext();

	const { chatHistories, countChatWithUnreadMessages } = useContext(ChatContext);
	const { theme } = useTheme();
	// The Tab Index
	const [index, setIndex] = useState(0);
	const showChatItemsAndheaders: boolean = false;  // out of scope for beta 1 (remove the conditional statement after beta 1)

	const { pushNotifications, setUnReadCount } = useContext(FirebaseContext);

	useEffect(() => {
		// loop through the pushNotifications array and get the count of unread messages
		const unReadCount = pushNotifications?.reduce((acc, curr) => {
			if (!curr.read) {
				acc++;
			}
			return acc;
		}, 0);
		setUnReadCount(unReadCount);
	}, []);



	return (
		<>
			{showChatItemsAndheaders && <Tab
				value={index}
				onChange={(e) => setIndex(e)}
			>
				<Tab.Item
					title={
						<TabItemWithBadge
							title="Chats"
							badgeNumber={countChatWithUnreadMessages()}
						/>
					}
				/>
				<Tab.Item
					title={<TabItemWithBadge title="Updates" badgeNumber={unReadCount} />}
				/>
			</Tab>}

			<TabView value={index} onChange={setIndex} animationType="spring">
				{showChatItemsAndheaders && <TabView.Item style={notificationStyles.tabViewItem.container}>
					<View >
						<FlatList
							data={Object.entries(chatHistories)}
							renderItem={({ item }) => {
								// The number of unread chat messages
								const unreadMessagesCount = item[1]?.messages?.filter(message => (!message.isRead)).length;
								// The Recipient Name Initials
								const recipientNameInitials = getNameInitials(item[1]?.header?.recipient?.name || 'RA');
								// The array of messages
								const messages = item[1]?.messages as any[];
								// The Robot's Data to use to access Chat Screen. Data is coming from History Header or first message.
								const robotData = item[1].header?.robot || messages[0]?.robot;
								// The Robot's name (if no name provided, it will use the username)
								const robotName = robotData?.name || robotData?.username;

								return (
									<TouchableOpacity onPress={() => navigation.navigate(TABS.ROBOTS_TAB, { screen: ROUTES.ROBOTS.CHAT, initial: false, params: { robotData } })}>
										<View style={notificationStyles.chat.item}>
											<View style={notificationStyles.chat.leftColumn}>
												<View style={notificationStyles.chat.avatarContainer}>
													<Avatar
														size={42}
														rounded
														source={{ uri: `${domain}/${item[1]?.header?.recipient?.avatarUrl}` }}
													/>
												</View>
												<View>
													<Text style={notificationStyles.chat.username}>{robotName + ' | ' + recipientNameInitials}</Text>
													<Text style={notificationStyles.chat.robotStatus}>{messages[messages.length - 1]?.text || ''}</Text>
												</View>
											</View>

											<View style={notificationStyles.chat.rightColumn}>
												<Text style={notificationStyles.chat.lastReceivedMessageTime}>{formatElapsedTime(Date.now() - Date.parse([...item[1]?.messages].pop()?.date || '0'))}</Text>
												{ // Only display the Number Badge when have at least 1 unread message
													unreadMessagesCount
														? <Badge
															value={unreadMessagesCount}
															containerStyle={notificationStyles.chat.unreadMessagesBadgeContainer}
															badgeStyle={notificationStyles.chat.unreadMessagesBadge}
															textStyle={notificationStyles.chat.unreadMessagesBadgeText} />
														: null
												}
											</View>
										</View>
									</TouchableOpacity>
								);
							}}
							keyExtractor={(item) => item[0]}
						/>
					</View>
				</TabView.Item>}
				<TabView.Item style={[notificationStyles.tabViewItem.container, { backgroundColor: theme?.colors?.bgColor }]}>
					<NotificationsSyncContainer />
				</TabView.Item>
			</TabView>
		</>
	);
};