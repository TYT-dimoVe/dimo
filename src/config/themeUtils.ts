import { PixelRatio, Platform, Dimensions } from 'react-native';

export const HEADER_TYPE = {
  NORMAL: 'NORMAL',
  MAIN: 'MAIN',
  INFO: 'INFO'
};

export const COLOR = {
  PRIMARY_BLUE: '#3CA0F7',
  PRIMARY_ORANGE: '#FF7000',
  TEXT_DEFAULT: '#000000',
  LIGHT_GRAY: '#F6F6F6',
  WHITE: '#FFFFFF',
  PLACEHOLDER: '#666666',
  DEACTIVE_GRAY: '#9B9B9B',
  GREEN: '#27AE60',
  RED: '#EB5757',
  DARK_BLUE: '#22215B',
};

const { width, height } = Dimensions.get('window');
export const DEVICE_WIDTH = height > width ? width : height;
export const DEVICE_HEIGHT = height > width ? height : width;

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 60 : 50;

export const relativeWidth = (num: number) => (DEVICE_WIDTH * num) / 100;
export const relativeHeight = (num: number) => (DEVICE_HEIGHT * num) / 100;

export const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  let adjustedWidth = width * pixelDensity;
  let adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920);
  }
};

export const responsiveFontSize = (fontSize: number) => {
  let divider = isTablet() ? 600 : 375;
  return Math.round((fontSize * DEVICE_WIDTH) / divider);
};

export const responsiveHeight = (height: number) => {
  if (!isTablet()) {
    return height;
  } else {
    return height + height * 0.25;
  }
};

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  );
}

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 667;
export const ratioW = DEVICE_WIDTH / DESIGN_WIDTH;
export const ratioH = DEVICE_HEIGHT / DESIGN_HEIGHT;
export const ratio = Math.min(ratioW, ratioH);
