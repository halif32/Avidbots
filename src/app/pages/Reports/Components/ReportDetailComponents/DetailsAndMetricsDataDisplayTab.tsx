import { View } from 'react-native';
import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import { reportStyles } from 'pages/Reports/styles';
import { CustomIcon } from 'assets/customIcon/CustomIcon';
import { horizontalResponsive } from 'utils/responsivenessControlFunction';
import { getModifiedTime } from 'utils/getModifiedTime';
import { useProfileContext } from 'contexts/ProfileContext';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';
import useResultIcon from 'constants/reportIcon';
import {
  convertTime,
  getDuration,
  litersToGallons,
  squareFeetToSquareMeters,
} from 'utils/conversionFunctions';
import { getTotalTime } from '../helper';

interface ContentItem {
  apiKey: string;
  icon: string;
  name: string;
  unit: string;
}

interface DetailsAndMetricsDataDisplayTabProps {
  content: {
    list: ContentItem[];
  };
  data: { [key: string]: any };
  unskippedtime: string;
}

export const DetailsAndMetricsDataDisplayTab = (props: DetailsAndMetricsDataDisplayTabProps) => {
  const { theme } = useTheme();
  const { profileInfo } = useProfileContext();
  const result: string = props.data['result'];
  const { iconShape, boxColour } = useResultIcon(result);

  const renderData = (dataKey: string, unit: string) => {
    if (props.data[dataKey] || props.data[dataKey] === 0) {
      if (dataKey == 'start_time' || dataKey == 'end_time') {
        return getModifiedTime(props.data[dataKey], 'MMM DD, YYYY - hh:mm:ss A', true);
      } else if (dataKey == 'result') {
        return (
          <View style={[globalStyles.row]}>
            <View style={[globalStyles.justifyCenter, globalStyles.alignItemsCenter]}>
              <Icon name={iconShape} color={boxColour} size={15} />
            </View>
            <Text style={[reportStyles.tabListDataText]}>
              {' '}
              {capitalizeFirstLetter(props.data[dataKey])}
            </Text>
          </View>
        );
      } else if (dataKey == 'water_usage') {
        return capitalizeFirstLetter(
          litersToGallons(props.data[dataKey], profileInfo.volume_unit) +
            ' ' +
            profileInfo.volume_unit?.replace('us', 'US').replace('litres', 'Litres')
        );
      } else {
        if (profileInfo.area_unit === 'square feet') {
          if (dataKey == 'cleaning_plan_area') {
            return (
              capitalizeFirstLetter(Math.round(props.data[dataKey])) +
              ' ' +
              unit.replace('m²', 'ft²')
            );
          } else {
            return (
              capitalizeFirstLetter(
                dataKey === 'coverage_percentage' || !unit.includes('m²')
                  ? props.data[dataKey]
                  : parseFloat(props.data[dataKey]).toFixed(2)
              ) +
              ' ' +
              unit.replace('m²', 'ft²')
            );
          }
        } else {
          if (unit.includes('m²')) {
            if (dataKey == 'cleaning_plan_area') {
              return capitalizeFirstLetter(
                Math.round(squareFeetToSquareMeters(props.data[dataKey])) + ' ' + unit
              );
            } else {
              return capitalizeFirstLetter(
                squareFeetToSquareMeters(props.data[dataKey]) + ' ' + unit
              );
            }
          } else {
            return capitalizeFirstLetter(props.data[dataKey] + ' ' + unit);
          }
        }
      }
    } else {

      if (dataKey === 'featuresAndAddOns') {
        const featureKeys = [
          'homebase',
          'has_advanced_obstacle_detection_for_warehouses',
          'has_debris_diverter',
          'has_side_sweeper'
        ];
      
        const result = featureKeys
          .filter(key => props.data[key] === 1)
          .map(key => {
            switch (key) {
              case 'homebase':
                return 'Home Base';
              case 'has_advanced_obstacle_detection_for_warehouses':
                return 'Advanced Obstacle Detection for Warehouses';
              case 'has_debris_diverter':
                return 'Debris Diverter';
              case 'has_side_sweeper':
                return 'Side Sweeper';
              default:
                return '';
            }
          })
          .join(', ');
      
        return result;
      }
      if (dataKey == 'totalTime') {
        const duration = getDuration(props.data['start_time'], props.data['end_time']);
        return duration.length !== 0 ? duration : '0s';
      } else if (dataKey === 'totalCleaningTime') {
        const convertedTime = convertTime(props.unskippedtime);
        return convertedTime.length !== 0 ? convertedTime : '0s';
      } else if (dataKey === 'totalOtherTime') {
        const totalOtherTime = getTotalTime(
          props.data['start_time'],
          props.data['end_time'],
          props.unskippedtime
        );
        return totalOtherTime.length !== 0 ? totalOtherTime : '0s';
      }
    }
  };

  return (
    <View>
      {props.content.list &&
        props.content.list.map((d: ContentItem, j: number) => (
          <ListItem key={j} containerStyle={[globalStyles.transparentbg]}>
            <View style={[globalStyles.row, globalStyles.flex1]}>
              <View
                style={[
                  globalStyles.alignItemsCenter,
                  globalStyles.row,
                  globalStyles.flex1,
                  globalStyles.w50,
                ]}
              >
                {d.apiKey === 'location_name' || d.apiKey === 'username' ? (
                  <Icon name={d.icon} size={15} color={theme.colors.textColor} />
                ) : (
                  <CustomIcon
                    name={d.icon}
                    size={15}
                    color={theme.colors.textColor}
                    style={{
                      display: d.apiKey === 'result' ? 'none' : 'flex',
                    }}
                  />
                )}
                <Text
                  style={[
                    globalStyles.flex1,
                    globalStyles.flexWrap,
                    reportStyles.tabListTitleText,
                    {
                      marginLeft: d.apiKey === 'result' ? 0 : horizontalResponsive(10),
                      color: theme.colors.textColor,
                    },
                  ]}
                >
                  {d.name}
                </Text>
              </View>
              <Text
                style={[
                  globalStyles.alignItemsStart,
                  globalStyles.w50,
                  reportStyles.tabListDataText,
                  globalStyles.marginLeft10,
                  {
                    color: theme.colors.textColor,
                  },
                ]}
              >
                {renderData(d.apiKey, d.unit)}
              </Text>
            </View>
          </ListItem>
        ))}
    </View>
  );
};
