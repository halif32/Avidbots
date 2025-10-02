import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Robot } from '../models/RobotModel';
import RobotsService from '../services/RobotsService';

// Define the context type
interface RobotsContextType {
	robots: Robot[];
	getRobots: (count: number) => void,
	robotStates: any,
	sortingOrder: any
}


// Create the context
const RobotsContext = createContext<RobotsContextType | undefined>(undefined);

// Create a provider component
interface RobotsDataProviderProps {
	children: ReactNode;
}

export function RobotsDataProvider({ children }: RobotsDataProviderProps) {
	const [robots, setRobots] = useState<Robot[]>([]);
	const robotsService = RobotsService();
	const getRobots = async (_inc = 10000) => {
		robotsService.fetchAllRobots(_inc).then((data: any) => {
			setRobots(data?.data);
		});
	};

	const robotStates = {
		cleaningStates: [7, 10, 11, 21, 38],
		homeStates: [0 ,1, 2, 3, 4, 5, 14, 16, 17, 19, 20, 22, 23, 28, 29, 33, 34, 35, 39],
		warningStates: [6, 8, 24, 25, 26, 30, 32,36, 37],
		stuckStates: [9, 12, 15, 18, 27, 31, 40],
		offlineStates: [ 13]
	};

	const sortingOrder = ['stuckStates', 'warningStates', 'cleaningStates', 'homeStates', 'offlineStates'];

	useEffect(() => {
		getRobots();
	}, []);

	const contextValue: RobotsContextType = {
		robots,
		getRobots,
		robotStates,
		sortingOrder
	};

	return (
		<RobotsContext.Provider value={contextValue}>
			{children}
		</RobotsContext.Provider>
	);
}

// Custom hook to access the context
export function useRobotsDataContext() {
	const context = useContext(RobotsContext);
	if (!context) {
		throw new Error('useRobotsDataContext must be used within a Provider');
	}
	return context;
}

