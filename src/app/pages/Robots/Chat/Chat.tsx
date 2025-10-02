import { useContext, useEffect, useReducer, useState } from 'react';
import { View, FlatList } from 'react-native';
import { globalStyles } from 'styles';
import { ChatInput, MessageBubble } from './ChatComponent';
import { chatStyles } from './styles';
import { Socket } from 'socket.io-client';
import { useAuth } from 'contexts/Auth';
import { ChatContext } from 'contexts/ChatContext';
import { Loader } from 'components/Loader/Loader';
import { useNavigation } from '@react-navigation/native';
import { AuthData } from 'services/AuthService';
import { getNameInitials } from 'shared/Helper';
import { showAlert } from 'services/AlertService';

type ChatProps = { 
	route?: { 
		params: { robotData: any; } 
	}
	navigation?: { setOptions: (arg0: { title: string; }) => void; }; }

/**
 * Wraps SocketIO instance creation and send/receive messages
 *
 * @component Chat Component
 * @param {string} robotData  Data of the Robot
 */
export const Chat = (props: ChatProps) => {
	// Data of the current Robot
	const robotData = props.route?.params?.robotData;

	// Chat Histories Provider
	const { chatHistories, updateChatHistories, readNewMessages, getChatSocket } = useContext(ChatContext);
  
	// Get the navigation object for the current screen
	const navigation = useNavigation();
	// useAuth to pass the session to Socket Connection Options
	const auth: AuthData | undefined = useAuth().authData;
  
	// The Socket IO Client Instance
	const [socket, setSocket] = useState<Socket | null>();
	// The Screen Title based on the Robot and Robot Assistance, 'RA' or the RA User initials when available
	const [screenTitle, setScreenTitle] = useReducer(
		()=>`${robotData?.name} | ${ getNameInitials(chatHistories[robotData?.id]?.header?.recipient.name) || 'RA'}`,
		'Chat'
	);

	// Configures Asynchronous Socket Connection
	useEffect(()=>{

		if(!robotData){
			handleOnError({message: 'Robot is not defined.'});
			return;
		}

		try {
			const configureStreamer = () => {
				const socketInstance = getChatSocket();
				if(socketInstance){
					socketInstance.emit('chat:join', robotData);
					setSocket(socketInstance);
				} else {
					handleOnError({message:'Error retrieving chat socket instance.'});
				}
			};
			configureStreamer();
		} catch (error) {
			handleOnError({message: 'Robot is not defined.'});
		}

		setScreenTitle();

		return () => {
			readNewMessages(robotData?.id);
		};
	}, [robotData, auth]);

	// Updates the Screen Title
	useEffect(()=> {
		props.navigation?.setOptions({title: screenTitle});
	}, [screenTitle]);

	useEffect(()=> {
		setScreenTitle();
	}, [chatHistories]);

	// Sends the message to the server and push it to the current ChatHistories
	const sendMessageHandler = (chatInput: string) => {
		if(!socket) return;
  
		const message = {
			text: chatInput,
			sender: {
				name: auth?.name,
				avatarUrl: '/static/images/Avidbots-logomark-RGB-green.png',
				loginId: auth?.login
			},
			date: new Date().toISOString(),
			robot: {
				id: robotData.id,
				username: robotData.username,
				name: robotData.name
			},
			isReceived: false,
			isRead: true
		};

		socket.emit('chat:message', message);
		updateChatHistories(robotData.id, message);
	};

	const handleOnError = (error: any) => {
		showAlert('Chat error', [
			{ text: 'Ok', onPress: () => {} },
		]);
		navigation.goBack();
		throw new Error(error.message);
	};
    
	return (
		socket ? (
			<>
				<View style={[globalStyles.container, globalStyles.flex1, globalStyles.justifyBetween]}>
					<FlatList
						contentContainerStyle={[chatStyles.messageContainer]}
						data={chatHistories[robotData?.id]?.messages} 
						renderItem={({item}) => (
							<MessageBubble message={item}/>
						)}
						keyExtractor={(item) => item.date}
					/>
					<View>
						<ChatInput onSendMessage={sendMessageHandler}/>
					</View>
				</View>
			</>
		) : (
			<>
				<Loader />
			</>
		)
	);
};
