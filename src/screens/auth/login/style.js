import {StyleSheet} from 'react-native';
import {width} from '../../../components';

const styles = height =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,128,0,0.3)',
    },
    input: {
      borderWidth: 1,
      width: width * 0.8,
      color: 'black',
    },
    signUpTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    signupText: {
      fontWeight: 'bold',
    },
    button: {
      width: width * 0.6,
      borderRadius: 10,
      paddingVertical: 4,
      marginTop: height * 0.04,
    },
    logo: {
      width: '100%',
      aspectRatio: 460 / 384,
      borderRadius: 15,
      marginTop: -height * 0.06,
    },
  });

export default styles;
