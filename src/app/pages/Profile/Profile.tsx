import { View, BackHandler, Switch, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { globalStyles } from 'styles';
import { useNavigation } from '@react-navigation/native';
import { Icon, ListItem, Text, useTheme, useThemeMode } from '@rneui/themed';
import { ContactMethodsContainer } from './Components/ContactMethodsContainer';
import { SettingContainer } from './Components/SettingContainer';
import { useThemeContext } from 'contexts/ThemeContext';
import { horizontalResponsive, verticalResponsive } from 'utils/responsivenessControlFunction';
import { NotificationContainer } from './Components/NotificationContainer';
import { ProfileStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { useProfileContext } from 'contexts/ProfileContext';

export const Profile = () => {
  const { getSystemMode, setSystemMode } = useThemeContext();
  const { t } = useTranslation();
  const { mode, setMode } = useThemeMode();
  const toggleSystemColorScheme = () => {
    const newTheme = mode === 'light' ? 'dark' : 'light';
    setMode(newTheme);
    setSystemMode(newTheme);
  };
  useEffect(() => {
    const loadDarkMode = async () => {
      const darkMode = await getSystemMode();
      if (darkMode === null) {
        setMode('dark');
        setIsSwitchOn(true);
      } else {
        setIsSwitchOn(mode === 'dark');
        setMode(darkMode);
      }
    };
    loadDarkMode();
  }, []);
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [settingExpanded, setSettingExpanded] = useState('');
  const { theme } = useTheme();
  const { getProfileInfo } = useProfileContext();

  // Handle backpress for top back-button
  const handleBackPress = () => {
    navigation.goBack();
  };
  const backAction = () => {
    // Return false to keep default back navigaton
    return false;
  };
  useEffect(() => {
    // Setting headerLeft options for Drawer-Navigation
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Text>
            <Icon
              name="chevron-left"
              iconProps={{ name: 'chevron-left', color: theme.colors.white }}
              onPress={handleBackPress}
            />
          </Text>
        );
      },
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getProfileInfo();
  }, []);

  const DarkMode = () => {
    return (
      <View>
        <ListItem.Accordion
          containerStyle={{
            backgroundColor: theme?.colors?.bgColor,
            borderBottomWidth: 1,
            borderColor: theme.colors.drawerBG,
            paddingVertical: verticalResponsive(18),
          }}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    marginLeft: horizontalResponsive(30),
                    color: theme.colors.iconColor,
                    fontWeight: '600',
                  }}
                >
                  {t('Dark_Mode')}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Content
                style={{
                  position: 'absolute',
                  right: horizontalResponsive(10),
                }}
              >
                <Switch
                  value={isSwitchOn}
                  onValueChange={(newValue) => {
                    setIsSwitchOn(newValue);
                    toggleSystemColorScheme();
                  }}
                />
              </ListItem.Content>
            </>
          }
          icon={null}
        ></ListItem.Accordion>
      </View>
    );
  };

  const myProfileTabs = [
    {
      id: '1',
      title: t('Settings'),
      iconName: 'settings',
      renderContainer: <SettingContainer />,
    },
    {
      id: '2',
      title: t('Contact_Methods'),
      iconName: 'message-square',
      renderContainer: <ContactMethodsContainer />,
    },
    {
      id: '3',
      title: t('Notifications'),
      iconName: 'bell',
      renderContainer: <NotificationContainer />,
    },
    { id: '4', title: 'darkMode', renderContainer: <DarkMode /> },
  ];

  const renderListView = (el: any, index: number) => {
    if (el?.title == 'darkMode') {
      return <DarkMode />;
    }

    return (
      <ListItem.Accordion
        key={index}
        containerStyle={[
          {
            backgroundColor: theme.colors.bgColor,
          },
          {
            ...ProfileStyles.listViewContainer,
            borderColor: theme.colors.drawerBG,
          },
        ]}
        content={
          <>
            <Icon
              name={el?.iconName}
              size={24}
              color={theme.colors.iconColor}
              style={[globalStyles.marginLeft10]}
            />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  marginLeft: horizontalResponsive(15),
                  color: theme.colors.iconColor,
                  fontWeight: '600',
                }}
              >
                {el?.title}
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={settingExpanded === el?.title}
        onPress={() => {
          settingExpanded === el?.title ? setSettingExpanded('') : setSettingExpanded(el?.title);
        }}
        icon={{
          name: 'chevron-right',
          color: theme.colors.iconColor,
          size: 30,
          style: {
            transform: [{ rotate: settingExpanded === el?.title ? '-90deg' : '0deg' }],
          },
        }}
      >
        {el?.renderContainer}
      </ListItem.Accordion>
    );
  };

  return (
    <>
      <View style={[globalStyles.flex1, { backgroundColor: theme.colors.bgColor }]}>
        <FlatList
          data={myProfileTabs}
          keyExtractor={(data) => data.id}
          renderItem={({ item, index }) => renderListView(item, index)}
        />
      </View>
    </>
  );
};
