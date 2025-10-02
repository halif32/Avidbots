import { createContext, useContext, useEffect, useState } from 'react';
import { AuthProvider } from './Auth';
import { DomainContextProvider } from './DomainContext';
import { SessionContextProvider } from './SessionContext';
import axios from 'axios';
import Endpoints from '../constants/endpoints';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import en from '../i18n/en.json';
import fr from '../i18n/fr.json';
import de from '../i18n/de.json';
import fi from '../i18n/fi.json';
import ja from '../i18n/ja.json';
import ko from '../i18n/ko.json';
import th from '../i18n/th.json';
import es from '../i18n/es.json';
import zh_CN from '../i18n/zh_CN.json';
import zh_HK from '../i18n/zh_CN.json';

type GlobalContextData = {
  reCaptchaKeys: any; // needs to stored in config files or as secret keys
  sessionTimeOut: number;
  loginCountForFeedback: number | undefined;
  currentVersion: string;
  isAppDeprecated: boolean;
  setIsAppDeprecated(value: boolean): void;
  signInDisabled: boolean;
  setSignInDisabled(value: boolean): void;
  isCaptchaVisible: boolean;
  setCaptchaVisible(value: boolean): void;
  captchaTokens: [];
  setCaptchaTokens(value: any): void;
  mobileFeatures: {
    home: boolean;
    info: boolean;
    liveview: boolean;
    myprofile: boolean;
    notifications: boolean;
    chat: boolean;
    report: boolean;
    robots: boolean;
  };
  appLanguage: string;
  setAppLanguage(value: any): void;
};
export function useGlobalContext() {
  return useContext(GlobalContext);
}
export const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
  fi: { translation: fi },
  ja: { translation: ja },
  ko: { translation: ko },
  th: { translation: th },
  es: { translation: es },
  zh_CN: { translation: zh_CN },
  zh_HK: { translation: zh_HK },
};

export const GlobalContextProvider = ({ children }) => {
  const reCaptchaKeys = {
    SITE_KEY: '6LfP_3InAAAAABaD6bRbE3u82D81VMySPyZwFGlC',
    URL: 'https://avidbots.com/',
    ACTION_KEY: 'mobile_login',
  };

  const sessionTimeOut = 240;
  const [loginCountForFeedback, setLoginCountForFeedback] = useState();
  const [currentVersion, setCurrentVersion] = useState('');
  const [appLanguage, setAppLanguage] = useState('en'); //default to english
  const [isAppDeprecated, setIsAppDeprecated] = useState(false);
  const [signInDisabled, setSignInDisabled] = useState(false);
  const [isCaptchaVisible, setCaptchaVisible] = useState(false);
  const [captchaTokens, setCaptchaTokens] = useState([]);
  const [mobileFeatures, setMobileFeatures] = useState({
    home: false,
    info: false,
    liveview: false,
    myprofile: false,
    notifications: false,
    chat: false,
    report: false,
    robots: false,
  });
  const { amazonUrls } = Endpoints('');

  useEffect(() => {
    axios
      .get(amazonUrls.avidBots_mobile_setting_url)
      .then((response) => {
        setLoginCountForFeedback(response.data.number_of_user_login_thresold_for_feedback);
        setCurrentVersion(response.data.active_version);
        axios
          .get(amazonUrls.mobile_features_url)
          .then((mobileFeaturesResponse) => {
            setMobileFeatures({
              home: mobileFeaturesResponse.data[response.data.current_dev_version].home,
              info: mobileFeaturesResponse.data[response.data.current_dev_version].info,
              liveview: mobileFeaturesResponse.data[response.data.current_dev_version].liveview,
              myprofile: mobileFeaturesResponse.data[response.data.current_dev_version].myprofile,
              notifications: mobileFeaturesResponse.data[response.data.current_dev_version].notifications,
              chat: mobileFeaturesResponse.data[response.data.current_dev_version].chat,
              report: mobileFeaturesResponse.data[response.data.current_dev_version].report,
              robots: mobileFeaturesResponse.data[response.data.current_dev_version].robots
            });
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return err;
      });
  }, []);

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources,
      lng: appLanguage,
      fallbackLng: 'en',
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: 'v3',
    });
  }, [appLanguage]);

  return (
    <GlobalContext.Provider
      value={{
        reCaptchaKeys,
        sessionTimeOut,
        loginCountForFeedback,
        currentVersion,
        isAppDeprecated,
        setIsAppDeprecated,
        signInDisabled,
        setSignInDisabled,
        isCaptchaVisible,
        setCaptchaVisible,
        captchaTokens,
        setCaptchaTokens,
        mobileFeatures,
        appLanguage,
        setAppLanguage,
      }}
    >
      <DomainContextProvider>
        <SessionContextProvider>
          {Object.keys(i18n.options).length !== 0 && (
            <I18nextProvider i18n={i18n}>
              <AuthProvider>{children}</AuthProvider>
            </I18nextProvider>
          )}
        </SessionContextProvider>
      </DomainContextProvider>
    </GlobalContext.Provider>
  );
};


