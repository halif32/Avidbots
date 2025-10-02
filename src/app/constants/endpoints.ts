const Endpoints = (domain: string) => {
	const _domain: string = domain;

	const auth = {
		accept_eula: `${_domain}/authentication/v0/Logins/self/accept_eula`,
		contactMethods_send: (url: string) => `${url}/api/v0/ContactMethods/send`,
		feedback: `${_domain}/api/v0/System/deprecation_feedbacks`,
		login: `${_domain}/authentication/v0/Logins/login`,
		logout: `${_domain}/authentication/v0/Logins/logout`,
		permissions: (role: string) => `${_domain}/authentication/v0/allowed/${role}/resources`,
		self_login: (url: string) => `${url}/authentication/v0/Logins/self`,
		trusted_device: (loginId: number) => `${_domain}/authentication/v0/Logins/${loginId}/trusted_device`,
	};

	const amazonUrls={
		avidBots_mobile_setting_url:'https://avidbots-mobile.s3.amazonaws.com/avidbots-mobile-settings-latest.json',
		mobile_features_url:'https://avidbots-mobile.s3.amazonaws.com/Mobile_features.json'
	};

	const cleaning_plans = {
		get_plans: (id:string) => `${_domain}/api/v0/CleaningPlans/${id}`,
		get_all_cleaning_plans:()=>`${domain}/api/v0/CleaningPlans/?latest=1&limit=100000&order_by=name`
	};

	const location = {
		all_locations: `${_domain}/api/v1/Locations?limit=10000`,
		last_known_location: `${domain}/authentication/v1/Locations/LastKnownLocation`
	};

	const notifications = {
		create_fcm_token: `${_domain}/notification/v0/Notifications/createFcmToken`,
		update_fcm_token_status: `${_domain}/notification/v0/Notifications/updateFcmTokenStatus`,
		fcm_token: (params: string) => `${_domain}/notification/v0/Notifications/getFcmToken?device_token=${params}`,
		logs: (queryString:string) => `${_domain}/notification/v0/Notifications/getPushNotificationLog?${queryString}`,
		markNotificationAsRead: (url:string,id:string) => `${url}/notification/v0/Notifications/readPushNotificationLog/${id}`
	};

	const preferences = {
		create_contact: `${_domain}/api/v0/ContactMethods`,
		contact_methods: (login:string) => `${_domain}/api/v0/ContactMethods?login=${login}&limit=1000`,
		contact_information: (name:string) => `${_domain}/api/v0/Settings/${name}`,
		display_name: `${_domain}/api/v0/Preferences/use-robot-display-name`,
		delete_contact: (id:number) => `${_domain}/api/v0/ContactMethods/${id}`,
		profile_display_name: (login:string) => `${_domain}/api/v0/Preferences/use-robot-display-name/login/${login}`,
		resend_verification: `${_domain}/api/v0/ContactMethods/send`,
		settings: (login:string)=> `${_domain}/api/v0/Logins/${login}`,
		time_zone: `${_domain}/api/v0/TimeZones/regions`,
	};

	const reports = {
		cleaning_reports:(queryString:string)=> `${_domain}/reports/v2/Reports/?${queryString}`,
		cleaning_report: (id:number) => `${_domain}/api/v0/CleaningReports/${id}`,
		coverage_image: (id:number) => `${_domain}/api/v0/CleaningReports/${id}/coverage_image`,
		report_filters:(start_time:string,end_time:string)=>`${domain}/api/v0/CleaningReports/filters?end_time_lt=${end_time}&reality_type=physical&show_deleted=false&start_time_gt=${start_time}`,
		sort_filters_data:(queryString:string)=>`${domain}/reports/v2/Reports/filterData?${queryString}`,
		report_notes: (id:number) => `${_domain}/reports/v2/Reports/${id}/notes`

	};

	const robots = {
		all_robots: (limit:number) => `${_domain}/api/v0/Robots?limit=${limit}`,
		robot: (id:string) =>  `${domain}/api/v0/Robots/${id}`,
		robot_streamer: (robotId:number) => `${domain}/api/v0/Robots/${robotId}/streamer`
	};


	return { 
		auth,
		amazonUrls,
		cleaning_plans,
		location,
		notifications,
		preferences,
		reports,
		robots
	};

};

export default Endpoints;