import { View, Text, FlatList } from 'react-native';
import { globalStyles } from 'styles';
import { CustomCheckBox } from 'components/CheckBox';
import { reportStyles } from '../../styles';
import { useReportData } from 'contexts/ReportDataContext';
import componentStyles from 'components/componentStyles';
import { Loader } from 'components/Loader/Loader';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

export const RobotsFilter = () => {
  const { robots, loading, selectedRobots, setSelectedRobots } = useReportData();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const handleCheckBoxToggle = (option: any) => {
    if (selectedRobots.includes(option)) {
      setSelectedRobots(selectedRobots.filter((item: any) => item !== option));
    } else {
      setSelectedRobots([...selectedRobots, option]);
    }
  };

  return (
    <View style={[componentStyles.bottomSheetMainContainer]}>
      <Text style={[globalStyles.marginBottom5, reportStyles.bottomSheetHeader]}>{t('Robots')}</Text>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={robots}
          keyExtractor={(data) => data.loginId}
          onEndReachedThreshold={1.0}
          initialNumToRender={10}
          ListEmptyComponent={
            <Text
              style={[
                { color: theme.colors.textColor },
                globalStyles.paddingHorz10,
                globalStyles.paddinVert10,
                globalStyles.textCenter,
              ]}
            >
              {t('No_Robots_Available')}
            </Text>
          }
          renderItem={({ item }: any) => {
            return (
              <CustomCheckBox
                title={item.label}
                checked={selectedRobots.includes(item.loginId)}
                onPress={() => {
                  handleCheckBoxToggle(item.loginId);
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
};
