import { useThemeMode } from '@rneui/themed';
import { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define the context type
interface ThemeContextType {
    selectedTheme: string,
    setTheme: (value: any) => void,
				setSystemMode:(value:string) => void,
				getSystemMode:() => string
}
// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// Create a provider component
interface ThemeContextProviderProps {
    children: ReactNode;
}
export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeContext must be used within a Provider');
	}
	return context;
}
export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
	const MODE = 'dark';
	const [selectedTheme, setSelectedTheme] = useState('dark');
	const {setMode} = useThemeMode();

	const setTheme = (theme?:any) => {
		setSelectedTheme(theme);
		setMode(theme);
	};


	// Handle Dark mode
	const setSystemMode = async (value = '') => {
		try {
			await AsyncStorage.setItem(MODE, value);
		} catch (err) {
			return null;
		}
	};

	const getSystemMode = async () => {
		try {
			return await AsyncStorage.getItem(MODE);
		} catch (err) {
			return null;
		}
	};



	const contextValue: ThemeContextType = {
		selectedTheme,
		setTheme,
		setSystemMode,
		getSystemMode,
	};


	
	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}
// Custom hook to access the context
