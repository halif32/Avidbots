import { Divider, Icon, useTheme } from '@rneui/themed';
import { TouchableOpacity, View, Text } from 'react-native';
import { globalStyles } from 'styles';
import {
	horizontalResponsive,
	verticalResponsive,
} from 'utils/responsivenessControlFunction';
import { useTranslation } from 'react-i18next';

type ContactMenu = {
	selectedContact: { contact_value: string };
	onPress: () => void;
	handleVerification: () => void;
};

const ContactMenu = ({
	selectedContact,
	handleVerification,
	onPress,
}: ContactMenu) => {
	const { theme } = useTheme();
	const {t}=useTranslation();
	return (
		<>
			<View
				style={[
					globalStyles.br8,
					{
						backgroundColor: theme.colors.ListItemBGColor,
						padding: horizontalResponsive(15),
					},
				]}
			>
				<Text
					style={{
						fontSize: 16,
						fontWeight: '500',
						marginBottom: verticalResponsive(20),
						color: theme.colors.textColor,
					}}
				>
					{selectedContact?.contact_value}
				</Text>
				<View>
					<TouchableOpacity
						onPress={handleVerification}
						style={[
							globalStyles.row,
							globalStyles.alignItemsCenter,
							globalStyles.justifyBetween,
							globalStyles.marginBottom15,
							globalStyles.marginTop10,
						]}
					>
						<Text style={{ color: theme.colors.textColor, fontSize: 16 }}>
							{t('Resend_Verification')}
						</Text>
						<Icon name="rotate-cw" color={theme.colors.brandColor} />
					</TouchableOpacity>
					<Divider />
					<TouchableOpacity
						onPress={onPress}
						style={[
							globalStyles.row,
							globalStyles.alignItemsCenter,
							globalStyles.justifyBetween,
							globalStyles.marginTop10,
						]}
					>
						<Text style={{ color: theme.colors.textColor, fontSize: 16 }}>
							{t('Delete')}
						</Text>
						<Icon name="trash-2" color={'#be3843'} />
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default ContactMenu;
