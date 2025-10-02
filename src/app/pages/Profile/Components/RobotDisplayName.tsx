import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { globalStyles } from 'styles';
import { Text, useTheme } from '@rneui/themed';
import { CheckBox, Icon } from '@rneui/base';
import PreferencesService from 'services/preferencesService';
import { showAlert } from 'services/AlertService';
import { useProfileContext } from 'contexts/ProfileContext';
import { verticalResponsive } from 'utils/responsivenessControlFunction';
import { useTranslation } from 'react-i18next';

const RobotDisplayName = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();

	const preferencesService = PreferencesService();
	const { getDisplayName, displayName } = useProfileContext();
	const [isDisplayNameSelected, setIsDisplayNameSelected] =
		useState(displayName);
	const updateDisplayName = async (value?: string) => {
		try {
			await preferencesService.updateDisplayName(value);
			getDisplayName();
		} catch (error) {
			showAlert('Failed to update display name', []);
		}
	};

	const DISPLAY_NAME = [
		{ id: 1, name: t('Display_Name'), value: '1' },
		{ id: 2, name: t('Serial_Number'), value: '0' },
	];

	useEffect(() => {
		getDisplayName();
	}, []);

	return (
		<View>
			<View style={[globalStyles.marginBottom15]} />
			<Text
				style={[
					globalStyles.paddingHorz10,
					{
						color: theme.colors.divider,
						fontSize: 12,
						marginBottom: verticalResponsive(20),
					},
				]}
			>
				{t('Robot_Name_To_Display')}
			</Text>
			{DISPLAY_NAME.map((item) => {
				return (
					<View
						key={item.id}
						style={[
							globalStyles.row,
							globalStyles.justifyBetween,
							globalStyles.alignItemsCenter,
							{ marginTop: verticalResponsive(-8) },
						]}
					>
						<Text
							style={[
								globalStyles.paddingHorz10,
								{ color: theme?.colors?.textColor },
							]}
						>
							{item.name}
						</Text>
						<CheckBox
							containerStyle={{ backgroundColor: theme.colors.ListItemBGColor }}
							checked={item.value == isDisplayNameSelected}
							onPress={() => {
								setIsDisplayNameSelected(item.value);
								updateDisplayName(item.value);
							}}
							checkedIcon={
								<Icon
									name="radio-button-checked"
									type="material"
									color={theme.colors.textColor}
									size={22}
								/>
							}
							uncheckedIcon={
								<Icon
									name="radio-button-unchecked"
									type="material"
									color={theme.colors.textColor}
									size={22}
								/>
							}
						/>
					</View>
				);
			})}
		</View>
	);
};

export default RobotDisplayName;
