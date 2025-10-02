import { useState } from 'react';
import { ListItem, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import componentStyles from 'components/componentStyles';
import { SectorDataDisplay } from './SectorDataDisplay';
import { FlatList } from 'react-native';

interface SectorTabProps {
  data: {
    item: {
      time: string;
      hash: string;
      area: string;
      performance: string;
      water_usage: string | string[];
    };
  };
  index: number;
}

export const SectorTab = (props: SectorTabProps) => {
  const { theme } = useTheme();
  const { time, hash, area, performance, water_usage } = props.data.item;
  const [sectorExpanded, setSectorExpanded] = useState(false);

  const sectorDisplayArray = [
    {
      id: '0',
      title: 'Total Time',
      data: time,
      type: 'time',
    },
    { id: '1', title: 'Area Cleaned', data: area, type: 'area' },
    { id: '2', title: 'Performance', data: performance, type: 'performace' },
    {
      id: '3',
      title: 'Water Usage',
      data: Array.isArray(water_usage) ? water_usage[0] : water_usage,
      type: 'water_usage',
    },
  ];
  return (
    <ListItem.Accordion
      key={props.index}
      containerStyle={[
        globalStyles.transparentbg,
        componentStyles.reportDetailTab,
        globalStyles.marginHorz10,
      ]}
      icon={{
        name: 'chevron-right',
        color: theme.colors.textColor,
        size: 21,
        style: {
          transform: [{ rotate: sectorExpanded === true ? '90deg' : '90deg' }],
        },
      }}
      content={
        <>
          <ListItem.Content style={[{ borderColor: theme.colors?.formBorder }]}>
            <ListItem.Title
              style={[
                { color: theme.colors?.reportDetailTabHeading },
                componentStyles.reportDetailTabFontSize,
              ]}
            >
              Sector {hash}
            </ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={sectorExpanded}
      onPress={() => {
        setSectorExpanded(!sectorExpanded);
      }}
    >
      <FlatList
        data={sectorDisplayArray}
        keyExtractor={(data) => data.id}
        onEndReachedThreshold={1.0}
        windowSize={1}
        renderItem={(data: any, index: number) => {
          return (
            <ListItem key={index}>
              <SectorDataDisplay
                title={data.item.title}
                data={data.item.data}
                type={data.item.type}
              />
            </ListItem>
          );
        }}
      />
    </ListItem.Accordion>
  );
};
