import { Text } from '@rneui/themed';
import { View } from 'react-native';
import { globalStyles } from 'styles';
import { useTranslation } from 'react-i18next';

export const ComingSoon = () => {
	const { t } = useTranslation();
	return (
		<View
			style={[
				globalStyles.container,
				globalStyles.justifyCenter,
				globalStyles.w100,
				globalStyles.alignItemsCenter,
				globalStyles.flex1,
			]}
		>
			<Text h1>{t('Coming_Soon')}</Text>
		</View>
	);
};
