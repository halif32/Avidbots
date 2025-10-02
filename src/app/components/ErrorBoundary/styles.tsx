import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme?.darkColors?.black,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 14,
    color: theme?.darkColors?.white,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 10,
    color: theme?.darkColors?.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '800',
    color: theme?.darkColors?.white,
    marginTop: 20,
    textAlign: 'center',
  },
  error: {
    color: theme?.darkColors?.white,
    marginVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  button: {
    backgroundColor: theme?.darkColors?.brandColor,
    borderRadius: 50,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: theme?.darkColors?.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
