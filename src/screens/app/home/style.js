import {StyleSheet} from 'react-native';
import {width} from '../../../components';

const styles = height =>
  StyleSheet.create({
    screenWrapper: {backgroundColor: 'white'},
    listContainer: {
      width: '100%',
      flex: 1,
      marginTop: height * 0.02,
    },
    flatlistStyle: {width: '100%'},
    mainContainer: {flex: 1},
    headerBox: {
      marginTop: height * 0.015,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.05,
    },
    notificationIcon: {
      backgroundColor: 'red',
      elevation: 3,
      position: 'absolute',
      right: 0,
    },
    headerText: {
      color: 'green',
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    avatarPhoto: {elevation: 3},
    loaderBox: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    AddDuesBtn: {
      alignSelf: 'flex-start',
      marginTop: height * 0.02,
      marginBottom: height * 0.03,
      paddingLeft: width * 0.05,
      paddingRight: width * 0.05,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      paddingVertical: height * 0.01,
      elevation: 5,
      backgroundColor: 'green',
    },
    AllDuesBtn: {
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    addDuesText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
    DuesBtnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default styles;
