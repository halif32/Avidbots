import { useTheme } from '@rneui/themed';
import { ActivityIndicator, View } from 'react-native';
import { globalStyles } from 'styles';


/**
 * TODO: replace with loder in gif format
 * @returns loader react component
 */
export const Loader = () => {
	const {theme} = useTheme();
	return (
		<>
			<View style={[globalStyles.paddingHorz10, globalStyles.justifyCenter]}>
				<ActivityIndicator size="large" color={theme.colors?.primary} />
				{/* <Image source={require("../../assets/images/loader.svg")} style={{width: 100, height: 500}}/> */}
			</View>
		</>
	);
};

export const FullPageLoader = () => {
	const {theme} = useTheme();
	return (
		<>
			<View style={[globalStyles.paddingHorz10, globalStyles.justifyCenter, globalStyles.primarybg ,{position: 'absolute', zIndex: 9, left:0, right: 0, top:0, bottom: 0}]}>
				<ActivityIndicator size="large" color={theme.colors?.primary} />
				{/* <Image source={require("../../assets/images/loader.svg")} style={{width: 100, height: 500}}/> */}
			</View>
		</>
	);
};