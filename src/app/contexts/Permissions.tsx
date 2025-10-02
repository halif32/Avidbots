import React, { useState, useContext, ReactNode, useEffect } from 'react';
import { PERMISSIONS, check, request } from 'react-native-permissions';
import { showAlert } from '../services/AlertService';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

interface PermissionContextType {
	permissionStatus: string;
	isHomePageVisible: boolean;
	setPermissionStatus: (value: string) => void;
	requestLocationAndroid: () => void;
	requestLocationIOS: () => void;
	checkLocationPermisions: () => void;
}

const PermissionContext = React.createContext<PermissionContextType>({
	permissionStatus: '',
	isHomePageVisible: false,
	setPermissionStatus() { },
	requestLocationAndroid() { },
	requestLocationIOS() { },
	checkLocationPermisions() { },
});

interface PermissionContextProviderProps {
	children: ReactNode;
}





export function PermissionContextProvider({
	children,
}: PermissionContextProviderProps) {
	const [permissionStatus, setPermissionStatus] = useState<string>('');
	const [isHomePageVisible, setIsHomePageVisible] = useState(true);
	const {t}=useTranslation();

	const REQUEST_CONFIG = {
		title: t('Permission_Request_Config_Title'),
		message:
			t('Permission_Request_Config_Message'),
		buttonPositive: t('Ok'),
		buttonNegative: t('Cancel'),
	};

	async function requestLocationAndroid() {
		setIsHomePageVisible(false);
		try {
			const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, REQUEST_CONFIG);
			setPermissionStatus(result);
			setIsHomePageVisible(true);
		} catch (err) {
			setIsHomePageVisible(true);
		}
	}

	async function requestLocationIOS() {
		try {
			const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, REQUEST_CONFIG);
			setPermissionStatus(status);
			setIsHomePageVisible(true);
		} catch (err) {
			setIsHomePageVisible(true);
		}
	}

	useEffect(() => {
		if (Platform.OS == 'android') {
			requestLocationAndroid();
		} else {
			requestLocationIOS();
		}
	}, []);



	const checkLocationPermisions = () => {
		const _permission = Platform.OS == 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
		check(_permission)
			.then((result) => {
				setPermissionStatus(result);
			})
			.catch(() =>
				showAlert(t('Location_Permisison_Error'), [
					{ text: t('Ok'), onPress: () => { } },
					{ text: t('Cancel'), onPress: () => { } },
				])
			);
	};


	const contextValue: PermissionContextType = {
		permissionStatus,
		isHomePageVisible,
		setPermissionStatus,
		requestLocationAndroid,
		requestLocationIOS,
		checkLocationPermisions,
	};

	return (
		<PermissionContext.Provider value={contextValue}>
			{children}
		</PermissionContext.Provider>
	);
}

export function usePermissionContext() {
	const context = useContext(PermissionContext);
	if (!context) {
		throw new Error('usePermissionContext must be used within a Provider');
	}
	return context;
}
