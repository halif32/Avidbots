import { View, Text } from 'react-native';
import { useState } from 'react';
import { Divider, Icon, useTheme } from '@rneui/themed';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { Dropdown } from 'react-native-element-dropdown';
import { verticalResponsive } from '../../../utils/responsivenessControlFunction';
import { ProfileStyles } from '../styles';
import { useProfileContext } from 'contexts/ProfileContext';

export default function DropDownMenu(props: any) {
	const { theme } = useTheme();
	const { setAppLanguage } = useGlobalContext();
	const [isfocus, setIsFocus] = useState(false);
	const { updateSettings } = useProfileContext();


	return (
		<View style={[ProfileStyles.dropDownMenuMainContainer]}>
			<Dropdown
				selectedTextStyle={[{
					color: theme?.colors?.textColor2,					
				},ProfileStyles.dropDownSelectedTextStyle]}
				containerStyle={[ProfileStyles.dropDownContainerStyle]}
				selectedTextProps={{ numberOfLines: 1 }}
				data={props.data}
				maxHeight={verticalResponsive(200)}
				labelField="language"
				valueField="code"
				placeholder={props?.selectedLanguage?.language}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				placeholderStyle={[{
					color: theme?.colors?.textColor2,					
				},ProfileStyles.dropDownSelectedTextStyle]}
				value={props.selectedLanguage.language}
				renderItem={(item: any) => {
					return (
						<View>
							<Text style={[{ color: 'black' },ProfileStyles.dropDownListItemText]}>
								{item.language}
							</Text>
							<Divider />
						</View>
					);
				}}
				onChange={(item: any) => {
					setAppLanguage(item.code);
					updateSettings({language:item.code});
				}}
				renderRightIcon={() => {
					return (
						<Icon
							name="chevron-right"
							color={theme?.colors?.grey3}
							size={17}
							style={{ transform: [{ rotate: isfocus ? '90deg' : '0deg' }] }}
						/>
					);
				}}
				autoScroll={false}
			/>
		</View>
	);
}
