import { View } from 'react-native';
import { globalStyles } from 'styles';
import componentStyles from './componentStyles';
import { useTheme } from '@rneui/themed';
import { FilterTab } from './FilterTab';
interface FilterAndSortTabsProps {
  leftTabOnPress: () => void;
  rightTabOnPress: () => void;
  leftTabName: string;
  rightTabName: string;
  cleaningPlan: any[];
  robots: any[];
  reportStatus: any[];
}

export const FilterAndSortTabs = (props: FilterAndSortTabsProps) => {
  const { theme } = useTheme();
  const {
    leftTabName,
    rightTabName,
    leftTabOnPress,
    rightTabOnPress,
    cleaningPlan,
    robots,
    reportStatus,
  } = props;

  const showIcon = () => {
    if (cleaningPlan.length !== 0 || robots.length !== 0 || reportStatus.length != 0) {
      return 'font-awesome';
    } else {
      return 'feather';
    }
  };
  return (
    <View
      style={[
        {
          borderColor: theme.colors.textColorWhiteGray,
        },
        globalStyles.row,
        globalStyles.br8,
        globalStyles.marginTop20,
        componentStyles.filterAndSortTabMainContainer,
      ]}
    >
      <FilterTab
        name={leftTabName}
        tabPress={leftTabOnPress}
        iconName={'filter'}
        iconType={showIcon()}
      />
      <FilterTab
        name={rightTabName}
        tabPress={rightTabOnPress}
        iconName={'arrow-switch'}
        iconType={'octicon'}
        IconStyle={{ transform: [{ rotate: '90deg' }] }}
        tabStyle={[
          {
            borderColor: theme.colors.textColorWhiteGray,
          },
          componentStyles.rightTabConatiner,
        ]}
      />
    </View>
  );
};
