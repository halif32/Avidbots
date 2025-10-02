import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { ListItem, useTheme } from '@rneui/themed';
import { ReportDetailsList, ReportDetailsMetaData } from 'models/ReportModels';
import { globalStyles } from 'styles';
import componentStyles from './componentStyles';
import { SectorExpandableList } from 'pages/Reports/Components/ReportDetailComponents/SectorListView';
import { DetailsAndMetricsDataDisplayTab } from 'pages/Reports/Components/ReportDetailComponents/DetailsAndMetricsDataDisplayTab';
import { NotesDataDisplayTab } from 'pages/Reports/Components/ReportDetailComponents/NotesDataDisplayTab';
import ReportServices from 'services/ReportServices';
import { useTranslation } from 'react-i18next';

interface ExpandableListViewProps {
  data: ReportDetailsMetaData;
  showSector: boolean;
}

const ExpandableListView = (props: ExpandableListViewProps) => {
  const { theme } = useTheme();
  const reportsServices = ReportServices();
  const id: any = props.data.cleaning_report_id;
  const { t } = useTranslation();
  const [sectorAndNotesData, setSectorAndNotesData] = useState([]);
  //Temporary Data to display sector
  const [expanded, setExpanded] = useState([
    { tab: 1, status: false },
    { tab: 2, status: false },
    { tab: 3, status: false },
    { tab: 4, status: false },
  ]);

  useEffect(() => {
    reportsServices
      .fetchReportNotes(id)
      .then((res: any) => {
        setSectorAndNotesData(res);
      })
      .catch(() => {
        setSectorAndNotesData([]);
      });
  }, [id]);

  const listOnPress = (i: number) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[i].status = !updatedExpanded[i].status;
    setExpanded(updatedExpanded);
  };

  const renderTabs = (list: any) => {
    if (list.id === 1 || list.id === 2) {
      return (
        <DetailsAndMetricsDataDisplayTab
          content={list}
          data={props.data}
          unskippedtime={sectorAndNotesData?.unskippedtime}
        />
      );
    } else if (list.id === 3) {
      return <SectorExpandableList sectorData={sectorAndNotesData?.sectorData} />;
    } else {
      return <NotesDataDisplayTab notes={sectorAndNotesData?.result} />;
    }
  };
  const checkStyle = (id: any) => {
    if (id === 3 && !props.showSector) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={[globalStyles.paddingHorz10]}>
      {ReportDetailsList.map((l, i) => {
        return (
          <View
            key={i}
            style={[
              globalStyles.marginBottom5,
              globalStyles.br12,
              {
                borderColor: theme.colors?.formBorder,
              },
              componentStyles.reportdetailTabConitainer,
              checkStyle(l.id) ? componentStyles.noBorderWidth : componentStyles.showBorderWidth,
            ]}
          >
            <ListItem.Accordion
              containerStyle={[globalStyles.transparentbg, componentStyles.reportDetailTab]}
              icon={{
                name: 'chevron-right',
                color: theme.colors.textColor,
                size: 21,
                style: {
                  transform: [{ rotate: expanded[i].status === true ? '90deg' : '90deg' }],
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
                      {t(l.title)}
                    </ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded[i].status}
              onPress={() => {
                listOnPress(i);
              }}
            >
              {renderTabs(l)}
            </ListItem.Accordion>
          </View>
        );
      })}
    </View>
  );
};

export default ExpandableListView;
