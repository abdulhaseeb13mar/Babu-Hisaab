import {StyleSheet} from 'react-native';
import {width} from '../../../components';

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
  });

export default styles;
