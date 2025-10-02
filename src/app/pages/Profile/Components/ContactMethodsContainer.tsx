import { View } from 'react-native';
import { useEffect } from 'react';
import { Divider } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import EmailTab from './EmailTab';
import PhoneNumbersTab from './PhoneNumbersTab';
import { useProfileContext } from 'contexts/ProfileContext';

export const ContactMethodsContainer = () => {
	const {contactMethods,getContactMethods} = useProfileContext();
	const { theme } = useTheme();

	const emails = contactMethods?.length > 0 ? contactMethods?.filter(contact => contact?.contact_type == 'email') : [];
	const phoneNumbers = contactMethods?.length > 0 ? contactMethods?.filter(contact => contact?.contact_type == 'sms') : [];

	useEffect(() => {
		getContactMethods();
	}, []);

	return (
		<View style={[globalStyles.padding10]}>
			<View style={[globalStyles.paddingHorz10, globalStyles.paddinVert10, { backgroundColor: theme.colors.ListItemBGColor }]}>
				{/* Emails section */}
				<EmailTab contactMethods={emails} getContactMethods={getContactMethods} />
				<Divider />

				{/* Phone Section */}
				<PhoneNumbersTab contactMethods={phoneNumbers} getContactMethods={getContactMethods} />
			</View>
		</View>
	);
};