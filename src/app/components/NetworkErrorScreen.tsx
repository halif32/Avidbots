import { View } from 'react-native';
import { Text, useTheme , Button, Icon } from '@rneui/themed';
import { globalStyles } from '../styles';
import { useTranslation } from 'react-i18next';


export const NetworkErrorScreen = (props: any) => {
	const {theme} = useTheme();
	const {textColor} = theme.colors;
	const {t}=useTranslation();
	return <View style={[globalStyles.container, globalStyles.justifyCenter, globalStyles.w100, globalStyles.alignItemsCenter, globalStyles.flex1,{backgroundColor:theme.colors.bgColor}]} >

		<Icon name='wifi' size={60} color={theme.colors.textColor} />
		<Text h4 style={[globalStyles.marginTop10,{color:textColor}]}>{t('No_Internet_Connection')}</Text>
		<Text h3 h3Style={{ fontWeight: 'normal',color:textColor }}>{t('Check_Your_Internet_Connection')}</Text>
		<Button
			title={t('Try_Again')}
			onPress={props.checkInternetConnection}
			titleStyle={{ color: theme.colors.black}}
			containerStyle={[{ marginTop: 20 }, globalStyles.w50]}
		/>
	</View>;
};
