import React from 'react';
import {View, Text} from 'react-native';
import {WrapperScreen, SettingTile} from '../../../components';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import constants from '../../../theme/constants';
import Header from '../../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: height * 0.03,
        }}>
        <View style={{borderWidth: 3, borderColor: 'green', borderRadius: 85}}>
          <Avatar.Image
            source={{uri: user.photo}}
            size={85}
            style={{elevation: 5}}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            marginTop: height * 0.01,
          }}>
          {user.name}
        </Text>
        <View style={{marginTop: height * 0.03, width: '100%'}}>
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
