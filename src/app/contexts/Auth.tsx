import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthService, { AuthData } from 'services/AuthService';
import { showAlert } from 'services/AlertService';
import { showToast } from 'services/ToastService';
import { useDomainContext } from './DomainContext';
import axios from 'axios';
import { useGlobalContext } from './GlobalContext';
import { useTranslation } from 'react-i18next';
import NotificationService from 'services/notificationService';
import messaging from '@react-native-firebase/messaging';

export const eulaObject = {
	eulaVersion: 'v1.0',
	isEulaAcccepted: true
};


type AuthContextData = {
	authData?: AuthData;
	setAuthData(value: AuthData): void;
	loading: boolean;
	eulaFlag: boolean;
	getUserExistence(email: string, password: string, action: string): Promise<void>;
	signIn(email: string, password: string, tfa_code: string, action: string, trusted_device: boolean): Promise<void>;
	signOut(): void;
	updateEulaFlag(eulaState: boolean): void;
	loginCount: number;
	domainSelectionEnabled: boolean;
	setDomainSelection(value: boolean): void;
	setTfaEnabled(value: boolean): void;
	tfaEnabled: boolean;
	saveAuth(data: any): Promise<void>;
};

export const LoginStatusCodes = {
	BadRequest: 400,
	UnprocessableEntity: 422,
	Locked: 423,
	TooManyRequests: 429,
	OK: 200
};
//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);


