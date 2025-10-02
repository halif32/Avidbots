import axios from 'axios';
import { useEffect } from 'react';
import { useDomainContext } from './DomainContext';
import { getUserAgent } from 'react-native-user-agent';
import { useAuth } from './Auth';

function AxiosService() {
	const { signOut } = useAuth();
	const { domain, getTokens } = useDomainContext();
	const axiosInstance = axios.create({
		timeout: 150000,
		timeoutErrorMessage: 'Time Out',
	});

	useEffect(() => {
		axiosInstance.interceptors.request.use(async (config) => {
			config.headers['Accept'] = 'application/json';
			config.headers['Content-Type'] = 'application/json';
			config.headers['X-XSRF-TOKEN'] = await getTokens();
			config.headers['User-Agent'] = getUserAgent();
			return config;
		});

		axiosInstance.interceptors.response.use(
			async (response) => {
				return response;
			},
			(error) => {
				if (error) {
					if (error.response.status === 401) {
						signOut();
					}
				}
				return error;
			}
		);
	}, [domain, axiosInstance]);

	return axiosInstance;
}

export default AxiosService;
