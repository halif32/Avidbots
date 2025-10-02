import { ImageStyle, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { horizontalResponsive, verticalResponsive } from 'utils/responsivenessControlFunction';

export const reportStyles = StyleSheet.create({
  card: {
    borderColor: theme.colors?.formBorder,
    borderWidth: 3,
  },
  coverageImage: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  iconSection: {
    width: 28,
    backgroundColor: '#ccc',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  sectorTogglebuttonContainer: {
    padding: horizontalResponsive(3),
  },
  tabListTitleText: {
    fontSize: 13,
    fontWeight: '400',
  },
  tabListDataText: {
    fontSize: 11,
    fontWeight: '400',
  },
  textFontSize: {
    fontSize: 10,
    marginTop: verticalResponsive(2),
  },
  boldText: {
    fontWeight: '700',
  },
  cleaningPlantText: {
    fontWeight: '400',
  },
  detailText: {
    fontWeight: '400',
  },
  reportdDetailContainerStyle: {
    paddingHorizontal: horizontalResponsive(15),
  },
  dateStyle: {
    fontSize: 12,
    fontWeight: '500',
  },
  listContentStyle: {
    marginTop: verticalResponsive(-8),
    marginBottom: horizontalResponsive(-8),
  },
  listViewContainer: {
    borderBottomWidth: verticalResponsive(1),
  },
  filterTabText: {
    marginLeft: horizontalResponsive(15),
    fontWeight: '500',
  },
  bottomSheetHeader: {
    fontWeight: '500',
    fontSize: 18,
    color: '#979797',
  },
  reportListContainer: {
    height: '90%',
  },
  enlargedImage: {
    width: horizontalResponsive(360),
    height: verticalResponsive(200),
    borderRadius: 8,
  },
  absolute: {
    position: 'absolute',
  },
  noteContainer: {
    marginBottom:  horizontalResponsive(8),
    flexDirection: 'column',
    flex: 1,
		padding: horizontalResponsive(10),
  },
  
});
