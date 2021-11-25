import React from 'react';
import {View, Text} from 'react-native';
import {WrapperScreen, SettingTile} from '../../../components';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import constants from '../../../theme/constants';
import Header from '../../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

const ProfileSettings = () => {
  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  const navigation = useNavigation();
  return (
    <WrapperScreen>
      <Header
        Title="Profile"
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <View style={styles(height).mainContainer}>
        <View style={styles(height).avatarBox}>
          <Avatar.Image
            source={{uri: user.photo}}
            size={85}
            style={styles(height).avatar}
          />
        </View>
        <Text style={styles(height).userName}>{user.name}</Text>
        <View style={styles(height).SettingTileBox}>
          <SettingTile
            name="Change Password"
            onPress={() =>
              navigation.navigate(constants.appScreens.ChangePassword)
            }
          />
        </View>
      </View>
    </WrapperScreen>
  );
};

export default ProfileSettings;
