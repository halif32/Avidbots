import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { horizontalResponsive, verticalResponsive } from 'utils/responsivenessControlFunction';

const { theme } = useTheme();
const componentStyles = StyleSheet.create({
  //bell icon
  container: {
    position: 'relative',
  },
  notificationCount: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 20,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationText: {
    color: theme.colors?.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  //notification card
  not_card_container: {
    flexDirection: 'row',
    backgroundColor: '#2D2B2E',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    margin: 10,
    width: '95%',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#29e4ac',
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 25,
    marginRight: 20,
  },
  id: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.white,
  },
  title: {
    fontSize: 16,
    color: theme.colors.white,
    marginBottom: 5,
  },
  body: {
    fontSize: 12,
    color: theme.colors.white,
  },
  time: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: theme.colors.white,
    marginVertical: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginLeft: 3,
    marginRight: 6,
  },
  //session modal
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9,
  },

  //tab item with badge

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  tabtitle: {
    marginRight: 4,
    fontSize: 15,
    fontWeight: '700',
  },
  titleBadge: {
    backgroundColor: theme.colors?.background,
    borderRadius: 2,
  },
  titleBadgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '700',
  },
  titleBadgeContainer: {
    marginTop: 4,
  },
  filterAndSortTabMainContainer: {
    borderWidth: horizontalResponsive(2),
    height: verticalResponsive(37),
    marginBottom: verticalResponsive(10),
  },
  tabSpacing: {
    gap: 3,
  },
  rightTabConatiner: {
    borderLeftWidth: horizontalResponsive(2),
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  reportImage: {
    borderRadius: horizontalResponsive(4),
    borderWidth: horizontalResponsive(1),
  },
  bottomSheet: {
    padding: horizontalResponsive(16),
    borderTopLeftRadius: horizontalResponsive(10),
    borderTopRightRadius: horizontalResponsive(10),
    width: horizontalResponsive(360),
    minHeight: verticalResponsive(256),
  },
  checkBoxContainerStyle: {
    backgroundColor: 'transparent',
    padding: 0,
    marginVertical: 10,
  },
  checkBoxTitle: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 18,
    width: '80%',
  },
  bottomSheetDivider: {
    borderWidth: 0.7,
    marginVertical: 15,
  },
  reportdetailTabConitainer: {
    marginBottom: verticalResponsive(8),
  },
  reportDetailTabFontSize: {
    fontSize: 13,
  },
  reportDetailTab: {
    height: verticalResponsive(50),
  },
  showBorderWidth: {
    display: 'flex',
    borderWidth: 1,
  },
  noBorderWidth: {
    display: 'none',
    borderWidth: 0,
  },
  bottomSheetMainContainer: {
    maxHeight: '93%',
  },
});

export default componentStyles;
