import { useContext } from 'react';
import { HomeScreen } from 'pages/Home/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	createNativeStackNavigator,
	NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Robots } from 'pages/Robots/Robots';
import { Reports } from 'pages/Reports/Reports';
import { Info } from 'pages/Info/Info';
import { Notifications } from 'pages/Notifications/Notification';
import {
	getFocusedRouteNameFromRoute,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import { Chat } from 'pages/Robots/Chat/Chat';
import { ReportDetail } from 'pages/Reports/ReportDetail';
import { RobotMonitor } from 'pages/Robots/Monitor';
import BellIcon from 'components/BellIcon';
import { FirebaseContext } from 'contexts/Notifications';
import { Icon, Image, Text, useTheme } from '@rneui/themed';
import { ChatContext } from 'contexts/ChatContext';
import { ResourceCenter } from 'pages/Info/ResourceCenter';
import { RobotsDataProvider } from 'contexts/RobotsDataContext';
import { Profile } from 'pages/Profile/Profile';
import { Legal } from 'pages/Legal/Legal';
import { TouchableOpacity, View } from 'react-native';
import { LocationContextProvider } from 'contexts/LocationContext';
import { globalStyles } from 'styles';
import { ProfileContextProvider } from 'contexts/ProfileContext';
import { horizontalResponsive } from 'utils/responsivenessControlFunction';
import { ROUTES, TABS } from 'constants/routes';
import { Images } from 'constants/images';
import { useGlobalContext } from 'contexts/GlobalContext';
import { useTranslation } from 'react-i18next';
import { ReportFilter } from 'pages/Reports/ReportFilter';
import { ReportDataProvider } from 'contexts/ReportDataContext';

/**
 * created to disable type errors on Tab, consists of list of Bottom Tabs
 */
type TabParamList = {
	HomeTab: undefined;
	RobotsTab: undefined;
	ReportsTab: undefined;
	InfoTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator();
const RobotsStack = createNativeStackNavigator();
const ReportsStack = createNativeStackNavigator();
const InfoStack = createNativeStackNavigator();

const hamburgerIcon = () => {
	const navigation: any = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
			<View
				style={[
					globalStyles.container,
					{ paddingHorizontal: horizontalResponsive(5) },
					globalStyles.justifyCenter,
				]}
			>
				<Icon name="menu" color={'white'} />
			</View>
		</TouchableOpacity>
	);
};

/**
 *
 * @param navigation
 * @param route
 * @returns
 */
const baseHeaderOptions = () => {
	const { theme } = useTheme();
	const navigation: any = useNavigation();
	const route = useRoute();
	// report related notification count
	const { unReadCount } = useContext(FirebaseContext);
	// chat related notification count function
	const { countChatWithUnreadMessages } = useContext(ChatContext);
	const chatNotificationCount = countChatWithUnreadMessages();

	const currentRoute = getFocusedRouteNameFromRoute(route);
	const isNotificationsScreen = currentRoute === ROUTES.HOME.NOTIFICATIONS;

	const opts: NativeStackNavigationOptions = {
		headerShown: true,
		headerTitleAlign: 'center',
		statusBarColor: theme.colors.locationHeaderColor,
		headerStyle: {
			backgroundColor: theme.colors.locationHeaderColor,
		},
		headerShadowVisible: false,
		headerBackVisible: false,
		orientation: 'portrait',
		headerLeft: (props) => {
			return !props.canGoBack ? (
				hamburgerIcon()
			) : (
				<Text>
					<Icon
						name="chevron-left"
						iconProps={{ name: 'chevron-left', color: theme.colors.white }}
						onPress={() => navigation.goBack()}
					/>
				</Text>
			);
		},
		headerRight: () => {
			return isNotificationsScreen ? (
				''
			) : (
				<>
					<BellIcon
						count={unReadCount + chatNotificationCount}
						onPressHandler={() =>
							navigation.navigate('HomeTab', {
								screen: 'Notifications',
								initial: false,
							})
						}
					/>
				</>
			);
		},
	};

	return opts;
};

const tabBarListeners = ({ navigation, route }) => ({
	tabPress: () => {
		navigation.navigate(route.name);
	},
});

const HomeScreenStack = () => {
	const { theme } = useTheme();
	const headerTitleColor = theme.colors.textColor;
	const { t } = useTranslation();
	return (
		<HomeStack.Navigator
			initialRouteName={ROUTES.HOME.MAIN}
			screenOptions={baseHeaderOptions()}
		>
			<HomeStack.Screen
				name={ROUTES.HOME.MAIN}
				component={HomeScreen}
				options={{
					headerTitle: () => {
						return (
							<View style={globalStyles.headerImageView}>
								<Image
									source={Images.brand_black_logo}
									style={globalStyles.headerImageStyle}
								/>
							</View>
						);
					},
				}}
			></HomeStack.Screen>
			<HomeStack.Screen
				name={ROUTES.HOME.NOTIFICATIONS}
				component={Notifications}
				options={{
					headerTitle: () => {
						return (
							<Text
								h4
								h4Style={[
									globalStyles.headerTitle,
									{ color: headerTitleColor },
								]}
							>
								{t('Notifications')}
							</Text>
						);
					},
				}}
			></HomeStack.Screen>
			<HomeStack.Screen
				name={ROUTES.HOME.PROFILE}
				component={Profile}
				options={{
					headerTitle: () => {
						return (
							<Text
								h4
								h4Style={[
									globalStyles.headerTitle,
									{ color: headerTitleColor },
								]}
							>
								{t('My_Profile')}
							</Text>
						);
					},
				}}
			></HomeStack.Screen>
			<HomeStack.Screen
				name={ROUTES.HOME.LEGAL}
				component={Legal}
				options={{
					headerTitle: () => {
						return (
							<Text
								h4
								h4Style={[
									globalStyles.headerTitle,
									{ color: headerTitleColor },
								]}
							>
								{t('Legal')}
							</Text>
						);
					},
				}}
			></HomeStack.Screen>
		</HomeStack.Navigator>
	);
};
const RobotsScreenStack = () => (
	<RobotsStack.Navigator
		initialRouteName={ROUTES.ROBOTS.MAIN}
		screenOptions={baseHeaderOptions()}
	>
		<RobotsStack.Screen
			name={ROUTES.ROBOTS.MAIN}
			component={Robots}
		></RobotsStack.Screen>
		<RobotsStack.Screen
			name={ROUTES.ROBOTS.CHAT}
			component={Chat}
		></RobotsStack.Screen>
		<RobotsStack.Screen
			name={ROUTES.ROBOTS.LIVE_VIEW}
			component={RobotMonitor}
		></RobotsStack.Screen>
	</RobotsStack.Navigator>
);

const ReportsScreenStack = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();

	return (
		<ReportsStack.Navigator
		    initialRouteName={ROUTES.REPORTS.MAIN}
		    screenOptions={baseHeaderOptions()}
	    >
		    <ReportsStack.Screen
			    name={ROUTES.REPORTS.MAIN}
			    component={Reports}
			    options={{
				    headerTitle: () => {
					    return (
						    <Text
							    h4
							    h4Style={[
								    globalStyles.headerTitle,
								    { color: theme.colors.textColor },
							    ]}
						    >
							    {t('Reports')}
						    </Text>
					    );
				    },
			    }}
		    ></ReportsStack.Screen>
		   <ReportsStack.Screen
			    name={ROUTES.REPORTS.REPORT_DETAILS}
			    component={ReportDetail}
		    ></ReportsStack.Screen>
		    <ReportsStack.Screen
			    name={ROUTES.REPORTS.REPORT_FILTER}
			    component={ReportFilter}
		    ></ReportsStack.Screen>
	    </ReportsStack.Navigator>

	)

};

