import ReportDetailsMetaData from './ReportModels';

const emptyReportDetails: ReportDetailsMetaData = {
	location_name: {
		title: 'Details',
		icon: '',
		label: 'Location',
		value: '',
		info: '',
	},
	plan_type: {
		title: 'Details',
		icon: '',
		label: 'Plan Type',
		value: '',
		info: '',
	},
	cleaning_plan_name: {
		title: 'Details',
		icon: '',
		label: 'Plan',
		value: '',
		info: '',
	},
	username: {
		title: 'Details',
		icon: '',
		label: 'User',
		value: '',
		info: '',
	},
	robot_name: {
		title: 'Details',
		icon: '',
		label: 'Robot',
		value: '',
		info: '',
	},
	featuresAndAddOns: {
		title: 'Details',
		icon: '',
		label: 'Features and Add-Ons',
		value: '',
		info: '',
	},
	start_time: {
		title: 'Details',
		icon: '',
		label: 'Start Time',
		value: '',
		info: '',
	},
	end_time: {
		title: 'Details',
		icon: '',
		label: 'End Time',
		value: '',
		info: '',
	},
	area: {
		title: 'Additional Details',
		icon: '',
		label: 'Plan Area',
		value: '',
		info: '',
	},
	cleanable_area: {
		title: 'Additional Details',
		icon: '',
		label: 'Total Cleanable Area',
		value: '',
		info: ''
	},
	true_covered_area: {
		title: 'Additional Details',
		icon: '',
		label: 'True Covered Area',
		value: '',
		info: ''
	},
	coverage_percentage: {
		title: 'Additional Details',
		icon: '',
		label: 'Coverage Percentage',
		value: '',
		info: ''
	},
	performance: {
		title: 'Additional Details',
		icon: '',
		label: 'True Performance ',
		value: '',
		info: ''
	},
	result: {
		title: 'Additional Details',
		icon: '',
		label: 'Final Result',
		value: '',
		info: ''
	},
	water_usage: {
		title: 'Additional Details',
		icon: '',
		label: 'Water Usage',
		value: '',
		info: ''
	},
	water_flow_mode: {
		title: 'Additional Details',
		icon: '',
		label: 'Water Flow Mode',
		value: '',
		info: ''
	},
	brush_pressure: {
		title: 'Additional Details',
		icon: '',
		label: 'Brush Pressure',
		value: '',
		info: ''
	},
	vacuum_setting: {
		title: 'Additional Details',
		icon: '',
		label: 'Vacuum Setting',
		value: '',
		info: ''
	},
	cleaning_plan_area: {
		title: 'Metrics',
		icon: '',
		label: 'Total Area',
		value: '',
		info: ''
	},
	totalTime: {
		title: 'Metrics',
		icon: '',
		label: 'Total Time',
		value: '',
		info: ''
	},
	totalCleaningTime: {
		title: 'Metrics',
		icon: '',
		label: 'Total Cleaning Time',
		value: '',
		info: ''
	},
	totalOtherTime: {
		title: 'Metrics',
		icon: '',
		label: 'Total Other Time',
		value: '',
		info: ''
	},
	productivity: {
		title: 'Metrics',
		icon: '',
		label: 'Productivity',
		value: '',
		info: ''
	},
};

export default emptyReportDetails;


//do not remove
/*
export const emptyReportDetails: ReportDetailsMetaData = {
  location: {
    title: 'Details',
    icon: '',
    label: 'Location',
    value: '',
    info: '',
  },
  planType: {
    title: 'Details',
    icon: '',
    label: 'Plan Type',
    value: '',
    info: '',
  },
  plan: {
    title: 'Details',
    icon: '',
    label: 'Plan',
    value: '',
    info: '',
  },
  user: {
    title: 'Details',
    icon: '',
    label: 'User',
    value: '',
    info: '',
  },
  robot: {
    title: 'Details',
    icon: '',
    label: 'Robot',
    value: '',
    info: '',
  },
  featuresAndAddOns: {
    title: 'Details',
    icon: '',
    label: ' Features and Add-Ons',
    value: '',
    info: '',
  },
  startTime: {
    title: 'Details',
    icon: '',
    label: '',
    value: 'Start Time',
    info: '',
  },
  endTime: {
    title: 'Details',
    icon: '',
    label: 'End Time',
    value: '',
    info: '',
  },
  planArea: {
    title: 'Additional Details',
    icon: '',
    label: 'Plan Area',
    value: '',
    info: '',
  },
  totalCleanableArea: {
    title: 'Additional Details',
    icon: '',
    label: 'Total Cleanable Area',
    value: '',
    info: ''
  },
  trueCoveredArea: {
    title: 'Additional Details',
    icon: '',
    label: 'True Covered Area',
    value: '',
    info: ''
  },
  coveragePercentage: {
    title: 'Additional Details',
    icon: '',
    label: '',
    value: '',
    info: ''
  },
  truePerformance: {
    title: 'Additional Details',
    icon: '',
    label: 'Coverage Percentage',
    value: '',
    info: ''
  },
  finalResult: {
    title: 'Additional Details',
    icon: '',
    label: 'Final Result',
    value: '',
    info: ''
  },
  waterUsage: {
    title: 'Additional Details',
    icon: '',
    label: 'Water Usage',
    value: '',
    info: ''
  },
  waterFlowMode: {
    title: 'Additional Details',
    icon: '',
    label: 'Water Flow Mode',
    value: '',
    info: ''
  },
  brushPressure: {
    title: 'Additional Details',
    icon: '',
    label: 'Brush Pressure',
    value: '',
    info: ''
  },
  vacuumSetting: {
    title: 'Additional Details',
    icon: '',
    label: 'Vacuum Setting',
    value: '',
    info: ''
  },
  totalArea: {
    title: 'Metrics',
    icon: '',
    label: 'Total Area',
    value: '',
    info: ''
  },
  totalTime: {
    title: 'Metrics',
    icon: '',
    label: 'Total Time',
    value: '',
    info: ''
  },
  totalCleaningTime: {
    title: 'Metrics',
    icon: '',
    label: 'Total Cleaning Time',
    value: '',
    info: ''
  },
  totalOtherTime: {
    title: 'Metrics',
    icon: '',
    label: 'Total Other Time',
    value: '',
    info: ''
  },
  productivity: {
    title: 'Metrics',
    icon: '',
    label: 'Productivity',
    value: '',
    info: ''
  },
};
*/
