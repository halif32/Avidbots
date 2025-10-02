import { View } from 'react-native';
import { Loader } from './Loader/Loader';
import { globalStyles } from 'styles';

export const ListFooterLoader = () => {
  return (
    <View style={[globalStyles.marginVer10]}>
      <Loader />
    </View>
  );
};
