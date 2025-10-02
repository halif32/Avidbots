import { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, ImageBackground, Switch } from 'react-native';
import ExpandableListView from 'components/ReportListView';
import { Icon, Text, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';

import { Loader } from 'components/Loader/Loader';
import ReportServices from 'services/ReportServices';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { reportStyles } from './styles';
import { SectorIndicator } from './Components/ReportDetailComponents/SectorIndicator';
import { ImageEnlarger } from './Components/ReportDetailComponents/ImageEnlarger';

interface ReportDetailProps {
  route: {
    params: {
      report: {
        cleaning_report_id: string;

        // Add other properties from the report object if necessary
      };
    };
  };
}

export const ReportDetail = (props: ReportDetailProps) => {
  const [coverageImage, setCoverageImage] = useState('');
  const [showSector, setShowSector] = useState(false);
  const reportsServices = ReportServices();
  const id: any = props.route.params.report.cleaning_report_id;
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  // const [points, setPoints] = useState();
  const points = [
    {
      id: '1',
      point: [
        { x: 50, y: 50 },
        { x: 250, y: 50 },
        { x: 250, y: 150 },
        { x: 50, y: 150 },
      ],
    },
    {
      id: '2',
      point: [
        { x: 20, y: 10 },
        { x: 330, y: 10 },
        { x: 330, y: 170 },
        { x: 20, y: 170 },
      ],
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  useEffect(() => {
    reportsServices.fetchCoverageImage(id).then((res: any) => {
      const base64Data = res.substring(res.indexOf(',') + 1);
      setCoverageImage(base64Data);
    });
  }, [props]);

  const changeHeaderTitle = () => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <View style={{ width: Dimensions.get('screen').width / 1.5 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.colors.white,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {t('Report_No')} {id}
            </Text>
          </View>
        );
      },
      headerLeft: () => {
        return (
          <Text>
            <Icon
              name="chevron-left"
              iconProps={{ name: 'chevron-left', color: theme.colors.white }}
              onPress={() => navigation.goBack()}
            />
          </Text>
        );
      },
    });
  };

  //useEffect to execute this function
  useEffect(() => {
    changeHeaderTitle();
  }, []);

  return (
    <ScrollView>
      <View style={[globalStyles.container, globalStyles.marginVer10, globalStyles.paddingHorz10]}>
        <View
          style={[
            globalStyles.w100,
            globalStyles.br12,
            globalStyles.justifyCenter,
            globalStyles.flex1,
            globalStyles.cardShadow,
            { backgroundColor: theme.colors.cardBg },
          ]}
        >
          <View style={[]}>
            <View
              style={[
                // globalStyles.br8,
                globalStyles.marginVer10,
                globalStyles.flex1,
                globalStyles.marginBottom15,
              ]}
            >
              {coverageImage === '' ? (
                <Loader />
              ) : (
                <ImageBackground
                  borderRadius={8}
                  style={[
                    globalStyles.minHeight200,
                    globalStyles.marginHorz10,
                    globalStyles.br8,
                    globalStyles.flex1,
                    {
                      borderWidth: 1,
                      borderColor: theme.colors?.formBorder,
                    },
                  ]}
                  source={{
                    uri: `data:image/png;base64,${coverageImage}`,
                  }}
                  //source={require("../../assets/images/image_360.png")}
                  resizeMode={'stretch'}
                >
                  <View
                    style={[
                      globalStyles.row,
                      globalStyles.justifyEnd,
                      reportStyles.sectorTogglebuttonContainer,
                    ]}
                  >
                    <SectorIndicator
                      points={points}
                      showSector={showSector}
                      //This color will change on the basis of status
                      strokeColor={'#FFA500'}
                    />

                    <Icon
                      name="maximize"
                      color={'#2D2B2E'}
                      onPress={() => {
                        toggleModal();
                      }}
                    />
                  </View>
                </ImageBackground>
              )}
            </View>
            <View
              style={[globalStyles.row, globalStyles.paddingHorz10, globalStyles.marginBottom5]}
            >
              <Switch
                value={showSector}
                onValueChange={(newValue) => {
                  setShowSector(newValue);
                }}
              />
              <View style={[globalStyles.justifyCenter]}>
                <Text
                  style={{
                    color: theme.colors.textColor,
                  }}
                >
                  {t('Show_Sectors')}
                </Text>
              </View>
            </View>
          </View>
          <ExpandableListView data={props.route.params.report} showSector={showSector} />
          <ImageEnlarger
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            coverageImage={coverageImage}
            showSector={showSector}
            points={points}
          />
        </View>
      </View>
    </ScrollView>
  );
};
