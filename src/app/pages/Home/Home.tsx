import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { LocationSelect } from 'components/LocationSelect';
import { globalStyles } from 'styles';
import NotificationService from 'services/notificationService';
import { FirebaseContext } from 'contexts/Notifications';
import { useTheme, useThemeMode } from '@rneui/themed';
import { useThemeContext } from 'contexts/ThemeContext';
import { HomeRobots } from './HomeRobots';
import { FeedbackForm } from './Feedback';
import { useGlobalContext } from 'contexts/GlobalContext';
import { HomeStyles } from './styles';
import { useAuth } from 'contexts/Auth';
import Modal from 'react-native-modal';

export const HomeScreen = () => {
  const notificationService = NotificationService();
  const { setPushNotifications } = useContext(FirebaseContext);
  const [showFeedback, setShowFeedback] = useState(false);
  const { getSystemMode } = useThemeContext();
  const { loginCountForFeedback } = useGlobalContext();

  const { theme } = useTheme();
  const { setMode } = useThemeMode();
  const { loginCount } = useAuth();

  const dismissModal = (val: boolean) => {
    setShowFeedback(val);
  };

  const feedbackDialog = () => {
    return (
      <View style={[HomeStyles.absolute]}>
        <Modal isVisible={showFeedback} avoidKeyboard={true}>
          <View
            style={[
              globalStyles.container,
              globalStyles.padding10,
              globalStyles.h100,
              globalStyles.alignItemsCenter,
              globalStyles.justifyCenter,
            ]}
          >
            <View
              style={[
                globalStyles.alignItemsCenter,
                { backgroundColor: theme.colors.bgColor, borderRadius: 12 },
              ]}
            >
              <FeedbackForm _showFeedback={dismissModal} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const checkLoginCount = async () => {
    if (loginCount % loginCountForFeedback === 0) {
      setShowFeedback(true);
    }
  };

  useEffect(() => {
    notificationService.initialFcmToken();
    // get the notification logs from the notification service
    notificationService
      .getNotificationLogs()
      .then((data: any) => {
        setPushNotifications(data);
      })
      .catch(() => {
        setPushNotifications([]);
      });
    setTimeout(checkLoginCount, 1000);
  }, []);

  useEffect(() => {
    const loadDarkMode = async () => {
      const darkMode = await getSystemMode();
      if (darkMode === null) {
        setMode('dark');
      } else {
        const theme = darkMode == 'light' ? 'light' : 'dark';
        setMode(theme);
      }
    };
    loadDarkMode();
  }, []);

  return (
    <>
      <View
        style={[
          globalStyles.h100,
          globalStyles.flex1,
          { backgroundColor: theme?.colors?.onBoardingBorder },
        ]}
      >
        {showFeedback ? <>{feedbackDialog()}</> : <></>}
        <>
          <LocationSelect />
          <HomeRobots />
        </>
      </View>
    </>
  );
};
