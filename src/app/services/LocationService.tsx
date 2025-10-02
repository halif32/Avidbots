import Endpoints from 'constants/endpoints';
import { useDomainContext } from 'contexts/DomainContext';
import AxiosService from 'contexts/Interceptors';


function LocationService() {

	const axiosInstance = AxiosService();
	const { domain } = useDomainContext();
	const { location } = Endpoints(domain);

	/**
	* 
	* @returns locations associated with the logged in account
	*/
	const fetchLocations = async () => {
		return axiosInstance.get(location.all_locations).then(response => {
			return response.data;
		}, (err) => {
			return { err: err };
		}).catch(error => error);
	};
	const fetchLastKnowLocation = async () => {
		return axiosInstance.get(location.last_known_location).then(response => {
			return response;
		}, (err) => {
			return { err: err };
		}).catch(error => error);
	};



	return {
		fetchLocations,
		fetchLastKnowLocation
	};
}

export default LocationService;