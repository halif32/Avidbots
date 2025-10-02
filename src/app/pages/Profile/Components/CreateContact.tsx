import { Button, useTheme } from '@rneui/themed';
import { View, Text, KeyboardTypeOptions } from 'react-native';
import { globalStyles } from 'styles';
import { TextInput } from 'react-native-gesture-handler';
import {
	horizontalResponsive,
	verticalResponsive,
} from 'utils/responsivenessControlFunction';
import { useTranslation } from 'react-i18next';

type CreateContact = {
	title: string;
	error: string;
	keyboardType: KeyboardTypeOptions;
	onChangeText: (text: string) => void;
	handleCreate: () => void;
	handleCancel: () => void;
};

const CreateContact = ({
	keyboardType,
	onChangeText,
	error,
	title,
	handleCreate,
	handleCancel,
}: CreateContact) => {
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
						color: theme.colors.textColor,
						fontWeight: '500',
						fontSize: 18,
						marginBottom: verticalResponsive(5),
					}}
				>
					{title}
				</Text>
				<TextInput
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					autoFocus={true}
					style={[
						{
							marginVertical: 10,
							color: theme?.colors?.textColor,
							borderBottomWidth: 1,
							borderBottomColor: theme.colors.textColor,
						},
					]}
				/>
				{error !== '' && (
					<Text style={{ color: 'red' }}>
						{error}
					</Text>
				)}
				<View style={[globalStyles.row]}>
					<View style={[globalStyles.flex1]}>
						<Button type='outline' title={t('Cancel')} onPress={handleCancel}></Button>
					</View>
					<View style={[globalStyles.flex1]}>
						<Button type='solid' title={t('Submit')} onPress={handleCreate}></Button>
					</View>
				</View>
			</View>
		</>
	);
};

export default CreateContact;
