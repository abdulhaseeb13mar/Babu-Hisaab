import {StyleSheet} from 'react-native';

const styles = height =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: height * 0.03,
    },
    avatarBox: {borderWidth: 3, borderColor: 'green', borderRadius: 85},
    avatar: {elevation: 5},
    userName: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
      marginTop: height * 0.01,
    },
    SettingTileBox: {marginTop: height * 0.03, width: '100%'},
  });

export default styles;
