import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../../theme/constants';

const Home = () => {
  const test = async () => {
    const info = await AsyncStorage.getItem(constants.async.user);
    console.log('user: ', JSON.parse(info));
  };
  return (
    <View>
      <Text style={{color: 'black'}}>helloooo HOME</Text>
      <Button title="hit" onPress={test} />
    </View>
  );
};

export default Home;
