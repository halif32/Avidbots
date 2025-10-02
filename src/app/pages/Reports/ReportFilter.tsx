import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon, ListItem, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import { reportStyles } from './styles';
import { FilterOptionsBottomSheet } from 'components/FilterOptionsBottomSheet';
import { useReportData } from 'contexts/ReportDataContext';
import useFilterData from 'constants/reportFilter';
import { useTranslation } from 'react-i18next';

export const ReportFilter = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { daysToShowFilter, getFilters } = useReportData();
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const { filterTabs } = useFilterData();
  const { t } = useTranslation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderListView = (el: any, index: number) => {
    return (
      <ListItem.Accordion
        key={index}
        containerStyle={[reportStyles.listViewContainer]}
        content={
          <>
            <ListItem.Content style={[globalStyles.row, globalStyles.justifyBetween]}>
              <ListItem.Title
                style={[
                  {
                    color: theme.colors.textColor,
                  },
                  reportStyles.filterTabText,
                ]}
              >
                {t(el?.title)}
              </ListItem.Title>
              {el.id == 1 ? (
                <Text style={{ color: theme.colors.textColor }}>
                  {t('Last')} {daysToShowFilter == 1 ? '24' : daysToShowFilter} days
                </Text>
              ) : null}
            </ListItem.Content>
          </>
        }
        onPress={() => {
          // showBottomSheet();
          setActiveTab(el.id);
          toggleModal();
          // settingExpanded === el?.title
          // 	? setSettingExpanded('')
          // 	: setSettingExpanded(el?.title);
        }}
        icon={{
          name: el.iconName,
          color: theme.colors.textColor,
          size: 15,
          type: el.type,
        }}
      ></ListItem.Accordion>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.colors?.white,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {t('Filters')}
          </Text>
        );
      },
      headerLeft: () => {
        return (
          <Text>
            <Icon
              name="chevron-left"
              iconProps={{ name: 'chevron-left', color: theme.colors.white }}
              onPress={() => navigation.goBack()}
            />
          </Text>
        );
      },
    });
  }, []);
  useEffect(() => {
    getFilters(daysToShowFilter);
  }, [daysToShowFilter]);
  return (
    <View style={globalStyles.flex1}>
      <FlatList
        data={filterTabs}
        keyExtractor={(data) => data.id}
        renderItem={({ item, index }) => renderListView(item, index)}
      />
      <FilterOptionsBottomSheet
        isBottomSheetVisible={isModalVisible}
        toggleBottomSheet={toggleModal}
        sheetDataID={activeTab}
      />
    </View>
  );
};