const InfoScreenStack = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	return (
		<InfoStack.Navigator
			initialRouteName={ROUTES.INFO.MAIN}
			screenOptions={baseHeaderOptions()}
		>
			<InfoStack.Screen
				name={ROUTES.INFO.MAIN}
				component={Info}
				options={{
					headerTitle: () => {
						return (
							<Text
								h4
								h4Style={[
									globalStyles.headerTitle,
									{ color: theme.colors.textColor },
								]}
							>
								{t('Information')}
							</Text>
						);
					},
				}}
			></InfoStack.Screen>
			<InfoStack.Screen
				name={ROUTES.INFO.RESOURCE_CENTER}
				component={ResourceCenter}
			></InfoStack.Screen>
		</InfoStack.Navigator>
	);
};

export const TabNavigator = () => {
	const { theme } = useTheme();
	const { mobileFeatures } = useGlobalContext();
	const { t } = useTranslation();
	const getTabBarVisibility = (route: any) => {
		const routeName = getFocusedRouteNameFromRoute(route);
		// Specify the screens where the tab bar should be hidden
		const hiddenScreens = [ROUTES.ROBOTS.CHAT, ROUTES.ROBOTS.LIVE_VIEW];
		return routeName === undefined
			? 'flex'
			: hiddenScreens.includes(routeName)
				? 'none'
				: 'flex';
	};

	const homeActiveCustomization = (route: any) => {
		const screens = [
			ROUTES.HOME.PROFILE,
			ROUTES.HOME.LEGAL,
			ROUTES.HOME.NOTIFICATIONS,
		]; // screens that do not need home tab to be highlighted
		return screens.includes(route?.params?.screen)
			? '#979797'
			: theme.colors.brandColor;
	};
	const _tabOptions = (
		title: string,
		route: any,
		iconName: string,
		show: boolean,
	) => {
		return {
			title: title,
			lazy: false,
			freezeOnBlur: true,
			tabBarIcon: () => <Icon color={'#979797'} name={iconName} />,
			tabBarStyle: {
				display: getTabBarVisibility(route),
				backgroundColor: theme.colors.footerBackground,
				borderColor: theme.colors.footerBackground,
			},
			tabBarActiveTintColor: homeActiveCustomization(route),
			tabBarInactiveTintColor: '#979797',
			tabBarItemStyle: { display: show ? 'flex' : 'none' },
			tabBarLabelStyle: { fontSize: 16 },
		};
	};

	return (
		<>
			<RobotsDataProvider>
				<LocationContextProvider>
					<ProfileContextProvider>
						<ReportDataProvider>
							<Tab.Navigator
								initialRouteName={TABS.HOME_TAB}
								backBehavior="firstRoute"
								screenOptions={{
									headerShown: false,
									unmountOnBlur: true,
								}}
							>
								<Tab.Screen
									name={TABS.HOME_TAB}
									component={HomeScreenStack}
									listeners={tabBarListeners}
									options={({ route }) =>
										_tabOptions(t('Home'), route, 'home', true)
									}
								/>
								<Tab.Screen
									name={TABS.ROBOTS_TAB}
									component={RobotsScreenStack}
									listeners={tabBarListeners}
									options={({ route }) =>
										_tabOptions(t('Robots'), route, 'home', false)
									}
								/>
								<Tab.Screen
									name={TABS.REPORTS_TAB}
									component={ReportsScreenStack}
									listeners={tabBarListeners}
									options={({ route }) =>
										_tabOptions(
											t('Reports'),
											route,
											'file',
											mobileFeatures.report,
										)
									}
								/>
								<Tab.Screen
									name={TABS.INFO_TAB}
									component={InfoScreenStack}
									listeners={tabBarListeners}
									options={({ route }) =>
										_tabOptions(t('Info'), route, 'help-circle', true)
									}
								/>
							</Tab.Navigator>
						</ReportDataProvider>
					</ProfileContextProvider>
				</LocationContextProvider>
			</RobotsDataProvider>
		</>
	);
};
