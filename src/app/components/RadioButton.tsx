import { CheckBox } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import componentStyles from './componentStyles';

interface RadioButtonProps {
	title: string;
	checked: boolean;
	onPress?: () => void;
}

export const RadioButton = (props: RadioButtonProps) => {
	const { theme } = useTheme();
	return (
		<CheckBox
			title={props.title}
			checked={props.checked}
			style={{ backgroundColor: 'transparent' }}
			checkedColor={theme.colors.textColor}
			uncheckedColor={'#979797'}
			containerStyle={[componentStyles.checkBoxContainerStyle]}
			onPress={props.onPress}
			titleProps={{
				style: [
					{
						color: props.checked ? theme.colors.textWhite : '#979797',
					},
					componentStyles.checkBoxTitle,
				],
			}}
			checkedIcon="radio-btn-active"
			uncheckedIcon="radio-btn-passive"
			iconType="fontisto"
		/>
	);
};
