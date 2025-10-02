import { FlatList, Text, View } from 'react-native';
import { SectorTab } from './SectorTab';
import { useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
interface SectorTabProps {
  hash: string;
  index: number;
}
interface SectorExpandableListProps {
  sectorData: SectorTabProps[];
}
export const SectorExpandableList = (props: SectorExpandableListProps) => {
  const { sectorData } = props;
  const { theme } = useTheme();
  return (
    <View>
      <FlatList
        data={sectorData}
        keyExtractor={(data) => data.hash}
        onEndReachedThreshold={1.0}
        windowSize={1}
        renderItem={(item: any, index: number) => {
          return <SectorTab key={index} data={item} index={index} />;
        }}
        ListEmptyComponent={
          <Text
            style={[
              { color: theme.colors.textColor },
              globalStyles.paddingHorz10,
              globalStyles.paddinVert10,
            ]}
          >
            No Sector Available
          </Text>
        }
      />
    </View>
  );
};
