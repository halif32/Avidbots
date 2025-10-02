import { Divider, Text, useTheme } from '@rneui/themed';
import { Platform, TextInput, View } from 'react-native';
import { globalStyles } from 'styles';
import { useState } from 'react';
import RobotDisplayName from './RobotDisplayName';
import AreaUnit from './AreaUnit';
import VolumeUnit from './VolumeUnit';
import LanguageAndRegion from './LanguageAndRegion';
import { useProfileContext } from 'contexts/ProfileContext';
import { verticalResponsive } from 'utils/responsivenessControlFunction';
import { useTranslation } from 'react-i18next';

export const SettingContainer = () => {
  const { theme } = useTheme();
  const [Name, setName] = useState('');
  const { profileInfo, updateSettings } = useProfileContext();
  const dividerColor = theme.colors.textColor;
  const inputVerticalMargin = Platform.OS == 'ios' ? verticalResponsive(15) : 0;
  const { t } = useTranslation();

  return (
    <View style={[globalStyles.padding10]}>
      <View
        style={[
          globalStyles.paddingHorz10,
          globalStyles.paddinVert10,
          { backgroundColor: theme.colors.ListItemBGColor },
        ]}
      >
        <Text
          style={[
            globalStyles.paddingHorz10,
            globalStyles.marginTop10,
            { color: theme.colors.divider, fontSize: 12 },
          ]}
        >
          {t('Name')}
        </Text>
        <TextInput
          value={Name || profileInfo?.name}
          onChangeText={(text) => setName(text)}
          autoFocus={false}
          onEndEditing={() => {
            if (Name == '') return;
            updateSettings({ name: Name });
          }}
          style={[
            globalStyles.paddingHorz10,
            { color: theme?.colors?.textColor, marginVertical: inputVerticalMargin },
          ]}
        />

        <Divider color={theme.colors.textColor} />
        <Text
          style={[
            globalStyles.marginTop20,
            globalStyles.marginBottom15,
            globalStyles.paddingHorz10,
            { color: theme.colors.divider, fontSize: 12 },
          ]}
        >
          {t('Username')}
        </Text>
        <Text
          style={[
            globalStyles.marginBottom15,
            globalStyles.paddingHorz10,
            { color: theme?.colors?.textColor },
          ]}
        >
          {profileInfo?.username}
        </Text>

        <LanguageAndRegion data={profileInfo} />

        <Divider color={dividerColor} />

        <RobotDisplayName />
        <Divider color={dividerColor} />

        <AreaUnit data={profileInfo} />
        <Divider color={dividerColor} />

        <VolumeUnit data={profileInfo} />
      </View>
    </View>
  );
};
