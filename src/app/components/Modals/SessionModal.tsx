import { ActivityIndicator, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Text, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import componentStyles from 'components/componentStyles';
import { useTranslation } from 'react-i18next';



export const SessionModal = () => {
	const {theme} = useTheme();
	const {t}=useTranslation();
	
	return (
		<>
			<View style={[componentStyles.absolute]}>
				
				<BlurView
					style={componentStyles.absolute}
					blurType="light"
					blurAmount={10}
					reducedTransparencyFallbackColor="transparent"
				/>
				<View style={[globalStyles.alignItemsCenter, globalStyles.flex1, globalStyles.w100, globalStyles.h100, globalStyles.justifyCenter]}>
					<View style={[globalStyles.padding10, globalStyles.row, {backgroundColor: theme.colors.formLabel}]}>
						<Text style={{color: theme.colors.white}}>{t('Session_Timed_Out')}</Text>
						<ActivityIndicator size="small" color={theme.colors?.primary} style={[globalStyles.marginLeft10]} />
					</View>
					
				</View>
				
			</View>
		</>
	);
};
