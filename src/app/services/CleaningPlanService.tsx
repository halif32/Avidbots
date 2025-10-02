import Endpoints from 'constants/endpoints';
import { useDomainContext } from 'contexts/DomainContext';
import AxiosService from 'contexts/Interceptors';

function CleaningPlansService() {
  const { domain } = useDomainContext();
  const axiosInstance = AxiosService();
  const { cleaning_plans } = Endpoints(domain);

  /**
   *
   * @param id robot id
   * @returns cleaning plan name
   */
  const getCleaningPlan = async (id: any) => {
    return axiosInstance.get(cleaning_plans.get_plans(id)).then(
      (response) => {
        return response ? response.data : '';
      },
      (err) => {
        return { err: err };
      }
    );
  };

  const getAllCleaningPlan = async () => {
    return axiosInstance.get(cleaning_plans.get_all_cleaning_plans()).then(
      (response) => {
        return response ? response.data : '';
      },
      (err) => {
        return { err: err };
      }
    );
  };

  return {
    getCleaningPlan,
    getAllCleaningPlan,
  };
}

export default CleaningPlansService;
