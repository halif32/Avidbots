import { ListItem, Icon, Text, useTheme } from '@rneui/themed';
import { View, Image } from 'react-native';
import { ReportDetailsMetaData } from 'models/ReportModels';
import { useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { globalStyles } from 'styles';
import { reportStyles } from 'pages/Reports/styles';
import ReportServices from 'services/ReportServices';
import moment from 'moment';
import componentStyles from './componentStyles';
import useResultIcon from 'constants/reportIcon';
import { ReportItemTextPart } from './ReportItemTextPart';

type ReportItemProps = {
  report: ReportDetailsMetaData;
  isDateShow: boolean;
};

export const ReportItem = (props: ReportItemProps) => {
  const [coverageImage, setCoverageImage] = useState('');
  const { theme } = useTheme();
  const reportsServices = ReportServices();
  const result: any = props.report.result;
  const { iconShape, boxColour } = useResultIcon(result);

  useEffect(() => {
    reportsServices.fetchCoverageImage(props.report.cleaning_report_id).then((res: any) => {
      const base64Data = res.substring(res.indexOf(',') + 1);
      setCoverageImage(base64Data);
    });
  }, []);

  return (
    <View>
      {props.isDateShow && (
        <Text
          style={[
            { color: theme.colors.textColorWhiteGray },
            globalStyles.marginTop10,
            reportStyles.dateStyle,
          ]}
        >
          {moment(props.report.start_time).format('MMM DD, YYYY')}
        </Text>
      )}
      <ListItem
        style={[
          globalStyles.flex1,
          reportStyles.card,
          globalStyles.marginVer10,
          globalStyles.br12,
          {
            borderColor: theme.colors?.reportBorderColor,
            backgroundColor: theme.colors.reportCardBackground,
          },
        ]}
        containerStyle={[globalStyles.br14]}
      >
        <ListItem.Content
          style={[
            globalStyles.flex1,
            globalStyles.row,
            globalStyles.w100,
            globalStyles.justifyAround,
            globalStyles.transparentbg,
            globalStyles.br12,
            reportStyles.listContentStyle,
          ]}
        >
          <View
            style={[
              reportStyles.iconSection,
              globalStyles.h100,
              globalStyles.alignSelfStretch,
              { backgroundColor: boxColour },
            ]}
          >
            <Text style={[globalStyles.paddinVert10, globalStyles.h100]}>
              <Icon
                name={iconShape}
                color={theme.colors.black}
                containerStyle={[reportStyles.iconSection, { backgroundColor: boxColour }]}
              />
            </Text>
          </View>
          <View
            style={[
              globalStyles.w50,
              globalStyles.paddingHorz10,
              globalStyles.marginLeft10,
              reportStyles.reportdDetailContainerStyle,
            ]}
          >
            <ListItem.Title
              style={[
                globalStyles.marginBottom5,
                globalStyles.w80,
                { color: theme.colors?.reportItemTextColor },
                reportStyles.textFontSize,
              ]}
            >
              #{props.report.cleaning_report_id}
            </ListItem.Title>
            <ReportItemTextPart report={props.report} />
          </View>
          <View style={[globalStyles.w50, globalStyles.h100, globalStyles.alignItemsCenter]}>
            {coverageImage === '' ? (
              <Loader />
            ) : (
              <Image
                source={{ uri: `data:image/png;base64,${coverageImage}` }}
                resizeMode={'contain'}
                style={[
                  globalStyles.w100,
                  globalStyles.h100,
                  componentStyles.reportImage,
                  { borderColor: theme.colors.reportImageBorder },
                ]}
              />
            )}
          </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};
