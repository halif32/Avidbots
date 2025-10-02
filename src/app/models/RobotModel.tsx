/**
 * Class that represents a Login object
 */
export class Robot {
	/** The id of the robot */
	id!: string;
  
	/** The login id */
	login!: string;
  
	/** The name */
	name!: string;
  
	/** The display name */
	display_name!: string;
  
	/** The ip */
	ip!: string;
  
	/** The model */
	model!: string;
  
	/** The hardware version */
	hardware_version!: string;
  
	/** The radio type */
	radio_type!: string;
  
	/** The cleaning width */
	cleaning_width!: string;
  
	/** The cleaning head type */
	cleaning_head_type!: string;
  
	/** The cleaning head type */
	cleaning_time_since_service?: number;
  
	/** The squeegee size */
	squeegee_size!: string;
  
	/** The squeegee type */
	squeegee_type!: string;
  
	/** The brush type */
	brush_type!: string;
  
	/** Is a test robot */
	test!: string;
  
	/** The tank capacity */
	tank_capacity!: string;
  
	/** The maintenance package */
	maintenance_package!: string;
  
	/** The time zone */
	time_zone!: string;
  
	/** The in service date */
	in_service_date!: string;
  
	/** The service expiry date */
	service_expiry_date!: string;
  
	/** The require checklist */
	require_checklist!: string;
  
	/** The current state */
	state: any;
  
	/** The current plan */
	plan!: string;
  
	/** The state changed timestamp */
	state_changed!: string;
  
	/** Is robot online */
	online!: string;
  
	/** The online changed timestamp */
	online_changed!: string;
  
	/** The eta */
	eta!: string;
  
	/** The autoupdate repo */
	autoupdate_repo!: string;
  
	/** The autoupdate version */
	autoupdate_version!: string;
  
	/** The hourmeter master */
	hourmeter_master!: string;
  
	/** The hourmeter sensor */
	hourmeter_sensor!: string;
  
	/** The main commit */
	main_commit!: string;
  
	/** The main deb */
	main_deb!: string;
  
	/** The main branch */
	main_branch!: string;
  
	/** The main package */
	main_package!: string;
  
	/** The camera commit */
	camera_commit!: string;
  
	/** The camera deb */
	camera_deb!: string;
  
	/** The camera branch */
	camera_branch!: string;
  
	/** The camera package */
	camera_package!: string;
  
	/** The preventative maintenance target */
	preventative_maintenance_target!: string;
  
	/** The preventative maintenance timer */
	preventative_maintenance_timer?: number;
  
	/** The min weekly goal */
	min_weekly_goal!: string;
  
	/** The ideal weekly goal */
	ideal_weekly_goal!: string;
  
	/** The side sweeper */
	side_sweeper!: string;
  
	/** The deleted flag */
	deleted!: string;
  
	/** The account */
	account!: string;
  
	/** The account name */
	account_name!: string;
  
	/** The username */
	username!: string;
  
	/** The icon */
	icon?: string;
  
	/** The font type */
	typeName?: string;
  
	/** Location */
	location!: number;
  
	/** Location Name */
	location_name!: string;
  
	/** Robot type */
	type!: string;
  
	/** Robot Access Requires UserID */
	robot_access_requires_userid: any;
  
	/** Features and Addons installed */
	featuresAndAddons!: string[];
}
