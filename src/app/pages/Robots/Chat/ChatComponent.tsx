import { Icon, Input, Text } from '@rneui/themed';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from 'react';
import { Pressable, View } from 'react-native';
import { globalStyles } from 'styles';
import { chatStyles } from './styles';

type MessageBubbleProps = { 
	message: 
		{ 
			isReceived: any; 
			text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
			date: string | number | Date; 
		} 
	}

/**
 * ChatInput component.
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onSendMessage - The function to handle sending a message.
 */
const ChatInput = ({ onSendMessage }: { onSendMessage: (text: string) => void }) => {
	const [inputValue, setInputValue] = useState('');

	const sendMessage = () => {
		onSendMessage(inputValue);
		setInputValue('');
	};

	return (
		<Pressable>
			<View>
				<Input
					value={inputValue}
					onChangeText={setInputValue}
					inputContainerStyle={[globalStyles.br14, chatStyles.chatInput, globalStyles.paddingHorz10]}
					placeholder="Type"
					rightIcon={<Icon name="paper-plane" onPress={sendMessage}/>}/>
			</View>
		</Pressable>
	);
};

/**
 * MessageBubble component to display a chat message bubble.
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {ChatMessage} props.message - The message object that holds the text and sender information.
 * 
 * @example
 * <MessageBubble message={message} />
 */
const MessageBubble = (props: MessageBubbleProps) => {
	const styles = !props.message.isReceived  ? [chatStyles.messageBubble, chatStyles.senderBubble] : [ chatStyles.messageBubble, chatStyles.receiverBubble];
  
	return (
		<View style={styles}>
			<Text>{props.message.text}</Text>
			<Text>{new Date(props.message.date).toLocaleString()}</Text>
		</View>
	);
};

export {ChatInput, MessageBubble};