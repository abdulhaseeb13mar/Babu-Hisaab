import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const screenHorizontalPadding = width * 0.05;

export {width, height, screenHorizontalPadding};
