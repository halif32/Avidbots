import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import componentStyles from './componentStyles';
import { globalStyles } from 'styles';
import { Icon, useTheme } from '@rneui/themed';

interface FilterTabProps {
  name: string;
  iconName: string;
  iconType: string;
  tabPress: () => void;
  tabStyle?: StyleProp<ViewStyle>;
  IconStyle?: StyleProp<any>;
}

export const FilterTab = (props: FilterTabProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        componentStyles.tabSpacing,
        globalStyles.row,
        globalStyles.alignItemsCenter,
        globalStyles.justifyCenter,
        globalStyles.h100,
        globalStyles.w50,
        props.tabStyle,
      ]}
      onPress={props.tabPress}
    >
      <Text style={[{ color: theme.colors.textColorWhiteGray }, componentStyles.tabTitle]}>
        {props.name}
      </Text>
      <Icon
        name={props.iconName}
        type={props.iconType}
        color={theme.colors.textColorWhiteGray}
        size={15}
        style={props.IconStyle}
      />
    </TouchableOpacity>
  );
};
