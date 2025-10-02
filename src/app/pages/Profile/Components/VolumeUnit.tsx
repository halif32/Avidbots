import { useState } from 'react';
import { View } from 'react-native';
import { globalStyles } from 'styles';
import { Text, useTheme } from '@rneui/themed';
import { CheckBox, Icon } from '@rneui/base';
import PreferencesService from 'services/preferencesService';
import { showAlert } from 'services/AlertService';
import { verticalResponsive } from 'utils/responsivenessControlFunction';
import { useTranslation } from 'react-i18next';



const VolumeUnit = ({ data }: any) => {
	const { theme } = useTheme();
	const [volumeUnit, setVolumeUnit] = useState('');
	const preferencesService = PreferencesService();
	const isChecked = volumeUnit == '' ? data?.volume_unit : volumeUnit;
	const {t}=useTranslation();

	const VOLUME_UNITS = [
		{ id: 1, name: t('Litres'), value: 'litres' },
		{ id: 2, name: t('US_Gallons'), value: 'us gallons' },
	];

	const updateSettings = async (payload: any) => {
		try {
			await preferencesService.updateSettings(payload);
		} catch (error) {
			showAlert(t('Failed_To_Update_Name'), []);
		}
	};

	return (
		<View>
			<Text
				style={[
					globalStyles.marginTop20,
					globalStyles.paddingHorz10,
					{
						color: theme?.colors?.textColor,
						fontWeight: '600',
						marginBottom: verticalResponsive(20),
					},
				]}
			>
				{t('Volume_Unit')}
			</Text>
			{VOLUME_UNITS.map((units) => {
				return (
					<View
						key={units.id}
						style={[
							globalStyles.row,
							globalStyles.justifyBetween,
							globalStyles.alignItemsCenter,
							{ marginTop: verticalResponsive(-8) },
						]}
					>
						<Text
							style={[
								globalStyles.marginBottom5,
								globalStyles.paddingHorz10,
								{ color: theme?.colors?.textColor },
							]}
						>
							{units.name}
						</Text>
						<CheckBox
							containerStyle={{ backgroundColor: theme.colors.ListItemBGColor }}
							checked={isChecked == units.value}
							onPress={() => {
								setVolumeUnit(units.value);
								updateSettings({ volume_unit: units.value });
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

export default VolumeUnit;
