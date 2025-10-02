import { createContext, useEffect, useState } from 'react';
import { ChatMessage } from 'models/ChatMessageModel';
import { Robot } from 'models/RobotModel';
import { Socket } from 'socket.io-client';
import { useAuth } from './Auth';
import { AuthData } from 'services/AuthService';
import SocketConnections from 'shared/StreamerSocket';

/**
 * Represents a collection of chat histories for different robots.
 *
 * @example
 * [
 *  '1':{
 *      header: {
 *        recipient: { name: 'recipientName', avatarUrl:'...' },
 *        robot: {...}
 *      },
 *      messages: [
 *        {...},
 *        {...}
 *      ]
 *    }
 * ]
 * 
 */
interface ChatHistories {
	[robotId: string]: { header: ChatHeader, messages: ChatMessage[] };
}
/**
 * Represents the header information for a chat.
 * 
 * @example
 * 
 * interface ChatHeader {
 *  recipient: {
 *   name: 'string',
 *   avatarUrl: 'string'
 * };
 */
interface ChatHeader {
	recipient: {
		name: string,
		avatarUrl: string
	};
	robot: Robot;
}

/**
 * Represents the props for the ChatContext component.
 */
interface ChatContextProps {
	/**
	 * The map of chat histories for different robots.
	 */
	chatHistories: ChatHistories;

	/**
	 * Updates the chat history with a new message for a specific robot.
	 * @param robotId - The ID of the robot.
	 * @param newMessage - The new message to be added.
	 */
	updateChatHistories: (robotId: string, newMessage: ChatMessage) => void;

	/**
	 * Mark not read messages as read for a specific robot Chat
	 * @param robotId - The ID of the robot.
	 */
	readNewMessages: (robotId: string) => void;

	/**
	 * Returns the number of Chats with unread messages
	 */
	countChatWithUnreadMessages: () => number;

	/**
	 * Returns the Chat SocketIO Instance
	 */
	getChatSocket: () => Socket | null;

}

const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

const ChatProvider: React.FC = ({children}) => {
	const [chatHistories, setChatHistories] = useState<ChatHistories>({});
	const [chatSocketInstance, setChatSocketInstance] = useState<any>(null);
	const auth: AuthData | undefined = useAuth().authData;
	const socketService = SocketConnections();
	const updateChatHistories = (robotId: string, newMessage: ChatMessage) => {
		setChatHistories(previousChatHistories => {
			const existingChatHistory = previousChatHistories[robotId];
			let updatedChatHistory = {};

			// If the Chat History already exists, just include the new message
			// eslint-disable-next-line
			updatedChatHistory = existingChatHistory ? { ...existingChatHistory, messages: [...existingChatHistory?.messages, newMessage] }
				: { messages: [newMessage] };

			// Return previous Chat Histories plus the new addition
			return {
				...previousChatHistories,
				[robotId]: updatedChatHistory
			};

		});
	};

	const readNewMessages = (robotId: string): void => {
		setChatHistories(previousChatHistories => {
			const existingChatHistory = previousChatHistories[robotId];

			if (existingChatHistory) {
				const { messages } = existingChatHistory;
				const updatedMessages = messages.map(message => ({ ...message, isRead: true }));

				const updatedChatHistory = {
					...existingChatHistory,
					messages: updatedMessages
				};

				return {
					...previousChatHistories,
					[robotId]: updatedChatHistory
				};
			}

			return previousChatHistories;
		});
	};

	const getChatSocket = (): Socket | null => {
		if (chatSocketInstance) {
			return chatSocketInstance;
		}
		return null;
	};

	const countChatWithUnreadMessages = (): number => {
		// Transform ChatHistories in an Array and reduce it summing '1' if it has some message that is not read yet
		return Object.entries(chatHistories).reduce((acc, current) => {
			const hasUnreadMessages = current[1]?.messages.some(message => !message.isRead) ? 1 : 0;
			return (acc + hasUnreadMessages);
		}, 0);
	};

	const connectChatSocket = async (session: string): Promise<Socket> => {

		const socketInstance = await socketService.socketStreamer(session);

		setChatSocketInstance(socketInstance);

		return socketInstance;
	};

	const updateChatHistoryHeader = (robot: Robot, recipient: any): void => {
		const robotId = robot.id;
		setChatHistories(previousChatHistories => {
			const existingChatHistory = previousChatHistories[robotId];

			if (existingChatHistory) {
				const updatedChatHistory = {
					...existingChatHistory,
					header: {
						recipient,
						robot
					}
				};

				return {
					...previousChatHistories,
					[robotId]: updatedChatHistory
				};
			}

			return previousChatHistories;
		});
	};

	useEffect(() => {
		if (auth) {
			connectChatSocket(auth.id);
		}
	}, []);

	useEffect(() => {
		if (!chatSocketInstance) return;
		chatSocketInstance.on('chat:message', (messageObj: any) => {
			updateChatHistories(messageObj.robot.id, { ...messageObj, isReceived: true, isRead: false });
			updateChatHistoryHeader(messageObj.robot, messageObj.sender);
		});

		chatSocketInstance.on('disconnect', (reason: any) => {
			return reason;
		});

		chatSocketInstance.on('connect_error', (err: any) => {
			return err;
		});

	}, [chatSocketInstance]);

	return (
		<ChatContext.Provider
			value={{
				chatHistories,
				updateChatHistories,
				readNewMessages,
				getChatSocket,
				countChatWithUnreadMessages
			}}>
			{children}
		</ChatContext.Provider>
	);

};

export { ChatContext, ChatProvider };