import { Image } from 'react-native';
import { SectorIndicator } from './SectorIndicator';
import { globalStyles } from 'styles';
import { reportStyles } from '../../styles';
import Modal from 'react-native-modal';

interface Point {
  x: number;
  y: number;
}

interface IPointsArray {
  id: string;
  point: Point[];
}
interface ImageEnlargerProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  coverageImage: string;
  showSector: boolean;
  points: IPointsArray[];
}

export const ImageEnlarger = (props: ImageEnlargerProps) => {
  const { isModalVisible, toggleModal, coverageImage, showSector, points } = props;
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      backdropOpacity={0.9}
    >
      <Image
        source={{ uri: `data:image/png;base64,${coverageImage}` }}
        style={[reportStyles.enlargedImage, globalStyles.br8]}
        resizeMode={'stretch'}
      />
      <SectorIndicator points={points} showSector={showSector} strokeColor={'#FFA500'} />
    </Modal>
  );
};
