import { Badge, Text } from '@rneui/themed';

import { View } from 'react-native';
import componentStyles from 'components/componentStyles';

/**
 * Renders a tab item with an optional badge displaying a number.
 *
 * @component
 *
 * @param {string} title - The title of the tab item.
 * @param {number} badgeNumber - The number to be displayed in the badge (if 0, no badge will be displayed)
 *
 * @returns {React.Element} The rendered tab item with an optional badge.
 */
const TabItemWithBadge = ({ title, badgeNumber }: { title: string, badgeNumber: number }) => {
	return (
		<View style={componentStyles.header}>
			<Text style={componentStyles.title}>{title}</Text>
			{badgeNumber > 0 && (
				<Badge 
					value={badgeNumber}
					containerStyle={componentStyles.titleBadgeContainer}
					badgeStyle={componentStyles.titleBadge}
					textStyle={componentStyles.titleBadgeText}/>
			)}
		</View>
	);
};

export default TabItemWithBadge;