import { useNavigation } from '@react-navigation/native';
import { Badge, Button, Text , useTheme } from '@rneui/themed';

import { Image, View } from 'react-native';
import { globalStyles } from 'styles';
import { robotStyles } from 'pages/Robots/styles';
import { useContext, useEffect, useState } from 'react';
import { useRobotsDataContext } from 'contexts/RobotsDataContext';
import { Robot } from 'models/RobotModel';
import CleaningPlansService from 'services/CleaningPlanService';
import { ChatContext } from 'contexts/ChatContext';
import { useProfileContext } from 'contexts/ProfileContext';
import { verticalResponsive } from 'utils/responsivenessControlFunction';
import moment from 'moment';
import { ROUTES, TABS } from 'constants/routes';
import { Images } from 'constants/images';
import React from 'react';
import { Region } from 'pages/Profile/types/ProfileTypes';
import { useTranslation } from 'react-i18next';

type RobotItemProps = {
	robotData: Robot;
};
export const RobotItem = (props: RobotItemProps) => {
	// The Chat Histories of all allowed robots
	const { chatHistories } = useContext(ChatContext);
	const cleaningPlanService = CleaningPlansService();
	const { robotStates } = useRobotsDataContext();
	const { theme } = useTheme();
	const navigation = useNavigation();
	const [planName, setPlanName] = useState('');
	const [robotState, setRobotState] = useState(props.robotData?.state);
	const [robotStatus, setRobotStatus] = useState('homeCondition');
	const { displayName,profileInfo,regions } = useProfileContext();
	const {t}=useTranslation();
	const robotDisplayText: string =
		props.robotData[displayName == '0' ? 'name' : 'display_name'];

	const [unreadMessagesCounter, setUnreadMessagesCounter] = useState(0);
	const condition = (state: string) => {
		const cleaningCondition = robotStates.cleaningStates.includes(
			parseInt(state)
		);
		const homeCondition = robotStates.homeStates.includes(parseInt(state));
		const warningCondition = robotStates.warningStates.includes(
			parseInt(state)
		);
		const stuckCondition = robotStates.stuckStates.includes(parseInt(state));
		const offlineCondition = robotStates.offlineStates.includes(
			parseInt(state)
		);
		let condition = robotStatus;
		if (cleaningCondition) condition = 'cleaningCondition';
		else if (homeCondition) condition = 'homeCondition';
		else if (warningCondition) condition = 'warningCondition';
		else if (stuckCondition) condition = 'stuckCondition';
		else if (offlineCondition) condition = 'offlineCondition';
		setRobotStatus(condition);
	};

	const fetchPlanName = async () => {
		//this condition is for testing environment only, in production we do not have such case
		if(JSON.parse(props.robotData.plan) === 0 || JSON.parse(props.robotData.plan) === -1){return;}

		await cleaningPlanService
			.getCleaningPlan(props.robotData.plan)
			.then((response) => {
				setPlanName(response?.name);
			});
	};

	const region: Region = React.useMemo(() => {
		return regions.filter(region => region.region ==profileInfo?.time_zone?.split('/')[0])
			.map(zones => zones.time_zones)[0]
			?.filter((zone: Region) => zone?.time_zone == profileInfo?.time_zone)[0];
	}, [profileInfo?.time_zone]);



	// Updates when any chat message is received
	useEffect(() => {
		setUnreadMessagesCounter(
			chatHistories[props.robotData.id]?.messages.filter(
				(message) => !message.isRead
			).length
		);
	}, [chatHistories]);

	useEffect(() => {
		fetchPlanName();
	}, [robotState]);

	useEffect(() => {
		setRobotState(props.robotData.state);
		condition(props.robotData.state);
	}, [props.robotData.state]);

	return (
		<View
			style={[
				globalStyles.br12,
				globalStyles.flex1,
				globalStyles.row,
				globalStyles.marginBottom15,
				globalStyles.alignItemsCenter,
				robotStyles.listItem,
				{ backgroundColor: theme.colors.cardBg },
				robotStyles[robotStatus as keyof typeof robotStyles],
			]}
		>
			<Image
				style={robotStyles.imageStyle}
				source={Images.neo_img}
			/>
			<View style={[globalStyles.flex1, globalStyles.marginHorz15]}>
				<Text
					style={[globalStyles.marginBottom5, robotStyles.titleText]}
					numberOfLines={1}
				>
					{robotDisplayText}
				</Text>
				{props.robotData.state == '13' ? (
					moment(props.robotData.state_changed).isValid() ? (
						<Text style={[globalStyles.marginTop10, robotStyles.planNameText]}>
							{t('Last_Activity_At')}{' '}
							{moment.utc(props.robotData.state_changed).add(region?.offset, 'hours').format('MMM DD , YYYY h:mm A')}
						</Text>
					) : (
						<Text style={[globalStyles.marginTop10, robotStyles.planNameText]}>
							{t('Last_Activity_At')} {t('Unknown')}
						</Text>
					)
				) : (
					<Text style={[globalStyles.marginTop10, robotStyles.planNameText]}>
						{planName}
					</Text>
				)}
				<View style={[globalStyles.marginTop10]}>
					<View style={{display: 'none'}}>
						<Button size="sm" color="white" style={[{ borderColor: theme.colors.customColor },]} containerStyle={[{ width: '31%' },]} titleStyle={{ color: theme.colors.customColor, fontSize: 14, fontWeight: '600', paddingVertical: 3 }} onPress={() => navigation.navigate('RobotsTab', { screen: 'Chat', initial: false, params: { robotData: props.robotData } })}>
							{t('Chat')} {unreadMessagesCounter > 0 ? (<Badge value={unreadMessagesCounter || 0} status="warning" />) : null}
							{t('Message')}
						</Button>
					</View>
					<Button
						size="sm"
						disabled={robotStates['offlineStates'].includes(parseInt(props.robotData.state))}
						color="white"
						style={[
							{
								borderColor: theme.colors.customColor,
								margin: 0,
							},
						]}
						buttonStyle={[globalStyles.margin0]}
						containerStyle={[{ width: '100%' }]}
						titleStyle={{
							color: '#29E4AC',
							fontSize: 14,
							fontWeight: '600',
							paddingVertical: verticalResponsive(3),
						}}
						type="outline"
						onPress={() =>
							navigation.navigate(TABS.ROBOTS_TAB, {
								screen: ROUTES.ROBOTS.LIVE_VIEW,
								initial: false,
								params: {
									id: props.robotData.id,
									robotName: robotDisplayText,
								},
							})
						}
					>
						{t('Live_View')}
					</Button>
					{/* <Button size="sm" color="white" style={[{ borderColor: theme.colors.customColor },]} containerStyle={[{ width: '31%' }]} titleStyle={{ color: theme.colors.customColor, fontSize: 14, fontWeight: '600', paddingVertical: 3 }} type="outline" onPress={() => navigation.navigate('ReportsTab', { screen: 'Reports', initial: false, params: { id: props.robotData.id } })}>Report</Button> */}
				</View>
			</View>
		</View>
	);
};
