import { CommonActions, useNavigation } from '@react-navigation/native';
import { Button, Input, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import { globalStyles } from 'styles';
import { showAlert } from 'services/AlertService';
import AuthService from 'services/AuthService';
import { loginStyles } from './styles';
import { ROUTES } from 'constants/routes';
import { useTranslation } from 'react-i18next';

export const LostTfaKey = () => {
	const [loading, setLoader] = useState(false); //sets loader on login button
	const [email, setEmail] = useState(''); // email input
	const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
	const authService = AuthService();
	const { theme } = useTheme();
	const navigation = useNavigation();
	const [errorMessage, setErrorMessage] = useState<string | any>();
	const {t}=useTranslation();

	const forgotPassword = async () => {
		if (email.trim().length === 0) {
			setErrorMessage(t('Requried'));
			return;
		} else if (!email.match(emailRegex)) {
			setErrorMessage(t('Valid_Email_Address_Error'));
			return;
		}
		setLoader(true);
		const response: string | any = await authService.lostTfaKey(email);
		setLoader(false);
		showAlert(response, [
			{
				text: t('Ok'),
				onPress: () => {
					const resetAction = CommonActions.reset({
						index: 0,
						routes: [{ name: ROUTES.AUTH_STACK.LOGIN }],
					});
					navigation.dispatch(resetAction);
				},
			},
		]);
	};

	return (
		<>
			<View
				style={[
					globalStyles.container,
					globalStyles.column,
					globalStyles.flex1,
					globalStyles.alignItemsCenter,
					loginStyles.loginScreen,
					globalStyles.paddinVert10,
				]}
			>
				<View>
					<Input
						placeholder={t('Enter_Email_Address')}
						onChangeText={(email) => setEmail(email)}
						inputContainerStyle={[
							loginStyles.inputBox,
							globalStyles.br8,
							globalStyles.paddingHorz10,
						]}
						containerStyle={globalStyles.paddingHorz0}
						errorStyle={{ color: 'red' }}
						inputStyle={{ color: theme.colors.background }}
						errorMessage={errorMessage}
					/>
					<View>
						<Button
							title={t('Submit')}
							onPress={forgotPassword}
							loading={loading}
							titleStyle={{ color: theme.colors?.formLabel }}
							color={theme.colors.borderColor}
							buttonStyle={[{ borderWidth: 0 }, globalStyles.marginTop10]}
						/>
					</View>
				</View>
			</View>
		</>
	);
};
