/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { View , FlatList } from 'react-native';
import { RobotItem } from '../../components/RobotItem';
import { Robot } from '../../models/RobotModel';
import { Image, Text } from '@rneui/themed';
import { Loader } from '../../components/Loader/Loader';
import { useRobotsDataContext } from '../../contexts/RobotsDataContext';
import { Socket } from 'socket.io-client';
import SocketConnections from '../../shared/StreamerSocket';
import { useAuth } from '../../contexts/Auth';
import { useLocationContext } from '../../contexts/LocationContext';
import { globalStyles } from 'styles';
import { robotStyles } from '../Robots/styles';
import { Images } from 'constants/images';
import { useTranslation } from 'react-i18next';

type RobotProps = {
	locationSelected?: string
}

const EmptyList = (props:any) => {
	return <View style={robotStyles.emptyList}>
		<Image source={Images.empty_robot_placeholder} style={{ width: 130, height: 130 }} resizeMode='contain' />
		<Text style={robotStyles.noteText}>{props.t('No_Robot_Available_Error_Message')}</Text>
	</View>;
};

export const HomeRobots = (props: RobotProps) => {
	const [loader, setLoader] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const { robots, robotStates, sortingOrder } = useRobotsDataContext();
	const [robotsData, setRobotsData] = useState(null);
	const [socket, setSocket] = useState<Socket | null>();
	const auth = useAuth().authData;
	const { locationFilterKey } = useLocationContext();
	const socketService = SocketConnections();
	const descendingTimeSort = (data: any) => {
		return data.sort((a: any, b: any) => new Date(b.state_changed).getTime() - new Date(a.state_changed).getTime());
	};

	const ascendingTimeSort = (data: any) => {
		return data.sort((a: any, b: any) => new Date(a.state_changed).getTime() - new Date(b.state_changed).getTime());
	};

	const {t} = useTranslation();

	/**
	* 
	* @param robots robots Array fetched from api
	* @returns sorted order of robots as per sortingOrder
	*/
	const sortRobots = (robots: Array<Robot>) => {
		const result: any = {};
		sortingOrder.forEach((state) => {
			result[state] = [];
			robots?.forEach((robot) => {
				if (robotStates[state as keyof typeof robotStates].includes(parseInt(robot?.state))) {
					result[state].push(robot);
				}
			});
		});
		result['warningStates'] = descendingTimeSort(result['warningStates']); //the robot that has been in that state for the longest time should be displayed first.
		result['stuckStates'] = descendingTimeSort(result['stuckStates']); //the robot that has been in that state for the longest time should be displayed first.
		result['cleaningStates'] = ascendingTimeSort(result['cleaningStates']); //the robot that started the cleaning plan most recently should be displayed first.
		result['homeStates'] = ascendingTimeSort(result['homeStates']); // the robot that entered that state most recently should be displayed first.
		result['offlineStates'] = ascendingTimeSort(result['offlineStates']); //the robot that entered that state most recently should be displayed first.
		return Object.values(result).flat();
	};


	useEffect(() => {
		const _robots = sortRobots(robots);
		setRobotsData(_robots);
	}, [robots]);

	useEffect(() => {
		const configureStreamer = async () => {
			const socketInstance = await socketService.supervisorSocket(auth?.id);
			setSocket(socketInstance);
		};
		configureStreamer();
	}, [locationFilterKey]);

	const updateRobots = (robotId: string, header: any, body: any) => {
		const _updatedRobot = robotsData.find(d => d.id === robotId);
		if (_updatedRobot) {
			let updatedData = robotsData.map(item => {
				if (item.id === robotId) {

					return { ...item, state: body.state };
				}
				return item;
			});
			updatedData = sortRobots(updatedData);
			setRobotsData(updatedData);
		}
	};

	useEffect(() => {
		if (socket) {
			socket.on('connect', () => {
				return;
			});

			socket.on('connect_error', (err) => {
				return;
			});

			socket.on('data', (robotId: string, header: any, body: any) => {
				if (body.state) {
					updateRobots(robotId, header, body);
				}
			});
			socket.on('disconnect', () => {
				return;
			});
		}
		return () => {
			socket?.disconnect();
		};
	}, [socket]);

	useEffect(() => {
		setLoader(true);
		if (robots && robots.length > 0) {
			let _filteredRobots = robots?.filter(d => { return d.location == parseInt(locationFilterKey); });
			_filteredRobots = sortRobots(_filteredRobots);
			setRobotsData(_filteredRobots);
			setLoader(false);
		}
			setLoader(false);
	}, [locationFilterKey, robots]);

	return (
		<View style={[globalStyles.container, globalStyles.h100, globalStyles.flex1, globalStyles.marginTop10]}>
			{loader ? <Loader /> :
				<View>
					<FlatList
						initialNumToRender={10}
						windowSize={5}
						maxToRenderPerBatch={5}
						updateCellsBatchingPeriod={30}
						removeClippedSubviews={false}
						data={robotsData}
						extraData={robotsData}
						renderItem={({ item }) => <RobotItem key={item?.id} robotData={item} />}
						keyExtractor={item => item.id}
						ListEmptyComponent={<EmptyList t={t}/>}
						refreshing={refreshing}
						onEndReachedThreshold={0.5}
					/>
				</View>}

		</View>
	);
};

