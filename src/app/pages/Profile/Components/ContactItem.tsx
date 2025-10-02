import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from 'styles';
import { useTheme, Icon } from '@rneui/themed';



const ContactItem = ({ text, iconName, iconColor, onPress }: { text: string, iconName: string, iconColor: string, onPress: () => void }) => {
	const { theme } = useTheme();

	return <View style={[{ marginTop: 10, marginBottom: 10 }]}>
		<View style={[globalStyles.row, globalStyles.alignItemsCenter, globalStyles.justifyBetween]}>
			<View style={[globalStyles.row, globalStyles.alignItemsCenter, globalStyles.paddingHorz10]}>
				<Icon name={iconName} size={18} color={iconColor} />
				<Text style={[{ color: theme.colors.textColor, marginLeft: 10 }]}>{text}</Text>
			</View>
			<TouchableOpacity onPress={onPress}>
				<Icon name='more-vertical' size={18} color={theme.colors.textColor} />
			</TouchableOpacity>
		</View>
	</View>;
};

export default ContactItem;