import { io, Socket } from 'socket.io-client';
import RobotsService from 'services/RobotsService';
import { useDomainContext } from 'contexts/DomainContext';

// Converts the URL to a WebSocket URL
function convertToWebSocketUrl(url: string): string {
	const protocol = url.startsWith('http://local') ? 'ws://' : 'wss://';
	return url.replace(/^https?:\/\//i, protocol);
}

// Extracts the base path from the URL
function extractBasePath(url: string): string {
	const regex = /^(https?:\/\/[^/]+)/i;
	const match = url.match(regex);
	return match ? match[1] : '';
}

// Extracts the path from the URL
function extractPath(url: string): string {
	const regex = /\/([^/]+)$/i;
	const match = url.match(regex);
	return match ? `/${match[1]}` : '';
}

function SocketConnections() {
	const { wsUrl } = useDomainContext();
	/**
	 * Creates a SocketIO connection for streaming without any extra parameters
	 * @param {string} session - The session id.
	 * @returns {Promise<Socket>} A Promise that resolves to the WebSocket instance.
	 */
	const socketStreamer = async (session: string): Promise<Socket> => {


		// TODO: [MCC-128] Create a Global Error Handler
		if (!session) throw new Error('Invalid Session'); // Throw an error if session is not set

		const pathUrl = '/telemetry-socket';
		const options = {
			transports: ['websocket', 'polling'],
			extraHeaders: {
				session
			},
			path: pathUrl,
			secure: false,
			port: '80'
		};

		return io(wsUrl, options);
	};

	/**
	 * Creates a SocketIO connection for streaming that will automatically join the robot room by providing a robot ID.
	 * TODO: Not being used currently since we are using a global socket connection and joining/leaving robots rooms as needed.
	 * @param {string} robotId - The ID of the robot.
	 * @param {string} session - The session id.
	 * @returns {Promise<Socket>} A Promise that resolves to the WebSocket instance.
	 */
	const robotSocketStreamer = async (robotId: string, session: string): Promise<Socket> => {
		const robotsService = RobotsService();
		// TODO: [MCC-128] Create a Global Error Handler
		if (!robotId) throw new Error('Invalid Robot ID'); // Throw an error if robotId is not set
		// TODO: [MCC-128] Create a Global Error Handler
		if (!session) throw new Error('Invalid Session'); // Throw an error if session is not set

		const streamerUrl = await robotsService.getStreamerUrl(robotId); // e.g: https://alpha.avidbots.com/telemetry-socket
		// TODO: [MCC-128] Create a Global Error Handler
		if (!streamerUrl) throw new Error(`[StreamerSocket.tsx] Could not get Streamer Url with 'RobotsService.getStreamerUrl(${robotId})'`);

		const hostUrl = extractBasePath(streamerUrl); // e.g: https://alpha.avidbots.com/
		const socketUrl = convertToWebSocketUrl(hostUrl); // e.g: wss://alpha.avidbots.com/
		const pathUrl = extractPath(streamerUrl); // e.g: /telemetry-socket
		const options = {
			query: `robot=${robotId}`,
			transports: ['websocket', 'polling'],
			extraHeaders: {
				session
			},
			path: pathUrl,
			secure: false,
			port: '80'
		};

		return io(socketUrl, options);
	};


	/**
	 * 
	 * @param session auth?.id
	 * @returns socket instance
	 */
	const supervisorSocket = async (session: string) => {

		const url = wsUrl;
		const options = {
			query: 'resource=DashboardSupervisor',
			transports: ['websocket'],
			extraHeaders: {
				session
			},
			path: '/supervisor-socket'
		};

		return io(url, options);

	};

	return { socketStreamer, robotSocketStreamer, supervisorSocket };
}

export default SocketConnections;