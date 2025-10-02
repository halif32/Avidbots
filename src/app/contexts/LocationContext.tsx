import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from 'react';
import LocationService from '../services/LocationService';
import { showAlert } from '../services/AlertService';
import { useTranslation } from 'react-i18next';

export type Location = {
	id?: string,
	name?: string,
	label: string;
	value: string;
	lat?: number;
	long?: number;
	distance?: number,
	robots: number
};

type LastKnownLocation = {
	id: number;
	name: string;
};

// Define the context type
interface LocationContextType {
	locationFilterKey: string;
	LastKnownLocation: LastKnownLocation;
	locationsData: Location[];
	setLocationFilterKey: (value: string) => void;
	fetchLastKnowLocation: () => void;
}

// Create the context
const LocationContext = createContext<LocationContextType | undefined>(
	undefined
);

// Create a provider component
interface LocationContextProviderProps {
	children: ReactNode;
}

export function LocationContextProvider({
	children,
}: LocationContextProviderProps) {
	const [locationFilterKey, setLocationFilterKey] = useState('');
	const [locationsData, setLocationData] = useState<Location[]>([]);
	const [LastKnownLocation, setLastKnowLocation] = useState<LastKnownLocation>({
		id: -1,
		name: '',
	});
	let allLocations: Location[] = [];
	const locationService = LocationService();
	const {t}=useTranslation();
	const loadLocations = async () => {
		locationService.fetchLocations().then((_locations: any) => {
			allLocations = _locations?.data?.map((d: Partial<Location>) => {
				return {
					label: `${d.name}`,
					value: `${d.id}`,
					lat: d.lat,
					long: d.long,
					robots:d.robots
				};
			}).filter((location:Partial<Location>) => location.robots > 0);
			// sorting locations in alphabetic order
			const sortedArr = allLocations?.sort((a, b) => {
				return a?.label.localeCompare(b?.label);
			});

			setLocationData(sortedArr);
		});
	};

	//   Fetch Last-Know location
	const fetchLastKnowLocation = async () => {
		try {
			const response: any = await locationService.fetchLastKnowLocation();
			setLastKnowLocation(response?.data);
		} catch (error) {
			showAlert(t('Failed_To_Load_Last_known_location'), [{ text: t('Ok'), onPress: () => { } }]);
		}
	};

	useEffect(() => {
		loadLocations();
		fetchLastKnowLocation();
	}, []);

	const contextValue: LocationContextType = {
		locationFilterKey,
		LastKnownLocation,
		locationsData,
		setLocationFilterKey,
		fetchLastKnowLocation,
	};
	return (
		<LocationContext.Provider value={contextValue}>
			{children}
		</LocationContext.Provider>
	);
}

// Custom hook to access the context
export function useLocationContext() {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error('useLocationContext must be used within a Provider');
	}
	return context;
}
