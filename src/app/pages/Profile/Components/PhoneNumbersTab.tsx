import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from 'styles';
import { Icon, useTheme } from '@rneui/themed';
import { Divider } from '@rneui/base';
import ContactItem from './ContactItem';
import { useState } from 'react';
import Modal from 'react-native-modal';
import PreferencesService from 'services/preferencesService';
import { showAlert } from 'services/AlertService';
import { ContactMethod } from '../types/ProfileTypes';
import CreateContact from './CreateContact';
import ContactMenu from './ContactMenu';
import { verticalResponsive } from 'utils/responsivenessControlFunction';
import { useTranslation } from 'react-i18next';

const PhoneNumbersTab = ({ contactMethods, getContactMethods }: any) => {
	const { theme } = useTheme();
	const [isModalVisible, setModalVisible] = useState(false);
	const [isMenuVisible, setMenuVisible] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [error, setError] = useState('');
	const preferencesServices = PreferencesService();
	const [selectedNumber, selectedPhoneNumber] = useState<ContactMethod>({
		id: 0,
		contact_type: '',
		contact_value: '',
		verified: 0,
	});

	const {t}=useTranslation();

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
		setPhoneNumber('');
		setError('');
	};

	const toggleMenu = () => {
		setMenuVisible(!isMenuVisible);
	};

	const handleAddPhoneNumber = async () => {
		if (!phoneNumber) {
			setError(t('Valid_PhoneNumber_Error_Message'));
			return;
		}

		try {
			const response = await preferencesServices.createContact({
				contact_type: 'sms',
				contact_value: phoneNumber,
			});
			if (response.status == 200) {
				getContactMethods();
				toggleModal();
			} else if (response.response.data.code == 400) {
				if (response.response.data.token == 'contactmethod.error.conflict') {
					setError(t('Contact_Method_Already_Exits'));
				} else {
					setError(t('Contact_Method_Already_Exits'));
				}
			}
		} catch (error: any) {
			showAlert(t('Failed_To_Add_Contact'), [{ text: t('Ok'), onPress: () => { } }], t('Error'));
		}
	};

	const handleDelete = async () => {
		showAlert(
			t('Conformation_Message_To_Delete_Contact_Method.'),
			[
				{ text: t('No'), onPress: () => { } },
				{
					text: t('Yes'),
					onPress: async () => {
						try {
							const response = await preferencesServices.deleteContact(
								selectedNumber?.id
							);
							if (response.status == 400) {
								setError(response.data?.errors[0]?.message);
							} else {
								toggleMenu();
								getContactMethods();
							}
						} catch (error: any) {
							showAlert(t('Failed_To_Delete_Contact'), [{ text: t('Ok'), onPress: () => { } }], t('Error'));
						}
					},
				},
			],
			t('Confirm_Delete')
		);
	};

	const handleVerification = async () => {
		const payload = { number: selectedNumber.contact_value, type: 'verify_sms' };
		try {
			const response = await preferencesServices.resendVerification(payload);
			if (response.status == 200) {
				showAlert(t('Verification_SMS_Sent_Message'), [
					{ text: t('Ok'), onPress: () => { } },
				]);
				toggleMenu();
			} else if (response.status == 400) {
				setError(response.data?.errors[0]?.message);
			} else if (response.response.data.code == 400) {
				setError(response.data?.errors[0]?.message);
			} else if (response.response.data.code == 502) {
				showAlert(t('Error_Sending_Verification_Code'), [
					{ text: t('Ok'), onPress: () => { } },
				]);
				toggleMenu();
			}
		} catch (error: any) {
			showAlert(t('Failed_To_Send_Code'), [{ text: t('Ok'), onPress: () => { } }], t('Error'));
		}
	};

	return (
		<View>
			<View
				style={[
					globalStyles.row,
					globalStyles.justifyBetween,
					globalStyles.alignItemsCenter,
					{ marginTop: verticalResponsive(30) },
				]}
			>
				<Text
					style={[
						globalStyles.paddingHorz10,
						{ color: theme.colors.divider, fontSize: 15 },
					]}
				>
					{t('Phone_Numbers')}
				</Text>
				<TouchableOpacity onPress={toggleModal}>
					<Icon name="plus-circle" size={20} color={theme.colors.textColor} />
				</TouchableOpacity>
			</View>
			<View style={[globalStyles.marginTop20]}>
				<FlatList
					data={contactMethods}
					keyExtractor={(data) => data?.id?.toString()}
					renderItem={({ item }) => {
						const iconName = item.verified == 1 ? 'check' : 'alert-circle';
						const iconColor =
							item.verified == 1 ? theme.colors.brandColor : '#FFB26B';
						return (
							<ContactItem
								text={item.contact_value}
								iconName={iconName}
								iconColor={iconColor}
								onPress={() => {
									selectedPhoneNumber(item);
									toggleMenu();
								}}
							/>
						);
					}}
					ItemSeparatorComponent={() => (
						<Divider style={[globalStyles.marginTop10]} />
					)}
				/>
			</View>

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={toggleModal}
				onBackButtonPress={toggleModal}
			>
				<CreateContact
					keyboardType="phone-pad"
					title={t('Add_Phone_Number')}
					handleCreate={handleAddPhoneNumber}
					onChangeText={(text) => {
						setPhoneNumber(text);
						setError('');
					}}
					error={error}
					handleCancel={toggleModal}
				/>
			</Modal>

			<Modal
				isVisible={isMenuVisible}
				onBackdropPress={toggleMenu}
				onBackButtonPress={toggleMenu}
			>
				<ContactMenu
					selectedContact={selectedNumber}
					handleVerification={handleVerification}
					onPress={handleDelete}
				/>
			</Modal>
		</View>
	);
};

export default PhoneNumbersTab;
