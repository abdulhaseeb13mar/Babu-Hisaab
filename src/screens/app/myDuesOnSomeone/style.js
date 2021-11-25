import {StyleSheet} from 'react-native';
import {width} from '../../../components';
import color from '../../../theme/color';

const styles = height =>
  StyleSheet.create({
    loaderBox: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainerStyle: {alignItems: 'center'},
    zeroStateText: {
      marginTop: 30,
      fontSize: 18,
      color: color.lightGrey3,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    totalBox: {
      borderWidth: 1.5,
      backgroundColor: 'white',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.02,
      paddingBottom: height * 0.015,
      elevation: 5,
      borderColor: '#bcbcbc',
    },
    totalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    totalText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      opacity: 0.5,
    },
    totalAmount: {color: 'black', fontSize: 26, fontWeight: 'bold'},
    btnLabel: {fontWeight: 'bold'},
  });

export default styles;
