import yaml from 'js-yaml';
import CleaningPlansService from './CleaningPlanService';
import AxiosService from 'contexts/Interceptors';
import { useDomainContext } from 'contexts/DomainContext';
import Endpoints from 'constants/endpoints';
import getStartAndEndTime from 'utils/getStartAndEndTime';

function ReportServices() {
  const axiosInstance = AxiosService();
  const { domain } = useDomainContext();
  const cleaningPlanService = CleaningPlansService();
  const { reports } = Endpoints(domain);
  const time = getStartAndEndTime();

  /**
   * fetch the aggregate Reports limited to 10 from last 5 days
   * @returns the reports data
   */
  const fetchReports = async (
    id: any,
    limit: number,
    status: any,
    cleaningPlans: any,
    robots: any,
    direction: string,
    days: number
  ) => {
    const endTime = time.getEndTime();
    const startTime = time.getStartTime(days);
    const params: any = {
      direction: direction,
      end_time_lt: endTime,
      limit: limit,
      offset: 0,
      order_by: ['id'],
      plan_type: 'cleaning',
      reality_type: 'physical',
      start_time_gt: startTime,
      status: status,
      cleaning_plans: cleaningPlans,
      robots: robots,
    };

    const queryString = new URLSearchParams(params).toString();
    let apiUrl = reports.cleaning_reports(queryString);

    if (id) {
      apiUrl = apiUrl + `&robots[]=${id}`;
    }
    return axiosInstance.get(apiUrl).then(
      (response) => {
        return response.data;
      },
      (err) => {
        return { err: err };
      }
    );
  };

  /**
   * fetch the individual Report data
   * @param id The report Id
   * @returns  the reports Details data
   */
  // fetch the individual Report data
  const fetchIndividualReportData = async (id: number) => {
    return axiosInstance.get(reports.cleaning_report(id)).then(
      async (response) => {
        // console.log("responseFetchIndividualReportData",response);
        const report = response.data;
        const rawReport: any = JSON.parse(JSON.stringify(report));
        // Parse the report data from yaml to json
        const reportData: any = yaml.load(rawReport.report);
        // we do not need the raw yaml report data anymore.
        rawReport.report = {};
        // get cleaning Plan associated with the report
        const cleaningPlanData = await cleaningPlanService.getCleaningPlan(
          rawReport['cleaning_plan']
        );
        const { totalTime, totalCleaningTime, totalOtherTime } = getReportTimes(
          reportData,
          rawReport
        );
        const base64Data = await loadCoverageImage(id);
        // Setting the missing properties in Individual report that we use in report details component
        rawReport.time_stamp_start = rawReport.start_timestamp;
        rawReport.time_stamp_end = rawReport.end_timestamp;
        rawReport.totalTime = String(totalTime);
        rawReport.totalCleaningTime = String(totalCleaningTime);
        rawReport.totalOtherTime = totalOtherTime;
        rawReport.location_name = cleaningPlanData.locations_name;
        rawReport.plan_type = cleaningPlanData.plan_type;
        rawReport.water_flow_mode = reportWaterFlowMode(reportData);
        rawReport.brush_pressure = reportBrushPressureMode(reportData);
        rawReport.vacuum_setting = reportData['vaccume'] ? 'On' : 'Off';
        rawReport.plan_area = parseFloat(cleaningPlanData.area).toFixed(2);
        rawReport.isSingleReport = true;
        rawReport.report._image = base64Data;
        return rawReport;
      },
      (err) => {
        return { err: err };
      }
    );
  };

  const loadCoverageImage = async (id: any) => {
    let result = '';
    await fetchCoverageImage(id).then((res: any) => {
      const base64Data = res.substring(res.indexOf(',') + 1);
      result = base64Data;
    });
    return result;
  };

  /**
   * to fetch the coverage_image
   * @param id the report Id
   * @returns image data
   */

  const fetchCoverageImage = async (id: any) => {
    try {
      const response = await axiosInstance.get(reports.coverage_image(id), {
        responseType: 'blob',
        headers: {
          'Content-Type': 'image/png',
        },
      });
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64Representation = reader.result?.toString() || '';
          resolve(base64Representation);
        };
        reader.onerror = reject;
        reader.readAsDataURL(response.data);
      });
    } catch (error) {
      return { err: error };
    }
  };

  /**
   * to fetch the report Notes
   * @param id the report Id
   * @returns report notes, sector data and sector Coordinates
   */
  const fetchReportNotes = async (id: any) => {
    try {
      const response = await axiosInstance.get(reports.report_notes(id), {});

      return response.data;
    } catch (error) {
      return { err: error };
    }
  };

  const getReportTimes = (reportData: any, rawReport: any) => {
    const totalCleaningTime = reportData.total.unskipped_cleaning_time
      ? reportData.total.unskipped_cleaning_time
      : reportData.total.cleaning_time;
    const totalTime = (rawReport['end_timestamp'] - rawReport['start_timestamp']) / 60; // In minute
    // const totalTimeString = String(totalTime);
    const totalOtherTime = Math.max(totalTime - totalCleaningTime, 0);
    return { totalTime, totalCleaningTime, totalOtherTime };
  };

  const reportWaterFlowMode = (reportData: any) => {
    const waterFlowModes = ['Off', 'Low', 'Medium', 'High'];
    return waterFlowModes[reportData['flow_mode']];
  };

  const reportBrushPressureMode = (reportData: any) => {
    const brushPressureModes = ['Off', 'Low', 'Medium', 'High'];
    return brushPressureModes[reportData['pressure']];
  };

  const loadFilters = async (days: number) => {
    const endTime = time.getEndTime();
    const startTime = time.getStartTime(days);
    try {
      const response = await axiosInstance.get(reports.report_filters(startTime, endTime));
      return response;
    } catch (error) {
      return { err: error };
    }
  };
  const sortFilters = async (locations: string, cleaning_plans: string, robots: string) => {
    const params: any = {
      locations: locations,
      cleaningPlans: cleaning_plans,
      robots: robots,
    };

    const queryString = new URLSearchParams(params).toString();
    const apiUrl = reports.sort_filters_data(queryString);
    return axiosInstance.get(apiUrl).then(
      (response) => {
        return response.data;
      },
      (err) => {
        return { err: err };
      }
    );
  };
  return {
    fetchReports,
    fetchCoverageImage,
    fetchIndividualReportData,
    loadFilters,
    sortFilters,
    fetchReportNotes,
  };
}

export default ReportServices;
