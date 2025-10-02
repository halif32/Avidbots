/**
 * to prepare data for the notification card
 * @param notificationData The notification data from the api
 * @returns details required for card preparation
 */
export const buildNotificationCardDetails = (notificationData: any,userPreference:any) => {
	const robotName = userPreference == 0 ? 'robot_serial_number':'robot_display_name';
	let cardName = `Robot ID ${notificationData.data?.robot_id}`;
	let cardHeader = notificationData.data[robotName] || notificationData.data?.robot_display_name;
	let cardSubject = '';
	let navigatorTab: string =  'RobotsTab';
	let navigatePath: string = 'Live View';
	const cardLocationName: string = notificationData.data.location_name;

	switch (notificationData.data.notification_type) {
	case 'new-reports':
		cardName = `#${notificationData.data.report_id}`;
		cardSubject = `New report #${notificationData.data.report_id} generated for  #${cardHeader}`;
		navigatorTab = 'ReportsTab';
		navigatePath = 'Reports Detail';
		break;
	case 'robot-online':
		cardSubject =  `${cardHeader} is online`;
		break;
	case 'water-change':
		cardSubject = `Water Change Required for ${cardHeader}`;
		break;
	case 'robot-not-run-autonomously':
		cardSubject =  ` ${cardHeader}} Under-Utilized`;
		navigatorTab = 'HomeTab';
		navigatePath = 'Notifications';
		break;
	case 'skipped-sector':
		cardSubject =
				notificationData.subject + `in ${notificationData.data.plan_name}`;
		break;
	case 'robot-stuck':
		cardSubject =  `${cardHeader} has been stuck for 5+ minutes`;
		break;
	case 'preventative-maintenance':
		cardSubject =  `Preventive Maintenance Required for ${cardHeader}.`;
		break;
	case 'robot-repeat-passcode-failure':
		cardSubject = `Multiple login attempts exceeded for ${cardHeader}`;
		break;
	case 'robot-low-battery':
		cardSubject = `Low Battery Warning for ${cardHeader}.`;
		break;
	case 'emergency-stop':
		cardSubject = `${cardHeader} has experienced an emergency stop`;
		break;
	case 'cleaning-plan-started':
		cardSubject = `${cardHeader} has started cleaning plan,${notificationData.data.plan_name}`;
		break;
	case 'cleaning-plan-changed':
		cardName = `#${notificationData.data.plan_id}`;
		cardHeader = notificationData.data.plan_name;
		navigatePath = 'Robot Details';
		if (notificationData.data.change_type === 'published') {
			cardSubject = `New cleaning plan, #${notificationData.data.plan_name} published`;
		} else {
			cardSubject = `Cleaning plan, #${notificationData.data.plan_name} updated`;
		}
		break;

	case 'created-cleaning-plan':
		cardName = `#${notificationData.data.plan_id}`;
		cardHeader = notificationData.data.plan_name;
		cardSubject = `New cleaning plan, #${notificationData.data.plan_name} created`;
		navigatePath = 'Robot Details';
		break;
	default:
		break;
	}

	return {
		cardName,
		cardHeader,
		cardSubject,
		cardLocationName,
		navigatorTab,
		navigatePath,
	};
};

/**
 * to get time in (jan 12, 2023 3:14 PM) format
 * @param time The timestamp
 * @returns time format required for card
 */
export const prepareTime = (time) => {
	const gmtDate = new Date(time);
	const formattedDate = `${gmtDate.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})} ${gmtDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	})}`;
	return formattedDate;
};

/**
 * get time diff in hr, min,sec format
 * @param time the time stamp
 * @returns the time in sec, min, hr
 */
export const getTimeDifference = (time) => {
	const currentTime = new Date();
	// Below date logic is to support ios date format
	//const arr = time.split(/[- :]/);
	//const notificationTime = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
	const notificationTime = new Date(Date.parse(time));
	const timeDiffInMilliseconds = currentTime - notificationTime;
	const seconds = Math.floor(timeDiffInMilliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) {
		return `${days}d ago`;
	} else if (hours > 0) {
		return `${hours}h ago`;
	} else if (minutes > 0) {
		return `${minutes}m ago`;
	} else {
		return `${seconds}s ago`;
	}
};
