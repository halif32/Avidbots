import { Eula } from 'pages/Auth/Eula/Eula';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from 'constants/routes';

const EulaStackScreens = createNativeStackNavigator();

const EulaScreenStack = () => {
	return (
		<EulaStackScreens.Navigator
			initialRouteName={ROUTES.EULA.MAIN}
			screenOptions={{ headerShown: false }}
		>
			<EulaStackScreens.Screen
				name={ROUTES.EULA.MAIN}
				component={Eula}
			></EulaStackScreens.Screen>
		</EulaStackScreens.Navigator>
	);
};

export const EulaStack = () => {
	return (
		<>
			<EulaScreenStack />
		</>
	);
};
