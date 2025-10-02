import { Text, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import { reportStyles } from 'pages/Reports/styles';
import { CustomIcon } from 'assets/customIcon/CustomIcon';
import { useProfileContext } from 'contexts/ProfileContext';
import { getDuration, squareFeetToSquareMeters } from 'utils/conversionFunctions';
import { getModifiedTime } from 'utils/getModifiedTime';

interface Report {
  location_name: string;
  cleaning_plan_name: string;
  robot_name: string;
  covered_area: number | string;
  coverage_percentage: string;
  start_time: string | Date;
  end_time: string | Date;
}

interface ReportItemTextPartProps {
  report: Report;
}
export const ReportItemTextPart = (props: ReportItemTextPartProps) => {
  const {
    location_name,
    cleaning_plan_name,
    robot_name,
    covered_area,
    coverage_percentage,
    start_time,
    end_time,
  } = props.report;
  const { theme } = useTheme();
  const { profileInfo } = useProfileContext();

  return (
    <>
      <Text
        numberOfLines={2}
        style={[
          { color: theme.colors?.reportItemTextColor },
          reportStyles.boldText,
          reportStyles.textFontSize,
        ]}
      >
        {location_name}
      </Text>
      <Text
        numberOfLines={2}
        style={[
          { color: theme.colors?.reportItemTextColor },
          reportStyles.textFontSize,
          reportStyles.cleaningPlantText,
        ]}
      >
        {cleaning_plan_name}
      </Text>
      <Text
        style={[
          { color: theme.colors?.reportItemTextColor },
          reportStyles.textFontSize,
          globalStyles.marginTop10,
          reportStyles.boldText,
        ]}
      >
        {robot_name}
      </Text>
      <Text
        style={[
          { color: theme.colors?.reportItemTextColor },
          reportStyles.textFontSize,
          reportStyles.detailText,
          globalStyles.marginTop10,
        ]}
      >
        <CustomIcon name="covered-area" />
        {profileInfo.area_unit === 'square feet'
          ? ` ${covered_area} ft²`
          : ` ${squareFeetToSquareMeters(covered_area)} m²`}
      </Text>
      <Text
        style={[
          { color: theme.colors?.reportItemTextColor },
          reportStyles.textFontSize,
          reportStyles.detailText,
        ]}
      >
        <CustomIcon name="covered-area-ratio" /> {parseFloat(coverage_percentage).toFixed(2)} %
      </Text>
      <Text
        style={[
          { color: theme.colors?.reportItemTextColor },
          reportStyles.textFontSize,
          reportStyles.detailText,
        ]}
      >
        <CustomIcon name="time" /> {getModifiedTime(start_time, 'hh:mm:ss A', false)} {'('}{' '}
        {getDuration(start_time, end_time)}
        {')'}
      </Text>
    </>
  );
};
