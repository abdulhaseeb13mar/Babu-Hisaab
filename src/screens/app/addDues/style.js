import {StyleSheet} from 'react-native';

const styles = height =>
  StyleSheet.create({
    listContainer: {
      width: '100%',
      //   borderWidth: 1,
      height: height * 0.6,
      borderRadius: 10,
      backgroundColor: 'white',
      elevation: 4,
      //   paddingVertical: 10,
      //   paddingTop: height * 0.01,
      //   marginTop: height * 0.02,
    },
    flatlistStyle: {width: '100%'},
  });

export default styles;
