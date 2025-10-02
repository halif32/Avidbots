import { useEffect, useState } from 'react';
import { View , FlatList } from 'react-native';
import { RobotItem } from 'components/RobotItem';
import { Robot } from 'models/RobotModel';
import { Text } from '@rneui/themed';
import { Loader } from 'components/Loader/Loader';
import { useRobotsDataContext } from 'contexts/RobotsDataContext';
import { globalStyles } from 'styles';
import { useLocationContext } from 'contexts/LocationContext';
import { robotStyles } from '../Robots/styles';

type RobotProps = {
	isHomePage?: boolean;
	locationSelected?: string;
};


export const Robots = (props: RobotProps) => {
	const [loader, setLoader] = useState(false);
	const [robotsData, setRobotsData] = useState(Array<Robot>);
	const [refreshing, setRefreshing] = useState(false);
	const { robots, getRobots, robotStates, sortingOrder } = useRobotsDataContext();
	const { locationFilterKey } = useLocationContext();
	const [visibleData, setVisibleData] = useState<Robot[]>([]);

	const descendingTimeSort = (data: any) => {
		return data?.sort(
			(a: any, b: any) =>
				new Date(b.state_changed).getTime() -
        new Date(a.state_changed).getTime()
		);
	};

	const ascendingTimeSort = (data: any) => {
		return data?.sort(
			(a: any, b: any) =>
				new Date(a.state_changed).getTime() -
        new Date(b.state_changed).getTime()
		);
	};

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
				if (
					robotStates[state as keyof typeof robotStates].includes(
						parseInt(robot?.state)
					)
				) {
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

	/**
   * ? Triggers only when there is a state change in RobotItem.tsx
   * ? updates the robotsData > rerenders the list
   * @param robotId updated robot id
   * @param robotState new state of the robot
   */

	const updateRobots = (robotId: string, robotState: any) => {
		const robots = [...robotsData];
		const updatedRobotIndex = robots.findIndex((x) => x.id == robotId);
		if (updatedRobotIndex === -1) return;
		robots[updatedRobotIndex].state = robotState;
		if (updatedRobotIndex === -1) return;
		const updatedrobotsData = sortRobots(robots);
		setRobotsData(updatedrobotsData);
	};

	/**
   * ? Inital data fetch on screen load
   * ? shows loader > fetchAllRobots > filters and sorts > updates robotsData > hides loader
   */
	const loadRobots = async () => {
		setLoader(true);
		setRefreshing(true); // pull to refresh
		const _filteredData = props.isHomePage? locationFilterKey == '0'? robots: robots.filter((d: any) => d.location == locationFilterKey): robots;
		setVisibleData(sortRobots(_filteredData));
		setLoader(false);
		setRefreshing(false);
	};

	useEffect(() => {
		loadRobots();
	}, [locationFilterKey]);


	useEffect(() => {
		if (props.isHomePage && locationFilterKey) {
			loadRobots();
		} else {
			setVisibleData(robots);
		}
	}, [robots]);

	useEffect(() => {
		if (locationFilterKey) {
			loadRobots();
			return;
		} else {
			getRobots(props.isHomePage ? 5 : 10);
		}
	}, []);

	return (
		<View style={[globalStyles.container, globalStyles.h100, globalStyles.flex1,globalStyles.marginTop10]}>
			{loader ? <Loader /> :
				(<FlatList
					initialNumToRender={3}
					data={visibleData}
					extraData={robots}
					renderItem={({ item }) => (
						<RobotItem
							key={item?.id}
							robotData={item}
							onStatusChange={updateRobots}
						/>
					)}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={
						<Text
							style={robotStyles.noteText} >No robots cleaning at the moment</Text>
					}
					refreshing={refreshing}
					onRefresh={() => {
						getRobots(5);
					}}
				/>
				)} 
		</View>
	);
};