const AuthProvider: React.FC<{ children: any }> = ({children}) => {
	const [authData, setAuthData] = useState<AuthData | undefined>();

	const [loading, setLoading] = useState(true);
	const { updateDomain, getTokens, domainList, domain } = useDomainContext();
	const authService = AuthService();
	const [eulaFlag, setEulaCheck] = useState(true);
	const [loginCount, setLoginCount] = useState(1); // loginCount to trigger feedback
	const { setCaptchaVisible, captchaTokens, setCaptchaTokens,setAppLanguage } = useGlobalContext();
	const [domainIndex, setDomainIndex] = useState(0);
	const [serverResponses, setServerReponses] = useState([]);
	const [domainSelectionEnabled, setDomainSelection] = useState(false);
	const [tfaEnabled, setTfaEnabled] = useState(false);
	const {t}=useTranslation();
	const notificationService = NotificationService();

	useEffect(() => {
		loadStorageData();
	}, []);

	useEffect(() => {
		if (captchaTokens.length >= domainList.length) return;
		setCaptchaVisible(true);
	}, [captchaTokens.length]);

	/**
	  * get the details of the logged in user and check if eula is accepted
	  * it also checks if the eula_version is equal to the latest version
	  * sets the eula acceptance to false if it wont satisfies the above two conditions
	  */
	async function getEulaStatus(url?: any): Promise<boolean> {

		try {
			const res = url ? await authService.getSelfLogin(url) : await authService.getSelfLogin();
			eulaObject.eulaVersion = res?.latest_eula_version;

			if ((!res?.eula_accepted || res?.eula_version !== res?.latest_eula_version)) {
				setEulaCheck(false);
				AsyncStorage.setItem('eulaFlag', JSON.stringify(false));
				eulaObject.isEulaAcccepted = false;
				return false;
			}

			return true;
		} catch (error) {
			return true;
		}

	}

	async function loadStorageData(): Promise<void> {
		try {
			//Try get the data from Async Storage
			const authDataSerialized = await AsyncStorage.getItem('@AuthData');
			if (authDataSerialized) {
				//If there are data, it's converted to an Object and the state is updated.
				const _authData: AuthData = JSON.parse(authDataSerialized);
				setAuthData(_authData);
			}
		} catch (error) {
			return error;
		} finally {
			//loading finished
			setLoading(false);
		}
	}

	/**
	 * 
	 * @param statusArray status codes of all the servers
	 * @returns corresponding value
	 */
	function checkWhichResponseHasUser(statusArray: any) {
		const hasOKResponse1 = statusArray[0] === LoginStatusCodes.OK || statusArray[0] === LoginStatusCodes.Locked;
		const hasOKResponse2 = statusArray[1] === LoginStatusCodes.OK || statusArray[1] === LoginStatusCodes.Locked;
		const cooldownEnabled = statusArray[0] === LoginStatusCodes.TooManyRequests && statusArray[1] === LoginStatusCodes.TooManyRequests;
		/**
		 * TODO: refactor the code
		 */
		if (cooldownEnabled) {
			return LoginStatusCodes.TooManyRequests;
		}
		if (hasOKResponse1 && !hasOKResponse2) {
			return 1; // User exists in response 1
		} else if (!hasOKResponse1 && hasOKResponse2) {
			return 2; // User exists in response 2
		} else if (hasOKResponse1 && hasOKResponse2) {
			return 3; // User exists in both responses
		} else {
			return null; // User does not exist in either response
		}
	}

	/**
	 * 
	 * @param email email entered by user
	 * @param _password pwd entered by user
	 * @returns reponse Codes
	 */
	const getLogins = async (email: string, _password: string, action: string) => {
		//read domainList from react native config
		const urls = domainList.map(d => `${d.url}/authentication/v0/Logins/login`);
		const responses = [];
		for (let i = 0; i < urls.length; i++) {
			const element = urls[i];
			const login_data = {
				login: email,
				password: _password,
				captcha: captchaTokens[i],
				action
			};
			const headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': await getTokens(domainList[i].url)
			};
			const _res = await axios.post(element, login_data, { headers: headers }).then((res) => {
				return res.data;
			}).catch((err) => {
				if (err.response) {
					return err.response.data;
				}
			});
			responses.push(_res);
		}
		setServerReponses(responses);
		if (responses.length > 1) {
			const responsesCodes = responses.map(d => d.code || LoginStatusCodes.OK);
			const userExists = checkWhichResponseHasUser(responsesCodes);
			if (userExists === LoginStatusCodes.TooManyRequests) { return responses[0]; }
			if (userExists === 3) { return responses; }
			if (userExists === null) { return null; }
			if (userExists === 1) {
				setDomainIndex(0);
				const _domain = domainList.find((d) => d.id === 0);
				updateDomain(_domain);
				return responses[0];
			}
			if (userExists === 2) {
				setDomainIndex(1);
				const _domain = domainList.find((d) => d.id === 1);
				updateDomain(_domain);
				return responses[1];
			}
		} else {
			return responses[0];
		}
	};

	const saveAuth = async (data: any) => {
		const _authData = data;
		showToast(t('Login_Successful'), 1000);
		await getEulaStatus(`${data.protocol}${data.url}`);
		setAuthData(_authData);
		AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
		AsyncStorage.setItem('loginTime', JSON.stringify(Date.now()));
		setLoginCount(loginCount + 1);
	};


	const processUserSignIn = async (response: any, trusted_device: boolean) => {
		setCaptchaTokens([]);
		response = response.status === LoginStatusCodes.OK ? response.data : response;
		if (response?.login) {
			const _domain = domainList.find((d) => d.url === `${response.protocol}${response.url}`);
			updateDomain(_domain);
			AsyncStorage.setItem('domain', _domain.url);
			saveAuth(response);
			if (trusted_device) {
				await authService.addTrustedDevice(response?.login);
			}
			return response;
		}
		else {
			return response;
		}
	};

	const signIn = async (email: string, password: string, tfa_code: string, action: string, trusted_device: boolean) => {
		const _domainIndex = domainList.find(d => d.url === domain).id;
		const serverResponse = serverResponses[_domainIndex];
		if (tfaEnabled) {
			const response = await authService.signIn(email, password, tfa_code, captchaTokens[domainIndex], action);
			const signInResponse = await processUserSignIn(response, trusted_device);
			return signInResponse;
		}
		else {
			return serverResponse;
		}
	};

	const getUserExistence = async (email: string, password: string, action: string) => {
		const loginsResponse = await getLogins(email, password, action);
		return loginsResponse;
	};

	/**
	 * @param eulaState boolean which changes the value of the authContext
	 */

	const updateEulaFlag = (eulaState: boolean) => {
		if (eulaState !== null) {
			AsyncStorage.setItem('eulaFlag', JSON.stringify(eulaState));
			// set the Eulaflag to authcontext variable
			setEulaCheck(eulaState);
		}

	};


	const signOut = async () => {
		const _domain = await AsyncStorage.getItem('domain');
		if (_domain === null) { return; }
		const token = await messaging().getToken();
		await notificationService.updateFcmTokenStatus(token,'inactive');
		const _logoutData = await authService.signOut(_domain);
		if (_logoutData === 'Logged out') {

			AsyncStorage.removeItem('@AuthData');
			AsyncStorage.removeItem('permissions');
			AsyncStorage.removeItem('loginTime');
			AsyncStorage.removeItem('domain');
			AsyncStorage.removeItem('eulaFlag');
			updateDomain('');
			setAuthData(undefined);
			setAppLanguage('en');
			setCaptchaTokens([]);
			showToast(t('Logged_Out'), 1000);
		}
		else if (domain === '') {
			return;
		}
		else {
			showAlert(t('Please_Try_Again'), [{ text: t('Ok'), onPress: () => { } }]);
		}
	};

	return (
		//This component will be used to encapsulate the whole App,
		//so all components will have access to the Context
		<AuthContext.Provider value={{ authData, loading, eulaFlag, signIn, signOut, updateEulaFlag, loginCount, getUserExistence, domainSelectionEnabled, setDomainSelection, tfaEnabled, setTfaEnabled, setAuthData, saveAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

export { AuthContext, AuthProvider, useAuth };
