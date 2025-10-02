import axios from 'axios';
import Endpoints from 'constants/endpoints';
import { useDomainContext } from 'contexts/DomainContext';
import AxiosService from 'contexts/Interceptors';
import { getModel, getSystemName, getSystemVersion, getVersion } from 'react-native-device-info';
import { useTranslation } from 'react-i18next';

export type AuthData = {
  [x: string]: unknown;
  id: string;
  account: number;
  login: number;
  ip: string;
  createdTime: string;
  lastActivity: string;
  role: string;
  tfa: boolean;
  email: string;
  name: string;
};

function AuthService() {
  const { domain, getTokens, domainList } = useDomainContext();
  const axiosInstance = AxiosService();
  const { auth } = Endpoints(domain);
  const { t } = useTranslation();
  /**
   *
   * @param email email/username entered by user
   * @param _password password
   * @param tfa_code tfa_code
   * @param captcha reCaptcha V3 token
   * @param action reCaptcha action key
   * @returns userdata if successful login or error code if unsuccessful
   */
  const signIn = async (
    email: string,
    _password: string,
    tfa_code: string,
    captcha: string,
    action: string
  ): Promise<any> => {
    const data = {
      login: email,
      password: _password,
      tfa_code: tfa_code,
      captcha,
      action,
    };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': await getTokens(domain),
    };
    const response = await axios
      .post(auth.login, data, { headers: headers })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        if (err.response) {
          return err.response.data;
        }
      });
    return response;
  };

  /**
   *
   * @param role role of the logged in user
   * @returns array of permission
   */
  const setPermissions = async (role: string): Promise<any> => {
    try {
      const response: any = await axiosInstance.post(auth.permissions(role), {}, {});
      return response.data;
    } catch (err) {
      console.error('Error:', err);
      return { err };
    }
  };

  /**
   *
   * eula api to post the accepted date of the user
   * @returns the string if the eula accepteance is recorded
   */

  const acceptEula = async () => {
    try {
      const response: any = await axiosInstance.post(auth.accept_eula, {}, {});
      return response.data;
    } catch (err) {
      console.error('Error:', err);
      return { err };
    }
  };

  /**
   *
   * @returns clears the logged in data and logs out user
   */
  const signOut = async () => {
    try {
      const response: any = await axiosInstance.post(auth.logout, {}, {});
      return response.data;
    } catch (err) {
      console.error('Sign out Error:', err);
      return { err };
    }
  };

  /**
   *
   * @param loginId loginId from logged in data
   * @returns adds the device to trusted list
   */
  const addTrustedDevice = async (loginId: number) => {
    const body = {
      applicationName: `Avidbots Mobile ${getVersion()}`,
      os: `${getModel()}, ${getSystemName()}, ${getSystemVersion()}`,
    };
    try {
      const response: any = await axiosInstance.post(
        auth.trusted_device(loginId),
        JSON.stringify(body),
        {}
      );
      return response.data;
    } catch (err) {
      console.error('Error:trusted device', err);
      return { err };
    }
  };

  /**
   *
   * @param email email user submits for forgot password
   * @returns success message or error message
   */
  const forgotPassword = async (email: string) => {
    const data = {
      email: email,
      type: 'reset_password',
    };
    try {
      const responses = await Promise.all(
        domainList.map(async (d) => {
          const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': await getTokens(d.url),
          };
          const response: any = await axios.post(auth.contactMethods_send(d.url), data, {
            headers: headers,
          });
          return response;
        })
      );
      const isSuccess = responses.some((d) => d.status === 200);
      if (isSuccess) {
        return t('Success_Message_For_Forgot_Password');
      } else {
        return t('Something_Went_Wrong_Message');
      }
    } catch (err) {
      console.error('Error:', err);
      return { err };
    }
  };

  /**
   *
   * @param email email user submits for lost your key page
   * @returns success message or error message
   */
  const lostTfaKey = async (email: string) => {
    const data = {
      email: email,
      type: 'tfa_secret_change',
    };

    try {
      const responses = await Promise.all(
        domainList.map(async (d) => {
          const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': await getTokens(d.url),
          };
          const response: any = await axios.post(auth.contactMethods_send(d.url), data, {
            headers: headers,
          });
          return response;
        })
      );
      const isSuccess = responses.some((d) => d.status === 200);
      if (isSuccess) {
        return t('2FA_Key_Success_Message');
      } else {
        return t('Something_Went_Wrong_Message');
      }
    } catch (err) {
      console.error('Error:', err);
      return { err };
    }
  };

  const getSelfLogin = async (url?: any): Promise<any> => {
    try {
      if (url) {
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': await getTokens(url),
        };
        const response = await axios.get(auth.self_login(url), { headers: headers });
        return response.data;
      } else {
        const response = await axiosInstance.get(auth.self_login(domain));
        return response.data;
      }
    } catch (err) {
      return err;
    }
  };

  const submitFeedback = async (data: any) => {
    try {
      const response: any = await axiosInstance.post(auth.feedback, data, {});
      return response;
    } catch (err) {
      console.error('Error:', err);
      return { err };
    }
  };

  return {
    signIn,
    signOut,
    setPermissions,
    getSelfLogin,
    acceptEula,
    forgotPassword,
    lostTfaKey,
    addTrustedDevice,
    submitFeedback,
  };
}

export default AuthService;
