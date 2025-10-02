import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { globalStyles } from 'styles';
import { reportStyles } from '../../styles';
import { getIconAndValue } from '../helper';

interface SectorDataDisplayProps {
  title: string;
  data: string | any;
  type: string;
}
export const SectorDataDisplay = (props: SectorDataDisplayProps) => {
  const { title, data, type } = props;
  return (
    <View style={[globalStyles.row, globalStyles.flex1]}>
      <View
        style={[
          globalStyles.alignItemsCenter,
          globalStyles.row,
          globalStyles.flex1,
          globalStyles.w50,
        ]}
      >
        <Text
          style={[
            globalStyles.marginLeft10,
            globalStyles.flex1,
            globalStyles.flexWrap,
            reportStyles.tabListTitleText,
          ]}
        >
          {title}
        </Text>
      </View>
      <Text style={[globalStyles.alignItemsStart, globalStyles.w50, reportStyles.tabListDataText]}>
        {getIconAndValue(data, type)}
      </Text>
    </View>
  );
};
