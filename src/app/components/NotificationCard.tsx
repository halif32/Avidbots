import { useState, useContext } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text , useTheme} from '@rneui/themed';
import  ReportServices  from 'services/ReportServices';
import { useNavigation } from '@react-navigation/native';
import { Loader } from 'components/Loader/Loader';
import  NotificationService   from 'services/notificationService';
import { FirebaseContext } from 'contexts/Notifications';
import { buildNotificationCardDetails , prepareTime } from 'utils/buildNotifications';
import { showToast } from 'services/ToastService';
import { useProfileContext } from 'contexts/ProfileContext';
import componentStyles from 'components/componentStyles';
import { Images } from 'constants/images';
import { useTranslation } from 'react-i18next';


const NotificationCard = (props: any) => {

	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const reportServices = ReportServices();
	const notificationService = NotificationService();
	const {setPushNotifications} = useContext(FirebaseContext);
	const { displayName } = useProfileContext();
	const { theme } = useTheme();
	const isClickable = false;
	const isUnread = props.data.read === false ? true : false;
	const {t}=useTranslation();

	const {cardLocationName, cardSubject,navigatorTab,navigatePath} =buildNotificationCardDetails(props.data.notificationContent,displayName);
	const time = prepareTime(props.data.sentTime);

	const markNotificationasRead = () => {
		if(isUnread) {
			notificationService.markNotificationAsRead(props.data._id).then(() => {
				notificationService.getNotificationLogs().then((data) => {
					setPushNotifications(data);
				}).catch(()=> {
					setPushNotifications([]);
				});
			}).catch(()=> {
				showToast(t('Unable_To_Mark_Card_Read'), 1000);
			});

		}

	};

	const handlePress = () => {
		try {
			// get the individual report detail of the props.data.report_id and navigate to the Report page
			setIsLoading(true);
			// remove the props.data.report_id key from unRead object once it is read.

			notificationService.markNotificationAsRead(props.data._id).then(() => {
				notificationService.getNotificationLogs().then((data) => {
					setPushNotifications(data);
				}).catch(()=> {
					setPushNotifications([]);
				});
			});

			if(props.data.notificationType === 'new-reports') {
				reportServices.fetchIndividualReportData(props.data.notificationContent.data.report_id).then((rawReport) => {
					setIsLoading(false);
	
					if (rawReport.err) {
						return;
					} 
					else {
	
						// navigate to report detail page with the rawReport data
						navigation.navigate(navigatorTab,
							{
								screen: 'Reports Detail',
								initial: false,
								params: 
								{ 
									report: rawReport
								}
							});
					}
				});

			} else if(navigatePath === 'Live View') {
				navigation.navigate(navigatorTab,
					{
						screen:  'Live View',
						initial: false,
						params: 
								{ 
									id: props.data.notificationContent.data.robot_id,
								}
					});

			} else {
				navigation.navigate('HomeTab',
					{
						screen:  'Home',
						initial: false,
					});

			}

			
		} catch { /* empty */ }
	};

	return (
    
		<View>
			{isLoading && <Loader />}
			{/* out of scope for beta1 (remove view and use below  touchable opacity to enable the redirect after beta 1)*/}
			<TouchableOpacity onPress={isClickable ? handlePress : markNotificationasRead} style={[componentStyles.not_card_container,{ backgroundColor: isUnread ? theme?.colors?.notificationBackground:theme?.colors?.bgColor}]}>
				{/* <View style={[styles.container,{ backgroundColor: theme?.colors?.notificationBackground}]}> */}
				{isUnread == true  && <View style={componentStyles.dot} />}
				<Image
					source={Images.neo_icon}
					style={componentStyles.image} />
				<View style={componentStyles.detailsContainer}>
					<View style={componentStyles.row}>
						{/* <Text style={[componentStyles.id,{ color: theme?.colors?.textColor}]}>{cardName}</Text> */}
						<Text style={[componentStyles.time,{ color: theme?.colors?.textColor}]}>{time +'.'}</Text>
					</View>
					<View style={componentStyles.row}>
						<Text style={[componentStyles.title,{ color: theme?.colors?.textColor}]}>{cardSubject}</Text>
					</View>
					<View style={componentStyles.row}>
						<Text style={[componentStyles.body,{ color: theme?.colors?.textColor}]}>{cardLocationName}</Text>
					</View>
				</View>
				{/* </View> */}
			</TouchableOpacity>
		</View>
	);
};



export default NotificationCard;