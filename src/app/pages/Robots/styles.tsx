import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const robotStyles = StyleSheet.create({
  listItem: {
    borderLeftWidth: 8,
    paddingVertical: 15,
  },
  warningCondition: {
    borderColor: '#e16e2f',
  },
  stuckCondition: {
    borderColor: '#be3843',
  },
  homeCondition: {
    borderColor: '#3377ab',
  },
  cleaningCondition: {
    borderColor: '#3ca063',
  },
  offlineCondition: {
    borderColor: theme.lightColors?.formBorder,
  },
  buttonView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
  },
  planNameText: {
    fontWeight: '400',
    fontSize: 13,
  },
  noteText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyList: {
    alignItems: 'center',
    marginTop: 150,
  },
});
