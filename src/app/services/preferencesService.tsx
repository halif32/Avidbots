
import Endpoints from 'constants/endpoints';
import { useAuth } from 'contexts/Auth';
import { useDomainContext } from 'contexts/DomainContext';
import AxiosService from 'contexts/Interceptors';

function PreferencesService() {

	const { domain } = useDomainContext();
	const axiosInstance = AxiosService();
	const { authData } = useAuth();
	const {preferences} = Endpoints(domain);


	const getProfileDisplayName = async () => {
		return axiosInstance.get(preferences.profile_display_name(authData?.login)).then(response => {
			return response.data;
		}, (err) => {
			return { err: err };
		}).catch(error => error);
	};

	const updateDisplayName = async (value?: string) => {
		return axiosInstance.post(preferences.display_name, { login: `${authData?.login}`, value: value }).then(response => {
			return response.data;
		}, (err) => {
			return { err: err };
		}).catch(error => error);
	};

	const updateSettings = async (payload: any) => {
		return axiosInstance.post(preferences.settings(authData?.login), payload).then(response => {
			return response.data;
		}, (err) => {
			return { err: err };
		}).catch(error => error);
	};

	const getContactMethods = async () => {
		return axiosInstance.get(preferences.contact_methods(authData?.login)).then(response => {
			return response.data;
		}, (err) => {
			return { err: err };
		}).catch(error => error);
	};


	const getTimeZones = async () => {
		return axiosInstance.get(preferences.time_zone).then(response => {
			return response.data;
		}, (err) => {
			return { err: err };
		}).catch(error => error);
	};

	const createContact = async (params: object) => {
		const payload = { ...params, login: authData?.login };
		return axiosInstance.post(preferences.create_contact, payload).then(response => {
			return response;
		}, (error) => {
			return error.response;
		}).catch(error => error);
	};

	const deleteContact = async (id: number) => {
		return axiosInstance.delete(preferences.delete_contact(id)).then(response => {
			return response.data;
		}, (error) => {
			return error.response;
		}).catch(error => error);
	};

	const resendVerification = (payload: { email?: string, number?: string, type: string }) => {
		return axiosInstance.post(preferences.resend_verification, payload).then(response => {
			return response;
		}, (error) => {
			return error.response;
		}).catch(error => error);
	};

	const getContactInformation = (name: string) => {
		return axiosInstance.get(preferences.contact_information(name)).then(response => {
			return response.data;
		}, (error) => {
			return error.response;
		}).catch(error => error);
	};

	return {
		getProfileDisplayName,
		updateDisplayName,
		updateSettings,
		getContactMethods,
		getTimeZones,
		createContact,
		deleteContact,
		resendVerification,
		getValue: getContactInformation
	};

}

export default PreferencesService;