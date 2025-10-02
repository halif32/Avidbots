import { useEffect } from 'react';
import { RobotMonitorWebViewer } from './Monitor/RobotMonitor';
import { useDomainContext } from 'contexts/DomainContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme,Text,Icon } from '@rneui/themed';
import { Dimensions, View } from 'react-native';

type MonitorProps = {
	route?: {
		params: { id: any; robotName: string };
	};
};

export const RobotMonitor = (props: MonitorProps) => {
	const { theme } = useTheme();
	const { domain } = useDomainContext();
	const navigation = useNavigation();
	const robotId = props?.route?.params?.id;
	const robotName = props?.route?.params?.robotName;

	//function which changes the headerTitle and header back button
	const changeHeaderTitle = () => {
		navigation.setOptions({
			headerTitle: () => {
				return (<View style={{width: Dimensions.get('screen').width / 1.5}}>
					<Text style={{fontSize: 18, fontWeight: 'bold'}} ellipsizeMode='tail' numberOfLines={1}>{robotName}</Text>
				</View>);
			},
			headerTitleStyle: {
				color: theme.colors?.white
			},
			orientation:'all',
			headerLeft: () => {
				return(
					<Text>
						<Icon
							name="chevron-left"
							iconProps={{ name: 'chevron-left', color: theme.colors.white }}
							onPress={() => navigation.goBack()}
						/>
					</Text>
				); 
			},
		});
	};

	//useEffect to execute this function
	useEffect(() => {
		changeHeaderTitle();
	}, []);

	return <RobotMonitorWebViewer robot={robotId} baseUrl={domain} />;
};
