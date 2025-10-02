import { Text, useTheme , Button } from '@rneui/themed';
import { TextInput, View } from 'react-native';
import { globalStyles } from 'styles';
import { useEffect, useState } from 'react';
import { useProfileContext } from 'contexts/ProfileContext';
import { useAuth } from 'contexts/Auth';
import { getModel, getSystemName, getSystemVersion, getVersion } from 'react-native-device-info';
import AuthService from 'services/AuthService';
import { showAlert } from 'services/AlertService';
import { useTranslation } from 'react-i18next';

export const FeedbackForm = (props: any) => {
	const [answer1, setAnswer1] = useState('');
	const [answer2, setAnswer2] = useState('');
	const [answer1Required, setAnswer1Required] = useState(false);
	const [answer2Required, setAnswer2Required] = useState(false);
	const { profileInfo } = useProfileContext();
	const { authData } = useAuth();
	const [userTimezone, setUserTimezone] = useState('');
	const authService = AuthService();
	const updateForm = () => {
		setAnswer1Required(answer1 === '');
		setAnswer2Required(answer2 === '');
	};
	const {t} = useTranslation();

	useEffect(() => {
		setUserTimezone(profileInfo.time_zone);
	}, [profileInfo]);

	const _submitFeedback = () => {
		updateForm();
		if (answer1 === '' || answer2 === '') { return; }
		const _data = {
			account: authData?.account,
			firstName: 'test',
			lastName: '_test',
			organization: 'AM',
			contactEmail: 'test@t.com',
			goal: answer1,
			suggestion: answer2,
			timezone: userTimezone,
			software_version: `${getSystemName()} ${getSystemVersion()}`,
			device_type: getModel(),
			app_version: `Avidbots Mobile ${getVersion()}`
		};
		authService.submitFeedback(_data).then(response => {
			if (response.status === 200) {
				props._showFeedback(false);
				showAlert(t('Feedback_Successfully_Submmited_Message'), [
					{
						text: t('Ok'), onPress: () => { }
					},
				]);
			} else {
				showAlert(t('Something_Went_Wrong'), [
					{
						text: t('Ok'), onPress: () => { }
					},
				]);
			}
		});
	};

	const { theme } = useTheme();
	const feedbackInput = {
		borderRadius: 8,
		height: 100,
		color: theme?.colors?.textColor2,
		marginTop: 10, borderWidth: 0.3,
		borderColor: theme.colors.textColor2,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.textColor
	};


	return (
		<>
			<View style={[globalStyles.br8, { backgroundColor: theme.colors.ListItemBGColor, padding: 15 }]}>
				<View>
					<Text style={{ color: theme.colors.textColor2, fontWeight: '500', fontSize: 18, marginBottom: 5 }}>{t('Feedback_Form_Header')}</Text>
					<View style={[globalStyles.marginVer10]}>
						<Text style={{ color: theme.colors.textColor2, fontWeight: '500', fontSize: 16, marginBottom: 5 }}>{t('Feedback_Form_Q1')} </Text>
						<TextInput
							editable
							multiline
							numberOfLines={4}
							maxLength={2000}
							onChangeText={text => { setAnswer1(text); updateForm(); }}
							value={answer1}
							style={feedbackInput}
						/>
						{answer1Required ? <Text style={{ color: theme.colors.error }}>{t('Required')}</Text> : <></>}
					</View>
					<View style={[globalStyles.marginVer10]}>
						<Text style={{ color: theme.colors.textColor2, fontWeight: '500', fontSize: 16, marginBottom: 5 }}>{t('Feedback_Form_Q2')}</Text>
						<TextInput
							editable
							multiline
							numberOfLines={4}
							maxLength={2000}
							onChangeText={text => { setAnswer2(text); updateForm(); }}
							value={answer2}
							style={feedbackInput}
						/>
						{answer2Required ? <Text style={{ color: theme.colors.error }}>{t('Required')}</Text> : <></>}
					</View>
					<View style={[globalStyles.row]}>
						<View style={[globalStyles.flex1]}>
							<Button type='outline' title={t('Cancel')} onPress={() => props._showFeedback(false)}></Button>
						</View>
						<View style={[globalStyles.flex1]}>
							<Button type='solid' title={t('Submit')} onPress={_submitFeedback}></Button>
						</View>
					</View>
				</View>
			</View>
		</>
	);
};

