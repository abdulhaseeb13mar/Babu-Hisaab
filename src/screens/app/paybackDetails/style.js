import {StyleSheet} from 'react-native';
import {width} from '../../../components';
import color from '../../../theme/color';

const styles = height =>
  StyleSheet.create({
    instruction: {
      textAlign: 'center',
      fontSize: 20,
      marginTop: height * 0.02,
      color: color.darkGray,
    },
    checkBoxConatiner: {
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: width * 0.05,
      marginTop: height * 0.02,
    },
    checBoxText: {color: 'black', fontSize: 15},
    contentContainerStyle: {alignItems: 'center'},
    zeroState: {marginTop: 30, fontSize: 18, color: 'black'},
  });

export default styles;
