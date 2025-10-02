import { useReportData } from 'contexts/ReportDataContext';
import { useTranslation } from 'react-i18next';

// Custom hook to extract data from useReportData
const useFilterData = () => {
  const { selectedCleaningPlans, selectedRobots, selectedReportStatus } = useReportData();
  const { t } = useTranslation();

  const filterTabs = [
    {
      id: '1',
      title: 'Date_Range',
    },
    {
      id: '2',
      title: 'Cleaning_Plans',
      iconName: 'filter',
      type: selectedCleaningPlans.length !== 0 ? 'font-awesome' : 'feather',
    },
    {
      id: '3',
      title: 'Robots',
      iconName: 'filter',
      type: selectedRobots.length !== 0 ? 'font-awesome' : 'feather',
    },
    {
      id: '4',
      title: 'Report_Status',
      iconName: 'filter',
      type: selectedReportStatus.length !== 0 ? 'font-awesome' : 'feather',
    },
  ];

  const DateRangeData = [
    {
      id: '1',
      title: `${t('Last')} 24 hours`,
    },
    {
      id: '3',
      title: `${t('Last')} 3 days`,
    },
    {
      id: '7',
      title: `${t('Last')} 7 days`,
    },
    {
      id: '14',
      title: `${t('Last')} 14 days`,
    },
    {
      id: '30',
      title: `${t('Last')} 30 days`,
    },
    {
      id: '60',
      title: `${t('Last')} 60 days`,
    },
    {
      id: '90',
      title: `${t('Last')} 90 days`,
    },
  ];

  return { filterTabs, DateRangeData };
};

export default useFilterData;
