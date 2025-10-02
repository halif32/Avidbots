import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { globalStyles } from 'styles';
import { CustomCheckBox } from 'components/CheckBox';
import { reportStyles } from '../../styles';
import { useReportData } from 'contexts/ReportDataContext';
import { Loader } from 'components/Loader/Loader';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

export const ReportStatus = () => {
  const { reportStatus, loading, selectedReportStatus, setSelectedReportStatus } = useReportData();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [reportStatusFilter, setReportStatusFilter] = useState<any>([]);
  const transformArray = (array) =>
    array.map((item) => ({
      id: item,
      title: item
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    }));

  useEffect(() => {
    if (reportStatus) {
      const formatedArray = transformArray(reportStatus);
      setReportStatusFilter(formatedArray);
    }
  }, [reportStatus]);

  const handleCheckBoxToggle = (option: any) => {
    if (selectedReportStatus.includes(option)) {
      setSelectedReportStatus(selectedReportStatus.filter((item: any) => item !== option));
    } else {
      setSelectedReportStatus([...selectedReportStatus, option]);
    }
  };
  return (
    <View>
      <Text style={[globalStyles.marginBottom5, reportStyles.bottomSheetHeader]}>
      {t('Report_Status')}
      </Text>

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={reportStatusFilter}
          keyExtractor={(data) => data.id}
          ListEmptyComponent={
            <Text
              style={[
                { color: theme.colors.textColor },
                globalStyles.paddingHorz10,
                globalStyles.paddinVert10,
                globalStyles.textCenter,
              ]}
            >
              {t('No_Report_Status')}
            </Text>
          }
          renderItem={({ item }: any) => {
            return (
              <CustomCheckBox
                title={item.title}
                checked={selectedReportStatus.includes(item.id)}
                onPress={() => {
                  handleCheckBoxToggle(item.id);
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
};
