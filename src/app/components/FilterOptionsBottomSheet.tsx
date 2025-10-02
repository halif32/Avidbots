import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import componentStyles from './componentStyles';
import { DateRange } from 'pages/Reports/Components/ReportFilterComponents/DateRange';
import { RobotsFilter } from 'pages/Reports/Components/ReportFilterComponents/RobotsFilter';
import { CleaningPlan } from 'pages/Reports/Components/ReportFilterComponents/CleaningPlan';
import { ReportStatus } from 'pages/Reports/Components/ReportFilterComponents/ReportStatus';

interface BottomSheetProps {
  isBottomSheetVisible: boolean;
  toggleBottomSheet: () => void;
  sheetDataID: string;
}

export const FilterOptionsBottomSheet = (props: BottomSheetProps) => {
  const { theme } = useTheme();

  const renderBottomSheet = (id: string) => {
    if (id === '1') {
      return <DateRange />;
    } else if (id === '2') {
      return <CleaningPlan />;
    } else if (id === '3') {
      return <RobotsFilter />;
    } else {
      return <ReportStatus />;
    }
  };
  return (
    <Modal
      isVisible={props.isBottomSheetVisible}
      onBackdropPress={props.toggleBottomSheet}
      onBackButtonPress={props.toggleBottomSheet}
      style={[globalStyles.justifyEnd, globalStyles.alignItemsCenter]}
    >
      <View style={[globalStyles.justifyEnd, globalStyles.alignItemsCenter]}>
        <View
          style={[
            componentStyles.bottomSheet,
            { backgroundColor: theme.colors.reportCardBackground },
          ]}
        >
          {renderBottomSheet(props.sheetDataID)}
          <View style={[globalStyles.flex1, globalStyles.justifyEnd, globalStyles.marginTop20]}>
            <View
              style={[
                {
                  borderColor: theme.colors.textColor,
                },
                componentStyles.bottomSheetDivider,
              ]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
