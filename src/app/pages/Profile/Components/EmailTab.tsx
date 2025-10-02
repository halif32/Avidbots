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
import { useTranslation } from 'react-i18next';

const EmailTab = ({ contactMethods, getContactMethods }: any) => {
	const { theme } = useTheme();
	const [isModalVisible, setModalVisible] = useState(false);
	const [isMenuVisible, setMenuVisible] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const preferencesServices = PreferencesService();
	const [selectedEmail, setSelectedEmail] = useState<ContactMethod>({
		id: 0,
		contact_type: '',
		contact_value: '',
		verified: 0,
	});
	const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

	const {t}=useTranslation();

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
		setEmail('');
		setError('');
	};

	const toggleMenu = () => {
		setMenuVisible(!isMenuVisible);
	};

	const handleCreateEmail = async () => {
		if (!email.match(emailRegex)) {
			setError(t('Valid_Email_Address_Error'));
			return;
		}

		try {
			const response = await preferencesServices.createContact({
				contact_type: 'email',
				contact_value: email,
			});
			if (response.status == 200) {
				getContactMethods();
				toggleModal();
			} else if (response.response.data.code == 400) {
				if (response.response.data.token == 'contactmethod.error.conflict') {
					setError(t('Contact_Method_Already_Exits'));
				} else {
					setError(response.response.data.errors[0].message);
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
								selectedEmail?.id
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
		const payload = { email: selectedEmail.contact_value, type: 'verify_email' };
		try {
			const response = await preferencesServices.resendVerification(payload);
			if (response.status == 200) {
				showAlert(t('Verification_Email_Sent_Message'), [
					{ text: t('Ok'), onPress: () => { } },
				]);
				toggleMenu();
			} else if (response.response.data.code == 400) {
				setError(response.data?.errors[0]?.message);
			} else if (response.response.data.code == 502) {
				showAlert(t('Error_Sending_Verification_Email'), [
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
					globalStyles.marginTop10,
					globalStyles.alignItemsCenter,
				]}
			>
				<Text
					style={[
						globalStyles.paddingHorz10,
						{ color: theme.colors.divider, fontSize: 15 },
					]}
				>
					{t('Emails')}
				</Text>
				<TouchableOpacity onPress={toggleModal}>
					<Icon name="plus-circle" size={20} color={theme.colors.textColor} />
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 20 }}>
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
									setSelectedEmail(item);
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
					keyboardType='email-address'
					title={t('Add_Email')}
					onChangeText={(text: string) => {
						setEmail(text);
						setError('');
					}}
					handleCancel={toggleModal}
					handleCreate={handleCreateEmail}
					error={error}
				/>
			</Modal>

			<Modal
				isVisible={isMenuVisible}
				onBackdropPress={toggleMenu}
				onBackButtonPress={toggleMenu}
			>
				<ContactMenu
					selectedContact={selectedEmail}
					handleVerification={handleVerification}
					onPress={handleDelete}
				/>
			</Modal>
		</View>
	);
};

export default EmailTab;
