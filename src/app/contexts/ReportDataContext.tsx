// ReportDataContext.js

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import ReportServices from 'services/ReportServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './Auth';

// Create the context
const ReportDataContext = React.createContext({
  daysToShowFilter: 0,
  setDaysToShowFilter: (days: any) => {
    return days;
  },
  cleaningPlans: [],
  robots: [],
  reportStatus: [],
  setReportStatus: (statusList: any) => {
    return statusList;
  },
  loading: true,
  selectedCleaningPlans: [],
  setSelectedCleaningPlans: (data: any) => {
    return data;
  },
  selectedRobots: [],
  setSelectedRobots: (data: any) => {
    return data;
  },
  selectedReportStatus: [],
  setSelectedReportStatus: (data: any) => {
    return data;
  },
  getFilters: (data: string | number | any) => {
    return data;
  },
});
interface ReportContextProviderProps {
  children: ReactNode;
}
// Create a provider component
export function ReportDataProvider({ children }: ReportContextProviderProps) {
  const reportsServices = ReportServices();
  const [daysToShowFilter, setDaysToShowFilter] = useState<number>(30);
  const [cleaningPlans, setCleaningPlans] = useState<any>();
  const [selectedCleaningPlans, setSelectedCleaningPlans] = useState<any>([]);
  const [selectedRobots, setSelectedRobots] = useState<any>([]);
  const [selectedReportStatus, setSelectedReportStatus] = useState<any>([]);
  const [robots, setRobots] = useState<any>();
  const [reportStatus, setReportStatus] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const { authData } = useAuth();

  const getFilters = async (daysToShowFilter: string | number | any) => {
    setLoading(true);
    try {
      const _reportsFilterResponse: any = await reportsServices.loadFilters(daysToShowFilter);
      const filterResponse = _reportsFilterResponse.data;
      if (filterResponse) {
        const _reportsfilterSorting = await reportsServices.sortFilters(
          filterResponse.locations.join(),
          filterResponse.cleaning_plans.join(),
          filterResponse.robots.join()
        );
        setCleaningPlans(_reportsfilterSorting.cleaningPlans);
        setRobots(_reportsfilterSorting.robots);
        setReportStatus(filterResponse.results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDefaultDateRangeForFilter = async () => {
    const dateRangeKey: string = (await AsyncStorage.getItem(`${authData?.login}Range`)) || '';
    if (!dateRangeKey) {
      setDaysToShowFilter(30);
    } else {
      setDaysToShowFilter(dateRangeKey);
    }
  };

  useEffect(() => {
    handleDefaultDateRangeForFilter();
  }, []);

  return (
    <ReportDataContext.Provider
      value={{
        daysToShowFilter,
        setDaysToShowFilter,
        cleaningPlans,
        robots,
        reportStatus,
        setReportStatus,
        loading,
        selectedCleaningPlans,
        setSelectedCleaningPlans,
        selectedReportStatus,
        setSelectedReportStatus,
        setSelectedRobots,
        selectedRobots,
        getFilters,
      }}
    >
      {children}
    </ReportDataContext.Provider>
  );
}

// Custom hook to consume the context
export function useReportData() {
  const context = useContext(ReportDataContext);
  if (!context) {
    throw new Error('useReportData must be used within a ReportDataProvider');
  }
  return context;
}
