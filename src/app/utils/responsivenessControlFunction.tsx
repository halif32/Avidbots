import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const verticalResponsive = (pixels: any) => {
	return hp(pixels / 8);
};
export const horizontalResponsive = (pixels: any) => {
	return wp(pixels / 4);
};
