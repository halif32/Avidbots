/* eslint-disable react/prop-types */

import { createDrawerNavigator, DrawerContentScrollView, DrawerNavigationOptions } from '@react-navigation/drawer';
import { useAuth } from 'contexts/Auth';
import { TabNavigator } from './TabNavigator';
import { TouchableOpacity, View } from 'react-native';
import { Button, Divider, Icon, Image, Text, useTheme, useThemeMode } from '@rneui/themed';
import { globalStyles } from 'styles';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import { getVersion } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES, TABS } from 'constants/routes';
import { Images } from 'constants/images';
import { useTranslation } from 'react-i18next';

const Drawer = createDrawerNavigator();

/**
	* 
	* @param leftIcon name of the icon to the extreme left of the title
	* @param rightIcon name of the icon to the extreme right of the title
	* @param title title of list item
	* @param onPress onpress event of the item
	* @returns The custom list item for sidemenu/ drawer navigator (eg: Profile, Legal)
	*/

const CustomDrawerItem = ({ leftIcon, rightIcon, title, onPress }) => {
	const { theme } = useTheme();
	return (
		<Divider color={theme?.colors?.textColor2}>
			<TouchableOpacity style={[globalStyles.row, globalStyles.justifyBetween, globalStyles.alignItemsCenter, globalStyles.marginVer10, globalStyles.marginHorz10, { paddingVertical: 8 }]} onPress={onPress}>
				<View style={[globalStyles.row, globalStyles.alignItemsCenter,]}>
					<Icon name={leftIcon} containerStyle={[globalStyles.marginHorz10, { marginRight: 15 }]} color={theme.colors.iconColor}></Icon>
					<Text style={[globalStyles.menuTitle]}>{title}</Text>
				</View>
				<Icon name={rightIcon} containerStyle={[globalStyles.marginRight10]} color={theme.colors.iconColor}></Icon>
			</TouchableOpacity>
		</Divider>
	);
};

/**
	* ? SideMenu / Drawer Menu UI customization can be done 
	* @param props DrawerNavigator Props passed to enable customization of the content
	* @returns DrawerContentScrollView react native node
	*/

const DrawerContent = (props: any) => {
	const navigation = useNavigation();
	const { mode } = useThemeMode();
	const { theme } = useTheme();
	const auth = useAuth();
	const [loading, setLoader] = useState(false);
	const {t}=useTranslation();
	const signOut = async () => {
		DrawerActions.closeDrawer();
		await AsyncStorage.removeItem('@contacts');
		setLoader(true);
		auth.signOut();
		setLoader(false);
	};
	const gradientColor = mode == 'dark' ? ['#2D2B2D', '#2D2B2D', '#3E3F47', '#3E3F47'] : ['#D7D8D9', '#fff', '#fff', '#fff', '#fff'];
	return (
		<View style={{ flex: 1, backgroundColor: theme?.colors?.drawerBG }}>
			<DrawerContentScrollView contentContainerStyle={[globalStyles.flex1]} {...props}>
				<LinearGradient colors={gradientColor} start={{ x: 0., y: 0 }} end={{ x: 0, y: 1 }} style={[{ flexGrow: 1 }, globalStyles.justifyBetween]}>
					<View>
						<View style={[globalStyles.w100, globalStyles.alignItemsCenter, globalStyles.marginVer10]}>
							<Image
								style={[{ width: 200, height: 72 }, globalStyles.marginVer10]}
								source={Images.logo_icon}
								resizeMode={'contain'}
							/>
							<Image source={mode == 'dark' ? Images.brand_white_logo : Images.brand_black_logo} style={[globalStyles.sidemenuLogo]} resizeMode={'contain'} />
						</View>
						<View>
							<Divider color={theme?.colors?.textColor2} />
							{/* <DrawerItemList {...props} /> */}
							<CustomDrawerItem leftIcon="user" rightIcon="chevron-right" title={t('My_Profile')} onPress={() => navigation.navigate(TABS.HOME_TAB, { screen: ROUTES.HOME.PROFILE, initial: false })}></CustomDrawerItem>
							<CustomDrawerItem leftIcon="file" rightIcon="chevron-right" title={t('Legal')} onPress={() => navigation.navigate(TABS.HOME_TAB, { screen: ROUTES.HOME.LEGAL, initial: false })}></CustomDrawerItem>

						</View>
					</View>
					<View style={[globalStyles.container, globalStyles.justifyEnd, globalStyles.alignItemsCenter, globalStyles.paddinVert10]}>
						<Button title={t('Logout')} type='solid' onPress={signOut} loading={loading}></Button>
						<Text style={[globalStyles.marginVer10, { fontWeight: '600', fontSize: 15,textAlign:'center' }]}>{t('App_Version')} {getVersion()}</Text>
					</View>
				</LinearGradient>
			</DrawerContentScrollView>
		</View>
	);
};


/**
	* ? Initializes the Drawer Navigator of the app which can be considered as parent Navigator for all other stacks used.
	* ? Only UI customization of the header can be done from options of Drawer.Navigator
	* @returns DrawerNavigator (list of drawer screens, events on the drawermenu)
	*/
export const DrawerNavigator = () => {
	const {theme} = useTheme();
	return (
		<Drawer.Navigator
			initialRouteName="main"
			drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={({ navigation }) => {
                const state = navigation.getState?.();
                const currentIndex = (state && typeof state.index === 'number') ? state.index : 0;
                const options: DrawerNavigationOptions = {
                    headerShown: currentIndex > 0 ? true : false,
					headerTitleAlign: 'center',
					drawerType:'front',
					headerLeft: () => {
						return <Text><Icon name="chevron-left" iconProps={{ name: 'chevron-left', color: theme.colors.white }} onPress={() => navigation.goBack()} /></Text>;
					}
				};
				return options;
			}}
		>
			<Drawer.Screen name="main" component={TabNavigator} options={{
				title: 'Home',
				drawerItemStyle: {
					display: 'none'
				}
			}} />
		</Drawer.Navigator>
	);
};