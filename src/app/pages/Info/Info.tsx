import { Button, Icon, Image, Text, useTheme } from '@rneui/themed';
import {
	Modal,
	SafeAreaView,
	View,
	TouchableOpacity,
	ScrollView , ActivityIndicator } from 'react-native';
import { globalStyles } from 'styles';
import { InfoStyles } from './styles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreferencesService from 'services/preferencesService';
import { showAlert } from 'services/AlertService';
import InfoItem from './Components/InfoItem';
import { horizontalResponsive } from 'utils/responsivenessControlFunction';
import { Images } from 'constants/images';
import { useTranslation } from 'react-i18next';

type ContactInfo = {
	[key: string]: string,
}


export const Info = () => {
	const { theme } = useTheme();
	const [isModalVisible, setIsVisibleModal] = useState(false);
	const [contactInfo, setContactInfo] = useState<ContactInfo>({});
	const preferencesService = PreferencesService();
	const [loading, setLoading] = useState<boolean>(false);
	const {t}=useTranslation();

	const content = {
		headerTitle: t('Need_Help'),
		content:
			t('Information_Content'),
	};

	const getContacts = async () => {
		setLoading(true);

		const localContactInfo: string | null = await AsyncStorage.getItem('@contacts') || null;
		if (localContactInfo && typeof localContactInfo === 'string') {
			// setting the contact information values from localstorage.
			setContactInfo(JSON.parse(localContactInfo));
			setLoading(false);

		} else {
			// if localstroage is empty, fetch the data from database and set it to localstorage
			try {
				const techSupportEmail = await preferencesService.getValue('tech-support-email');
				const techSupportPhoneNumber = await preferencesService.getValue('tech-support-phone-number');
				const cleaningPlanSupportEmail = await preferencesService.getValue('cleaning-plan-support-email');
				const orderConsumablesEmail = await preferencesService.getValue('order-consumables-email');

				const contactInfo = { techSupportEmail, techSupportPhoneNumber, cleaningPlanSupportEmail, orderConsumablesEmail };
				await AsyncStorage.setItem('@contacts', JSON.stringify(contactInfo));

				setContactInfo(contactInfo);
				setLoading(false);

			} catch (error: any) {
				showAlert(error, [{ text: t('Ok'), onPress: () => { } }], t('Error'));
				setLoading(false);
			}
		}

	};

	useEffect(() => {
		getContacts();
	}, []);

	return (
		<SafeAreaView style={globalStyles.flex1}>
			<ScrollView
				style={[
					globalStyles.flex1,
					{ margin: 8, backgroundColor: theme.colors.background },
				]}
			>
				<View
					style={[
						InfoStyles.infoDetailsContainer,
						{ backgroundColor: theme.colors.cardBg },
					]}
				>
					<Text
						h4
						h4Style={{ color: theme.colors.textWhite }}
						style={InfoStyles.headerTitle}
					>
						{content.headerTitle}
					</Text>
					<Text
						style={[
							InfoStyles.infoText,
							{ color: theme.colors.textWhite, lineHeight: 17.07 },
						]}
					>
						{content.content}
					</Text>
					<Image
						style={InfoStyles.image}
						resizeMode="cover"
						source={Images.neo}
					/>
					{loading ? <ActivityIndicator size={20} color={theme.colors.brandColor} style={[globalStyles.marginTop10]} /> : <View style={[globalStyles.marginTop10]}>
						<InfoItem text={t('Tech_Support')} value={contactInfo.techSupportEmail} icon="mail" iconColor={theme.colors.iconColor} type='email' />
						<InfoItem text={t('Cleaning_Plan_Support')} value={contactInfo.cleaningPlanSupportEmail} icon="mail" iconColor={theme.colors.iconColor} type='email' />
						<InfoItem text={t('Supplies_Purchase')} value={contactInfo.orderConsumablesEmail} icon="mail" iconColor={theme.colors.iconColor} type='email' />
						<InfoItem text={t('Phone_Number')} value={contactInfo.techSupportPhoneNumber} icon="phone" iconColor={theme.colors.iconColor} type='phone' />
					</View>}
					<View style={[globalStyles.row, globalStyles.marginTop20,]}>
						<View style={[globalStyles.flex1]}>
							<Button type='solid' title={t('Resource_Center')} onPress={() => setIsVisibleModal(true)} titleStyle={[InfoStyles.buttonText]}></Button>
						</View>
						<View style={[globalStyles.flex1]}>
							<Button type='solid' title={t('FAQs')} onPress={() => setIsVisibleModal(true)} titleStyle={[InfoStyles.buttonText]}></Button>
						</View>
					</View>
				</View>
				<Modal visible={isModalVisible}>
					<SafeAreaView style={[globalStyles.flex1]}>
						<View
							style={[
								globalStyles.flex1,
								globalStyles.alignItemsCenter,
								globalStyles.justifyAround,
							]}
						>
							<View>
								<Text h1 h1Style={{ fontSize: 30,textAlign:'center' }}>
									{t('Coming_Soon')}
								</Text>
								<TouchableOpacity
									style={[
										globalStyles.row,
										globalStyles.alignItemsCenter,
										globalStyles.marginTop20,
										globalStyles.justifyCenter,
										globalStyles.padding10,
										globalStyles.alignSelfCenter,
										{
											backgroundColor: theme.colors.brandColor,
											borderRadius: horizontalResponsive(10),
										},
									]}
									onPress={() => setIsVisibleModal(false)}
								>
									<Icon name="arrow-left" />
									<Text style={InfoStyles.goBacktTextStyle}>{t('Go_Back')}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</SafeAreaView>
				</Modal>
			</ScrollView>
		</SafeAreaView>
	);
};
