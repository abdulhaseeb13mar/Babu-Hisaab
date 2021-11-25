import {StyleSheet} from 'react-native';
import {width} from '../../../components';
import color from '../../../theme/color';

const styles = height =>
  StyleSheet.create({
    mainContainer: {flex: 1},
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
      backgroundColor: 'white',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: height * 0.02,
      paddingBottom: height * 0.015,
      elevation: 5,
      borderWidth: 1.5,
      borderColor: '#bcbcbc',
    },
    totalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.05,
    },
    totalText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      opacity: 0.5,
    },
    totalAmount: {fontSize: 26, fontWeight: 'bold'},
    btnLabel: {fontWeight: 'bold'},
  });

export default styles;
