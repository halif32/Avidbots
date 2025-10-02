import { Text, useTheme } from '@rneui/themed';
import { View, TouchableOpacity } from 'react-native';
import { globalStyles } from 'styles';
import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { useProfileContext } from 'contexts/ProfileContext';
import { Language, Region } from '../types/ProfileTypes';
import DropDownMenu from './DropDownMenu';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../../../contexts/GlobalContext';

const LANGUAGES = [
	{ id: '1', language: 'English', code: 'en' },
	// { id: '2', language: 'Finnish', code: 'fi' },
	// { id: '3', language: 'French', code: 'fr' },
	// { id: '4', language: 'German (robot control screen only)', code: 'de' },
	// { id: '5', language: 'Japanese', code: 'ja' },
	// { id: '6', language: 'Korean', code: 'ko' },
	// { id: '7', language: 'Thai', code: 'th' },
	// { id: '8', language: 'Spanish', code: 'es' },
	// { id: '9', language: 'Simplified Chinese (robot control screen only)', code: 'zh_CN' },
	// { id: '10', language: 'Traditional Chinese', code: 'zh_HK' },
];

const LanguageAndRegion = ({ data }: any) => {
	const { theme } = useTheme();
	const { regions } = useProfileContext();
	const [selectedLanguage, setSelectedLanguage] = useState<Language | any>({ language: '', code: '' });
	const {appLanguage}=useGlobalContext();
	const {t}=useTranslation();

	const region: Region = React.useMemo(() => {
		return regions.filter(region => region.region == data?.time_zone?.split('/')[0])
			.map(zones => zones.time_zones)[0]
			?.filter((zone: Region) => zone?.time_zone == data?.time_zone)[0];
	}, [data?.time_zone]);

	useEffect(() => {
		// commented for now as i am converting language localy
		// setSelectedLanguage(LANGUAGES.find(lang => lang.code == data.language));
		//This will be removed in future
		setSelectedLanguage(LANGUAGES.find(lang => lang.code == appLanguage));

	}, []);

	const borderBottom = {
		borderWidth: 0.3,
		borderColor:
			theme?.colors?.iconColor,
	};
	return <>
		{/* Language & Time */}
		<View style={[globalStyles.marginBottom15, borderBottom]} />
		<Text style={[globalStyles.marginBottom15, globalStyles.paddingHorz10, { color: theme.colors.textColor2, fontSize: 12 }]}>{t('Language/Time_Zone')}</Text>

		{/* Language */}
		<View style={[globalStyles.row, globalStyles.justifyBetween]}>
			<Text style={[globalStyles.marginBottom5, globalStyles.paddingHorz10, { color: theme?.colors?.textColor }]}>{t('Language')}</Text>
			<TouchableOpacity style={[globalStyles.row]}>
				{/* <Text style={[globalStyles.marginBottom5, globalStyles.paddingHorz10, { color: theme?.colors?.textColor2 }]}>{selectedLanguage?.language || 'Selected Language'}</Text>
				<Icon name="chevron-right" color={theme?.colors?.grey3} size={20} /> */}
			</TouchableOpacity>
			<DropDownMenu data={LANGUAGES} selectedLanguage={selectedLanguage}/>
		</View>

		

		{/* Region */}
		<View style={[globalStyles.row, globalStyles.marginTop10, globalStyles.justifyBetween]}>
			<Text style={[globalStyles.marginBottom15, globalStyles.paddingHorz10, { color: theme?.colors?.textColor }]}>{t('Region')}</Text>
			<TouchableOpacity style={[globalStyles.row]}>
				<Text style={[globalStyles.marginBottom5, globalStyles.paddingHorz10, { color: theme?.colors?.textColor2 }]}>{data?.time_zone?.split('/')[0]}</Text>
				<Icon name="chevron-right" color={theme?.colors?.grey3} size={20} />
			</TouchableOpacity>
		</View>

		{/* Time-zone */}
		<Text style={[globalStyles.marginBottom15, globalStyles.paddingHorz10, globalStyles.textWhite, { color: theme?.colors?.textColorWhiteGray }]}>{t('Time_Zone')}</Text><TouchableOpacity style={[globalStyles.row, globalStyles.justifyBetween]}>
			{data?.time_zone &&
				<Text style={[globalStyles.marginBottom15, globalStyles.paddingHorz10, { color: theme.colors.textColor2, fontSize: 12 }]}>{region?.time_zone} ({region?.offset}) {region?.abbr}</Text>
			}
			<Icon name="chevron-right" color={theme?.colors?.grey3} size={20} />
		</TouchableOpacity>
	</>;
};

export default LanguageAndRegion;