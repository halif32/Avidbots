import { CheckBox, useTheme } from '@rneui/themed';
import componentStyles from './componentStyles';

interface CheckBoxProps {
  title: string;
  checked: boolean;
  onPress?: () => void;
}

export const CustomCheckBox = (props: CheckBoxProps) => {
  const { theme } = useTheme();
  const { title, checked, onPress } = props;
  return (
    <CheckBox
      title={title}
      checked={checked}
      style={{ backgroundColor: 'transparent' }}
      checkedColor={theme.colors.textColor}
      uncheckedColor={'#979797'}
      containerStyle={[componentStyles.checkBoxContainerStyle]}
      onPress={onPress}
      titleProps={{
        style: [
          {
            color: checked ? theme.colors.textWhite : '#979797',
          },
          componentStyles.checkBoxTitle,
        ],
      }}
    />
  );
};
