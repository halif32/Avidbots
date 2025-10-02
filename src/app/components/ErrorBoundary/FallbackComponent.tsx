import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { Icon } from '@rneui/themed';
import RNRestart from 'react-native-restart';
import { useTranslation } from 'react-i18next';
export type Props = { error: Error; resetError: () => void }

const FallbackComponent = () => {
	const {t}=useTranslation();
	return <SafeAreaView style={styles.container}>
		<View style={styles.content}>
			<Icon name='alert-circle' size={40} />
			<Text style={styles.subtitle}>{t('Something_Went_Wrong_Message')}</Text>
			<Text style={styles.error}>{t('FallbackComponent_Error_Detail')}</Text>
			<TouchableOpacity style={styles.button} onPress={() => RNRestart.Restart()}>
				<Text style={styles.buttonText}>{t('Try_Again')}</Text>
			</TouchableOpacity>
		</View>
	</SafeAreaView>;
};
export default FallbackComponent;