interface ReportDetailsMetaData {
  location_name: string; // to make changes to the api
  plan_type: string; // to make changes to the api
  cleaning_plan_name: string;
  username: string;
  robot_name: string;
  featuresAndAddOns: string;
  start_time: string;
  end_time: string;
  area: string; // should come from cleaning plan table
  cleanable_area: string; // should make changes to api
  true_covered_area: string;
  coverage_percentage: string;
  performance: string;
  result: string;
  water_usage: string;
  water_flow_mode: string; // to make changes to the api
  brush_pressure: string; // to make changes to the api
  vacuum_setting: string; // to make changes to the api
  cleaning_plan_area: string; // to make changes to the api (cleaning_plan_area)
  totalTime: string; // diff between startTime and endTime
  totalCleaningTime: string; // to calculate the non zero cleantime
  totalOtherTime: string; // to totaltime - cleaning time
  productivity: string;
  cleaning_report_id: string;
  covered_area: string;
  local_start_time: string;
}

const ReportDetailsList = [
  {
    title: 'Details',
    id: 1,
    list: [
      {
        name: 'Location',
        icon: 'map-pin',
        value: '',
        apiKey: 'location_name',
        unit: '',
      },
      {
        name: 'Plan Type',
        icon: 'cleaning-plan',
        value: '',
        apiKey: 'plan_type',
        unit: '',
      },
      {
        name: 'Plan',
        icon: 'cleaning-plan',
        value: '',
        apiKey: 'cleaning_plan_name',
        unit: '',
      },
      {
        name: 'User',
        icon: 'user',
        value: '',
        apiKey: 'username',
        unit: '',
      },
      {
        name: 'Robot',
        icon: 'robot',
        value: '',
        apiKey: 'robot_name',
        unit: '',
      },
      {
        name: 'Features and Add-Ons',
        icon: 'robot',
        value: '',
        apiKey: 'featuresAndAddOns',
        unit: '',
      },
      {
        name: 'Start Time',
        icon: 'start-time',
        value: '',
        apiKey: 'start_time',
        unit: '',
      },
      {
        name: 'End Time',
        icon: 'end-time',
        value: '',
        apiKey: 'end_time',
        unit: '',
      },
    ],
  },
  {
    id: 2,
    title: 'Metrics',
    list: [
      {
        name: 'Total Area',
        icon: 'plan-area',
        value: '',
        apiKey: 'cleaning_plan_area',
        unit: 'm²',
      },
      {
        name: 'Total Time',
        icon: 'time',
        value: '',
        apiKey: 'totalTime',
        unit: '',
      },
      {
        name: 'Total Cleaning Time',
        icon: 'time',
        value: '',
        apiKey: 'totalCleaningTime',
        unit: '',
      },
      {
        name: 'Total Other Time',
        icon: 'time',
        value: '',
        apiKey: 'totalOtherTime',
        unit: '',
      },
      {
        name: 'Productivity',
        icon: 'plan-area-productivity',
        value: '',
        apiKey: 'productivity',
        unit: 'm²/hr',
      },
      {
        name: 'Plan Area',
        icon: 'cleaning-plan',
        value: '',
        apiKey: 'area',
        unit: 'm²',
      },
      {
        name: 'Total Cleanable Area',
        icon: 'cleanable-area',
        value: '',
        apiKey: 'cleanable_area',
        unit: 'm²',
      },
      {
        name: 'True Covered Area',
        icon: 'covered-area',
        value: '',
        apiKey: 'true_covered_area',
        unit: 'm²',
      },
      {
        name: 'Coverage Percentage',
        icon: 'covered-area-ratio',
        value: '',
        apiKey: 'coverage_percentage',
        unit: '%',
      },
      {
        name: 'True Performance',
        icon: 'covered-area-performance',
        value: '',
        apiKey: 'performance',
        unit: 'm²/hr',
      },
      {
        name: 'Final Result',
        icon: 'covered-area-performance',
        value: '',
        apiKey: 'result',
        unit: '',
      },
      {
        name: 'Water Usage',
        icon: 'water',
        value: '',
        apiKey: 'water_usage',
        unit: '',
      },
      {
        name: 'Water Flow Mode',
        icon: 'water-flow',
        value: '',
        apiKey: 'water_flow_mode',
        unit: '',
      },
      {
        name: 'Brush Pressure',
        icon: 'brush-pressure',
        value: '',
        apiKey: 'brush_pressure',
        unit: '',
      },
      {
        name: 'Vacuum Setting',
        icon: 'vacuum',
        value: '',
        apiKey: 'vacuum_setting',
        unit: '',
      },
    ],
  },
  {
    id: 3,
    title: 'Sectors',
  },
  {
    id: 4,
    title: 'Notes',
  },
];

export { ReportDetailsList };
export type { ReportDetailsMetaData };
