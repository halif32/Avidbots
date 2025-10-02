import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from 'styles';
import { Location, useLocationContext } from 'contexts/LocationContext';
import { Icon, useTheme } from '@rneui/themed';
import { HomeStyles } from 'pages/Home/styles';
import { verticalResponsive } from 'utils/responsivenessControlFunction';
import { useAuth } from 'contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRobotsDataContext } from 'contexts/RobotsDataContext';

export const LocationSelect = () => {
  const [isFocus, setIsFocus] = useState(false); //dropdown focus
  const { locationsData, locationFilterKey, setLocationFilterKey } = useLocationContext();
  const { robots } = useRobotsDataContext();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const isSearchVisible: boolean = locationsData?.length > 1;
  const { authData } = useAuth();

  const handleLocationChange = async (item: Location) => {
    setIsFocus(false);
    setLocationFilterKey(item.value);
    await AsyncStorage.setItem(`${authData?.login}`, item.value);
  };

  const handleDefaultLocation = async () => {
    const locationKey: string = (await AsyncStorage.getItem(`${authData?.login}`)) || '';
    if (!locationKey) {
      setLocationFilterKey(locationsData[0]?.value);
    } else {
      setLocationFilterKey(locationKey);
    }
  };

  useEffect(() => {
    handleDefaultLocation();
  }, [locationsData, authData]);

  // This will hide the location drop-down, if there is no locations associated with the account.
  if (locationsData?.length == 0) {
    return null;
  }

  // This will hide the location drop-down, if there is 1 location and no robots associated with the location.
  if (locationsData?.length == 1 && robots?.length == 0) {
    return null;
  }

  return (
    <View
      style={[
        globalStyles.container,
        globalStyles.paddinVert10,
        { backgroundColor: theme.colors.locationHeaderColor },
        HomeStyles.mainViewStyle,
      ]}
    >
      <Dropdown
        style={[
          globalStyles.dropdown,
          isFocus && { borderColor: 'blue' },
          {
            ...Platform.select({
              android: { height: verticalResponsive(62) },
              ios: { height: verticalResponsive(55) },
            }),
          },
        ]}
        disable={!isSearchVisible}
        placeholderStyle={globalStyles.placeholderStyle}
        selectedTextStyle={[
          globalStyles.selectedTextStyle,
          { ...Platform.select({ android: { fontSize: 15 }, ios: { fontSize: 14 } }) },
        ]}
        inputSearchStyle={globalStyles.inputSearchStyle}
        selectedTextProps={{ numberOfLines: 3 }}
        iconStyle={globalStyles.iconStyle}
        data={locationsData ? locationsData : []}
        search={isSearchVisible}
        maxHeight={verticalResponsive(300)}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? t('Select_location') : ''}
        searchPlaceholder={t('Search')}
        value={locationFilterKey}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleLocationChange}
        renderLeftIcon={() => (
          <Icon
            color={theme.colors.black}
            name="map-pin"
            size={20}
            style={HomeStyles.leftIconStyle}
          />
        )}
        renderRightIcon={() => {
          if (isSearchVisible) {
            return (
              <Icon
                color={theme.colors.black}
                name="chevron-down"
                size={20}
                style={HomeStyles.leftIconStyle}
              />
            );
          }
        }}
        autoScroll={false}
      />
    </View>
  );
};
