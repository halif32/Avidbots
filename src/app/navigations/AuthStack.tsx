import { SignInScreen } from 'pages/Auth/LoginIn';
import { ForgotPassword } from 'pages/Auth/ForgotPassword';
import { LostTfaKey } from 'pages/Auth/LostTfaKey';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { globalStyles } from 'styles';
import { Icon, Image, Text, useTheme, useThemeMode } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useGlobalContext } from 'contexts/GlobalContext';
import { ROUTES } from 'constants/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Images } from 'constants/images';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

const AuthStackNav = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				animationTypeForReplace: 'pop',
				headerShown: false,
				orientation: 'portrait',
			}}
		>
			<Stack.Screen
				name={ROUTES.AUTH_STACK.LOGIN}
				component={SignInScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name={ROUTES.AUTH_STACK.FORGOT_PASSWORD}
				component={ForgotPassword}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name={ROUTES.AUTH_STACK.LOST2FA}
				component={LostTfaKey}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

/**
 *
 * @returns The Stack before successful login or post logout
 */

export const AuthStack = () => {
	const navigation = useNavigation();
	const [isBackEnabled, setBackButton] = useState(false);
	const backEnabledScreens = [
		ROUTES.AUTH_STACK.FORGOT_PASSWORD,
		ROUTES.AUTH_STACK.LOST2FA,
	];
	const { setMode } = useThemeMode();
	const {t}=useTranslation();
	const { setCaptchaTokens } = useGlobalContext();
	useEffect(() => {
		setMode('dark');
		// Create a listener to track screen changes
		const unsubscribe = navigation.addListener('state', (e) => {
			// e.data.state.routeNames contains the list of route names in the stack navigator
			const routeNames = e.data.state?.routeNames;
			setBackButton(e.data.state?.routes[0].params?.enableBack);
			if (routeNames !== undefined) {
				const currentRouteName = e.data.state?.routeNames[e.data.state.index];
				setBackButton(backEnabledScreens.includes(currentRouteName));
				if (currentRouteName === ROUTES.AUTH_STACK.LOGIN) {
					setBackButton(e.data.state?.routes[0].params?.enableBack);
				}
			}
		});

		return () => {
			// Clean up the listener when the component unmounts
			unsubscribe();
		};
	}, []);

	const handleBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		} else {
			navigation.setParams({ enableBack: false });
			navigation.navigate(ROUTES.AUTH_STACK.LOGIN);
			setCaptchaTokens([]);
		}
	};

	const { theme } = useTheme();
	return (
		<>
			<ImageBackground
				source={Images.login_background}
				resizeMode="stretch"
				style={[globalStyles.h100]}
			>
				<View style={[globalStyles.flex1, globalStyles.justifyAround]}>
					{!isBackEnabled ? null : (
						<View
							style={[
								globalStyles.alignItemsStart,
								globalStyles.padding10,
								{ position: 'absolute', zIndex: 9 },
							]}
						>
							<TouchableOpacity
								onPress={() => {
									handleBack();
								}}
							>
								<Icon name="chevron-left" color={theme.colors.white} />
							</TouchableOpacity>
						</View>
					)}
					<View
						style={[
							globalStyles.alignItemsCenter,
							globalStyles.marginTop60,
							globalStyles.h15,
							globalStyles.justifyCenter,
						]}
					>
						<Image
							style={[globalStyles.logoStyle]}
							source={Images.logo_wText}
							resizeMode={'contain'}
						/>
						<Text
							style={[globalStyles.tagLine]}
						>
							{t('Advanced_Robotics_Advanced_Cleaning')}
						</Text>
					</View>
					<View
						style={[
							globalStyles.flex1,
							globalStyles.flexGrow,
							globalStyles.marginBottom15,
							globalStyles.marginTop20,
						]}
					>
						<AuthStackNav />
					</View>
				</View>
			</ImageBackground>
		</>
	);
};
