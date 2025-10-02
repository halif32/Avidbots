import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ReportItem } from 'components/ReportItem';
import { Text, useTheme } from '@rneui/themed';
import { Loader } from 'components/Loader/Loader';
import { globalStyles } from 'styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ReportServices from 'services/ReportServices';
import { ROUTES, TABS } from 'constants/routes';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { FilterAndSortTabs } from 'components/FilterAndSortTabs';
import { reportStyles } from './styles';
import { ListFooterLoader } from 'components/ListFooterLoader';
import { useReportData } from 'contexts/ReportDataContext';
import { useProfileContext } from 'contexts/ProfileContext';

type ReoprtsProps = {
  route?: { params: { id: any } };
};

export const Reports = (props: ReoprtsProps) => {
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sortData, setSortData] = useState('desc');
  const [limit, setLimit] = useState(10);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const { selectedCleaningPlans, selectedRobots, selectedReportStatus, daysToShowFilter } =
    useReportData();
  const { profileInfo, getProfileInfo } = useProfileContext();

  const reportsServices = ReportServices();
  let robotId: any = 0;
  if (props.route?.params && props.route.params.id) {
    robotId = props.route.params.id;
  }

  const loadReports = async (limit: any) => {
    if (limit === 10) {
      setRefreshing(true); //pull to refresh
      setLoader(true);
    }
    const _reports = await reportsServices.fetchReports(
      robotId,
      limit,
      selectedReportStatus.join(),
      selectedCleaningPlans.join(),
      selectedRobots.join(),
      sortData,
      daysToShowFilter
    );
    setReports(_reports?.data);
    if (limit === 10) {
      setRefreshing(false); //pull to refresh
      setLoader(false);
    } else {
      setLoading(false);
    }
  };

  const HandleOnReachEnd = () => {
    if (reports?.length >= 10 && !loading) {
      setLoading(true);
      loadReports(limit + 10);
      setLimit(limit + 10);
    }
  };

  const navigateToReportDetails = (item: any) => {
    navigation.navigate(TABS.REPORTS_TAB, {
      screen: ROUTES.REPORTS.REPORT_DETAILS,
      initial: false,
      params: {
        report: item,
      },
    });
  };

  const navigateToFiterScreen = () => {
    navigation.navigate(TABS.REPORTS_TAB, {
      screen: ROUTES.REPORTS.REPORT_FILTER,
    });
  };

  const sortReportsByDate = () => {
    if (sortData === 'asc') {
      setSortData('desc');
    } else {
      setSortData('asc');
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: theme.colors?.white,
      },
    });
  }, []);

  useEffect(() => {
    getProfileInfo();
  }, []);

  useEffect(() => {
    if (isFocus && profileInfo?.id) {
      loadReports(10);
      setLimit(10);
    }
  }, [robotId, isFocus, sortData, profileInfo]);

  const renderFilterAndSortTab = () => {
    if (
      reports?.length > 1 ||
      selectedCleaningPlans.length !== 0 ||
      selectedRobots.length !== 0 ||
      selectedReportStatus.length !== 0 ||
      daysToShowFilter !== 30
    ) {
      return (
        <FilterAndSortTabs
          leftTabName={t('Filters')}
          rightTabName={t('Date')}
          leftTabOnPress={navigateToFiterScreen}
          rightTabOnPress={sortReportsByDate}
          cleaningPlan={selectedCleaningPlans}
          robots={selectedRobots}
          reportStatus={selectedReportStatus}
        />
      );
    }
  };

  return (
    <View style={[globalStyles.container]}>
      {loader ? (
        <Loader />
      ) : (
        <View>
          {renderFilterAndSortTab()}
          <FlatList
            data={reports}
            style={reportStyles.reportListContainer}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => navigateToReportDetails(item)}>
                <ReportItem
                  isDateShow={
                    index === 0
                      ? true
                      : moment(item.start_time).format('MMM DD, YYYY') !==
                        moment(reports[index - 1].start_time).format('MMM DD, YYYY')
                  }
                  key={item.cleaning_report_id}
                  report={item}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.cleaning_report_id}
            ListEmptyComponent={() => {
              return (
                <Text
                  style={[
                    {
                      color: theme.colors.textColor,
                      fontSize: 20,
                    },
                    globalStyles.alignSelfCenter,
                    globalStyles.marginTop10,
                  ]}
                >
                  {t('No_Reports_Available_Message')}
                </Text>
              );
            }}
            refreshing={refreshing}
            onRefresh={() => {
              loadReports(10);
            }}
            onEndReached={HandleOnReachEnd}
            onEndReachedThreshold={1.0}
            ListFooterComponent={loading ? <ListFooterLoader /> : null}
          />
        </View>
      )}
    </View>
  );
};
