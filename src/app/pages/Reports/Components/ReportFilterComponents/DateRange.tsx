import { View, Text, FlatList } from 'react-native';
import { RadioButton } from 'components/RadioButton';
import { globalStyles } from 'styles';
import { reportStyles } from '../../styles';
import { useReportData } from 'contexts/ReportDataContext';
import useFilterData from 'constants/reportFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from 'contexts/Auth';
import { useTranslation } from 'react-i18next';

export const DateRange = () => {
  const { setDaysToShowFilter, daysToShowFilter } = useReportData();
  const { DateRangeData } = useFilterData();
  const { authData } = useAuth();
  const { t } = useTranslation();

  return (
    <View>
      <Text
        style={[
          globalStyles.paddingHorz10,
          globalStyles.marginBottom5,
          reportStyles.bottomSheetHeader,
        ]}
      >
        {t('Date_Range')}
      </Text>
      <FlatList
        data={DateRangeData}
        keyExtractor={(data) => data.id}
        renderItem={({ item }: any) => {
          return (
            <RadioButton
              title={item.title}
              checked={item.id == daysToShowFilter}
              onPress={async () => {
                await AsyncStorage.setItem(`${authData?.login}Range`, item.id);
                setDaysToShowFilter(item.id);
              }}
            />
          );
        }}
      />
    </View>
  );
};
