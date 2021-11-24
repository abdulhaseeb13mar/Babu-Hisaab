import React from 'react';
import {View, Text} from 'react-native';
import {WrapperScreen} from '../../../components';
import {useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import {useNavigation} from '@react-navigation/core';
import Header from '../../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ChangePassword = () => {
  const navigation = useNavigation();
  return (
    <WrapperScreen>
      <Header
        Title="Change Password"
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <Text>asdasd</Text>
    </WrapperScreen>
  );
};

export default ChangePassword;
