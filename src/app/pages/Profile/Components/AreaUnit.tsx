import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { globalStyles } from 'styles';
import { Text, useTheme } from '@rneui/themed';
import { CheckBox, Icon } from '@rneui/base';
import { useProfileContext } from 'contexts/ProfileContext';
import { verticalResponsive } from 'utils/responsivenessControlFunction';
import { useTranslation } from 'react-i18next';


const Units = ({ data }: any) => {
	const { theme } = useTheme();
	const [areaUnit, setAreaUnit] = useState('');
	const { updateSettings } = useProfileContext();
	const isChecked = areaUnit == '' ? data?.area_unit : areaUnit;
	const {t}=useTranslation();

	const AREA_UNITS = [
		{ id: '1', name: t('Square_Meters'), value: 'square meters' },
		{ id: '2', name: t('Square_Feet'), value: 'square feet' },
	];
	

	const UnitItem = (units: any) => {
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
						setAreaUnit(units.value);
						updateSettings({ area_unit: units.value });
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
	};

	return (
		<View>
			<Text
				style={[
					globalStyles.marginTop20,
					globalStyles.marginBottom15,
					globalStyles.paddingHorz10,
					{ color: theme.colors.divider, fontSize: 12 },
				]}
			>
				{t('Unit')}
			</Text>
			<Text
				style={[
					globalStyles.paddingHorz10,
					{
						color: theme?.colors?.textColor,
						fontWeight: '600',
						marginBottom: verticalResponsive(20),
					},
				]}
			>
				{t('Area_Unit')}
			</Text>
			<FlatList
				data={AREA_UNITS}
				keyExtractor={(data) => data.id}
				renderItem={({ item }) => <UnitItem {...item} />}
			/>
		</View>
	);
};

export default Units;
