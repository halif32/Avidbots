import { Text, useTheme , Icon } from '@rneui/themed';
import { View, TouchableOpacity, Linking } from 'react-native';
import { globalStyles } from 'styles';
import { InfoStyles } from 'pages/Info/styles';


type InfoItemProps = {
	type: string,
	icon: string,
	iconColor: string,
	text: string, value: string
}

const InfoItem = ({ type, icon, iconColor, text, value }: InfoItemProps) => {
	const { theme } = useTheme();
	const handleOnPress = () => {
		if (type == 'email') {
			Linking.openURL(`mailto:${value}`);
		} else {
			const updatedValue = value.split(' ').join('');
			const key = `tel:${updatedValue}`;
			Linking.openURL(key);
		}
	};
	return <TouchableOpacity onPress={handleOnPress} style={[globalStyles.row, globalStyles.alignItemsCenter, globalStyles.marginTop10, globalStyles.justifyBetween]}>
		<View style={[globalStyles.row, [globalStyles.flex1]]}>
			<Icon name={icon} color={iconColor} size={12} />
			<Text h4 h4Style={[InfoStyles.text, { color: theme.colors?.textWhite, marginLeft: 5 }]}>{text}</Text>
		</View>
		<View style={[globalStyles.flex1]}>
			<Text style={[globalStyles.textleft]} h4 h4Style={[InfoStyles.text, { color: theme.colors.textWhite }]}>{value}</Text>
		</View>
	</TouchableOpacity>;
};

export default InfoItem;