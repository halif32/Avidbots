
import Endpoints from 'constants/endpoints';
import { useDomainContext } from 'contexts/DomainContext';
import AxiosService from 'contexts/Interceptors';
import { Robot } from 'models/RobotModel';

function RobotsService () {

	const {domain} = useDomainContext();
	const axiosInstance = AxiosService();
	const { robots } =  Endpoints(domain);

	/**
 * 
 * @param limit pass limit of the robots required
 * @returns array of robots
 */
	const fetchAllRobots = async (limit: number) : Promise<Robot> => {
		return axiosInstance.get(robots.all_robots(limit)).then(response => {
			return response.data;
			
		}, (err) => {
			return {err:err};
		});
	};


	/**
 * 
 * @param id robot id
 * @returns robot data
 */
	const fetchRobot = async (id: string) => {
		return axiosInstance.get(robots.robot(id)).then(response => {
			return response.data;
		}, (err) => {
			return {err:err};
		});
	};

	/**
 * Retrieves the streamer URL for a specific robot.
 * @param {any} robotId - The ID of the robot.
 * @returns {Promise<string | false>} - A promise that resolves to the streamer URL if successful, or false if an error occurs.
 * 
 * @example A streamer URL example: "https://alpha.avidbots.com/telemetry-socket"
 */
	const getStreamerUrl = async (robotId?: any) => {
		try{
			const result = await axiosInstance.get(robots.robot_streamer(robotId));
			return (result.data.url);
		}catch(response: any) {
			return false;
		}
	};




	// TODO: move to global component
	const states = [
		{id: 0, general: 1, group: 6, slug: 'loading', name: 'robots.state.name.loading', description: 'robots.state.description.loading'},
		{id: 1, general: 1, group: 5, slug: 'login', name: 'robots.state.name.login', description: 'robots.state.description.login'},
		{id: 2, general: 1, group: 6, slug: 'main', name: 'robots.state.name.main', description: 'robots.state.description.main'},
		{id: 3, general: 1, group: 5, slug: 'manual', name: 'robots.state.name.manual', description: 'robots.state.description.manual'},
		{id: 4, general: 1, group: 6, slug: 'plan', name: 'robots.state.name.plan', description: 'robots.state.description.plan'},
		{id: 5, general: 1, group: 6, slug: 'move', name: 'robots.state.name.move', description: 'robots.state.description.move'},
		{id: 6, general: 3, group: 1, slug: 'load_clean', name: 'robots.state.name.loadClean', description: 'robots.state.description.loadClean'},
		{id: 7, general: 2, group: 0, slug: 'clean', name: 'robots.state.name.clean', description: 'robots.state.description.clean'},
		{id: 8, general: 3, group: 4, slug: 'pause', name: 'robots.state.name.pause', description: 'robots.state.description.pause'},
		{id: 9, general: 4, group: 2, slug: 'obstacle', name: 'robots.state.name.obstacle', description: 'robots.state.description.obstacle'},
		{id: 10, general: 2, group: 1, slug: 'processing', name: 'robots.state.name.processing', description: 'robots.state.description.processing'},
		{id: 11, general: 2, group: 0, slug: 'going_home', name: 'robots.state.name.goingHome', description: 'robots.state.description.goingHome'},
		{id: 12, general: 4, group: 2, slug: 'estop', name: 'robots.state.name.estop', description: 'robots.state.description.estop'},
		{id: 13, general: 0, group: null, slug: 'off', name: 'robots.state.name.off', description: 'robots.state.description.off'},
		{id: 14, general: 1, group: 6, slug: 'disconnection', name: 'robots.state.name.disconnection', description: 'robots.state.description.disconnection'},
		{id: 15, general: 4, group: 2, slug: 'danger_obstacle', name: 'robots.state.name.dangerObstacle', description: 'robots.state.description.dangerObstacle'},
		{id: 16, general: 1, group: 5, slug: 'move_learn', name: 'robots.state.name.moveLearn', description: 'robots.state.description.moveLearn'},
		{id: 17, general: 1, group: 5, slug: 'learn', name: 'robots.state.name.learn', description: 'robots.state.description.learn'},
		{id: 18, general: 4, group: 2, slug: 'sm_failure', name: 'robots.state.name.smFailure', description: 'robots.state.description.smFailure'},
		{id: 19, general: 1, group: 5, slug: 'login_checklist', name: 'robots.state.name.loginChecklist', description: 'robots.state.description.loginChecklist'},
		{id: 20, general: 1, group: 5, slug: 'logout_checklist', name: 'robots.state.name.logoutChecklist', description: 'robots.state.description.logoutChecklist'},
		{id: 21, general: 2, group: 0, slug: 'mapping', name: 'robots.state.name.mapping', description: 'robots.state.description.mapping'},
		{id: 22, general: 1, group: 5, slug: 'sync', name: 'robots.state.name.sync', description: 'robots.state.description.sync'},
		{id: 23, general: 1, group: 5, slug: 'logout', name: 'robots.state.name.logout', description: 'robots.state.description.logout'},
		{id: 24, general: 3, group: 4, slug: 'water_failure', name: 'robots.state.name.waterFailure', description: 'robots.state.description.waterFailure'},
		{id: 25, general: 3, group: 3, slug: 'remote_pause', name: 'robots.state.name.remotePause', description: 'robots.state.description.remotePause'},
		{id: 26, general: 3, group: 3, slug: 'remote_detour', name: 'robots.state.name.remoteDetour', description: 'robots.state.description.remoteDetour'},
		{id: 27, general: 4, group: 1, slug: 'estop_delay', name: 'robots.state.name.estopDelay', description: 'robots.state.description.estopDelay'},
		{id: 28, general: 1, group: 6, slug: 'auto_sync', name: 'robots.state.name.autoSync', description: 'robots.state.description.autoSync'},
		{id: 29, general: 1, group: 6, slug: 'diagnostics', name: 'robots.state.name.diagnostics', description: 'robots.state.description.diagnostics'},
		{id: 30, general: 3, group: 1, slug: 'pose_correction', name: 'robots.state.name.poseCorrection', description: 'robots.state.description.poseCorrection'},
		{id: 31, general: 4, group: 2, slug: 'remote_pose_correction', name: 'robots.state.name.remotePoseCorrection', description: 'robots.state.description.remotePoseCorrection'},
		{id: 32, general: 3, group: 2, slug: 'remote_planning_feedback', name: 'robots.state.name.remotePlanningFeedback', description: 'robots.state.description.remotePlanningFeedback'},
		{id: 33, general: 1, group: 6, slug: 'finished_report_generated', name: 'robots.state.name.finishedReportGenerated', description: 'robots.state.description.finishedReportGenerated'},
		{id: 34, general: 1, group: 6, slug: 'waiting_for_schedule', name: 'robots.state.name.waitingForSchedule', description: 'robots.state.description.waitingForSchedule'},
		{id: 35, general: 1, group: 6, slug: 'system_loading', name: 'robots.state.name.systemLoading', description: 'robots.state.description.systemLoading'},
		{id: 36, general: 3, group: 6, slug: 'incident_transition', name: 'robots.state.name.incidentTransition', description: 'robots.state.description.incidentTransition'},
		{id: 37, general: 3, group: 6, slug: 'incident', name: 'robots.state.name.incident.NoActiveFaults', description: 'robots.state.description.incident'},
		{id: 38, general: 5, group: 0, slug: 'disinfect', name: 'robots.state.name.disinfect', description: 'robots.state.description.disinfect'},
		{id: 39, general: 6, group: 5, slug: 'resource_center', name: 'robots.state.name.resourceCenter', description: 'robots.state.description.resourceCenter'},
		{id: 40, general: 4, group: 2, slug: 'overlay', name: 'robots.state.name.overlay', description: 'robots.state.description.overlay'}
	];

	// TODO : move to global component
	const generalStates = [
		{slug: 'offline', icon: 'power', color: 'grey', name: 'robots.stateGeneral.offline'},
		{slug: 'home-screen', icon: 'home', color: 'blue', name: 'robots.stateGeneral.homeScreen'},
		{slug: 'cleaning', icon: 'play', color: 'green', name: 'robots.stateGeneral.cleaning'},
		{slug: 'warning', icon: 'alert-circle', color: 'amber', name: 'robots.stateGeneral.warning'},
		{slug: 'stuck', icon: 'alert-circle', color: 'red', name: 'robots.stateGeneral.stuck'},
		{slug: 'disinfecting', icon: 'play', color: 'green', name: 'robots.stateGeneral.disinfecting'},
		{slug: 'operator-activity', icon: 'user', color: 'blue', name: 'robots.stateGeneral.operatorActivity'}
	];

	const getRobotGeneralStateByStateId = (stateId: any) => {
		const state = states.find(state => state.id.toString() === stateId) || states[0];
		return generalStates[state.general];
	};

	

	return {
		fetchAllRobots,
		getStreamerUrl,
		fetchRobot,
		getRobotGeneralStateByStateId,
		states,
		generalStates,
	};
}

export default RobotsService;