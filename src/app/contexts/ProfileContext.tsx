import React, { useState, useContext, ReactNode, useEffect } from 'react';
import AuthService from '../services/AuthService';
import PreferencesService from '../services/preferencesService';
import { showAlert } from '../services/AlertService';
import { ContactMethod, ProfileInfo, Regions } from '../pages/Profile/types/ProfileTypes';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from './GlobalContext';

interface ProfileContextType {
  profileInfo: ProfileInfo;
  contactMethods: ContactMethod[];
  regions: Regions[];
  displayName: string;
  getProfileInfo: () => void;
  updateSettings: (payload: any) => void;
  getContactMethods: () => void;
  getDisplayName: () => void;
}

const ProfileContext = React.createContext<ProfileContextType>({
  profileInfo: { username: '' },
  contactMethods: [],
  regions: [],
  displayName: '',
  getProfileInfo() {},
  updateSettings() {},
  getContactMethods() {},
  getDisplayName() {},
});

interface ProfileContextProviderProps {
  children: ReactNode;
}

export function ProfileContextProvider({ children }: ProfileContextProviderProps) {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({ username: '' });
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([
    { id: -1, verified: -1, contact_type: '', contact_value: '' },
  ]);
  const [regions, setRegions] = useState<Regions[]>([]);
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { setAppLanguage } = useGlobalContext();

  const authService = AuthService();
  const preferencesService = PreferencesService();

  const getDisplayName = async () => {
    try {
      const data = await preferencesService.getProfileDisplayName();
      setDisplayName(data);
    } catch (error: any) {
      showAlert(t('Failed_To_fetch_Username'), [
        {
          text: t('Ok'),
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const getProfileInfo = async () => {
    try {
      const response = await authService.getSelfLogin();
      setProfileInfo(response);
      setAppLanguage('en');  // default language
    } catch (error) {
      showAlert(t('Failed_To_Fetch_UserProfile'), [
        {
          text: t('Ok'),
          onPress: () => {},
        },
      ]);
    }
  };

  const updateSettings = async (payload: any) => {
    try {
      await preferencesService.updateSettings(payload);
    } catch (error: any) {
      showAlert(t('Failed_To_Update_Settings'), [
        {
          text: t('Ok'),
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const getContactMethods = async () => {
    try {
      const response = await preferencesService.getContactMethods();
      setContactMethods(response.data);
    } catch (error: any) {
      showAlert(t('Failed_To_Load_Contact_Methods'), [{ text: t('Ok'), onPress: () => {} }]);
    }
  };

  const getTimeZones = async () => {
    try {
      const response = await preferencesService.getTimeZones();
      setRegions(response.data);
    } catch (error: any) {
      showAlert(t('Failed_To_load_Timezone'), [{ text: t('Ok'), onPress: () => {} }]);
    }
  };

  useEffect(() => {
    getTimeZones();
    getDisplayName();
  }, []);

  const contextValue: ProfileContextType = {
    profileInfo,
    contactMethods,
    regions,
    displayName,
    getProfileInfo,
    updateSettings,
    getContactMethods,
    getDisplayName,
  };

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a Provider');
  }
  return context;
}
