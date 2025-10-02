import { createTheme } from '@rneui/themed';

const lightColors = {
  background: '#F9F8F8',
  bgColor: '#FFFFFF',
  brandColor: '#00FF64',
  headerBackground: '#00FF64',
  footerBackground: '#F9F8F8',
  statusBarColor: '#00FF64',
  textColor: '#2D2B2E',
  textColor2: '#2D2B2E',
  highlightColor: '#2D2B2E',
  sideMenuBackground: '#F9F8F8',
  divider: '#979797',
  formLabel: '#6D6A6A',
  borderColor: '#F9F8F8',
  reportItemTextColor: '#2D2B2E',
  reportBorderColor: '#B7BAC3',
  primary: '#00ff66',
  formBorder: '#B7BAC3',
  customColor: '#29E4AC',
  customColor2: '#F7EEEE',
  onBoardingBorder: '#F9F8F8',
  white: '#fff',
  black: '#000',
  iconColor: '#635F5F',
  ListItemBGColor: '#F8F7F7',
  textColorWhiteGray: '#6D6A6A',
  locationHeaderColor: '#00FF64',
  cardBg: '#FFFFFF',
  drawerBG: '#D7D8D9',
  gradient1: '#D7D8D9',
  gradient2: '#fff',
  gradient3: '#fff',
  gradient4: '#fff',
  darkBlack: '#fff',
  textWhite: '#000',
  notificationBackground: '#F9F8F8',
  reportDetailTabHeading: '#3B749A',
  showSectorLabelColor: '#2D2B2E',
  reportImageBorder: '#979797',
  reportCardBackground: '#fff',
};

const darkColors = {
  background: '#000000',
  notificationBackground: '#2D2B2E',
  brandColor: '#00FF64',
  headerBackground: '#2D2B2E',
  footerBackground: '#2D2B2E',
  highlightColor: '#2D2B2E',
  statusBarColor: '#2D2B2E',
  textColor2: '#979797',
  sideMenuBackground: '#2D2B2E',
  divider: '#979797',
  formLabel: '#6D6A6A',
  borderColor: '#F9F8F8',
  reportItemTextColor: '#979797',
  reportBorderColor: '#B7BAC3',
  infoBackground: '#1A1A1A',
  textWhite: '#fff',
  primary: '#00ff66',
  bgColor: '#1A1A1A',
  iconColor: '#8C8C8C',
  ListItemBGColor: '#282629',
  onBoardingBorder: '#000000',
  textColor: '#FFFFFF',
  white: '#fff',
  black: '#000',
  textColorWhiteGray: '#FFFFFF',
  locationHeaderColor: '#2D2B2E',
  cardBg: '#2D2B2E',
  drawerBG: '#2D2B2E',
  gradient1: '#2D2B2D',
  gradient2: '#2D2B2D',
  gradient3: '#3E3F47',
  gradient4: '#3E3F47',
  formBorder: '#B7BAC3',
  reportDetailTabHeading: '#B0DFFE',
  showSectorLabelColor: '#2D2B2E',
  reportImageBorder: '#fff',
  reportCardBackground: '#2D2B2E',
};

export const theme = createTheme({
  //light theme
  lightColors: lightColors,
  //dark colors theme
  darkColors: darkColors,
  //components styling

  components: {
    Button: (props, theme) => ({
      type: props.type || 'solid',
      color: theme.colors.brandColor,
      titleStyle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: props.type === 'solid' ? theme.colors.background : theme.colors.brandColor,
      },
      containerStyle: {
        width: '100%',
      },
      buttonStyle: {
        borderRadius: 10,
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: props.type === 'outline' ? theme.colors.brandColor : 'transparent',
      },
    }),
    Text: (props, theme) => ({
      style: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: theme.colors.textColor,
      },
      h1Style: {
        color: 'black',
        fontSize: 25,
      },
      h2Style: {
        color: 'green',
      },
      h3Style: {
        fontSize: 15,
      },
    }),
    Input: (props, theme) => ({
      placeholderTextColor: theme.colors.formLabel,
      inputStyle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
      },
      inputContainerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingHorizontal: 0,
        opacity: 0.8,
      },
    }),

    Icon: (props, theme) => ({
      size: props.size || 24,
      type: 'feather',
      color: props.color || theme.colors.textColor,
    }),
    CheckBox: (props, theme) => ({
      iconType: 'feather',
      checkedIcon: props.checkedIcon ? props.checkedIcon : 'check-square',
      checkedColor: theme.colors.background,
      uncheckedIcon: props.uncheckedIcon ? props.uncheckedIcon : 'square',
      uncheckedColor: theme.colors.background,
      containerStyle: { marginLeft: 0, marginRight: 0 },
      textStyle: {
        fontFamily: 'Montserrat-Regular',
        color: theme.colors.background,
      },
    }),
    ListItem: {
      containerStyle: {
        backgroundColor: 'transparent',
      },
    },
    ListItemContent: {
      style: {
        backgroundColor: 'transparent',
      },
    },
  },
  mode: 'dark',
});
