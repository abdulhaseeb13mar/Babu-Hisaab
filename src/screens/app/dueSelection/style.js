import {StyleSheet} from 'react-native';
import {width} from '../../../components';

const styles = height =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingHorizontal: width * 0.06,
    },
    mainBox: {
      width: '100%',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
      paddingVertical: height * 0.02,
      elevation: 4,
    },
    avatarsBox: {flexDirection: 'row', alignItems: 'center'},
    avatar: {backgroundColor: 'white', elevation: 5},
    arrowIcon: {marginHorizontal: width * 0.06},
    text: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: height * 0.02,
      fontSize: 20,
    },
  });

export default styles;
