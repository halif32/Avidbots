import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import componentStyles from 'components/componentStyles';

type BellIconProps = {
	count: number;
	onPressHandler: any;
};
const BellIcon = (props: BellIconProps) => {
	// destructure the props
	const { count, onPressHandler } = props;
	const {theme} = useTheme();
	const resetCount = () => {
		onPressHandler();
	};

	return (
		<TouchableOpacity onPress={resetCount}>
			<View style={componentStyles.container}>
				<Icon
					name="bell"
					size={25}
					color={theme.colors?.white}
					containerStyle={[globalStyles.margin0]}
				/>
				{count > 0 && (
					<View style={componentStyles.notificationCount}>
						<Text style={componentStyles.notificationText}>
							{count > 99 ? '99+' : count}
						</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default BellIcon;
