import {StyleSheet} from 'react-native';
import {width} from '../../../components';
import color from '../../../theme/color';

const styles = height =>
  StyleSheet.create({
    listContainer: {
      width: '90%',
      height: height * 0.6,
      borderRadius: 10,
      backgroundColor: 'white',
      elevation: 4,
      marginLeft: '5%',
    },
    flatlistStyle: {width: '100%'},
    mainContainer: {
      marginHorizontal: width * 0,
      flex: 1,
      justifyContent: 'space-between',
    },
    amountInput: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: color.lightGrey1,
      backgroundColor: 'white',
      elevation: 3,
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.05,
      marginHorizontal: width * 0.05,
    },
    descriptionInput: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: color.lightGrey1,
      backgroundColor: 'white',
      elevation: 3,
      fontSize: 20,
      color: 'black',
      paddingHorizontal: width * 0.04,
      marginVertical: height * 0.03,
      marginHorizontal: width * 0.05,
    },
    userTileOuterBox: {width: '50%'},
    imageStyle: {
      borderColor: 'green',
    },
    contentContainerStyle: {
      paddingTop: height * 0.015,
    },
    btnStyle: {borderColor: 'black', marginTop: height * 0.015},
  });

export default styles;
