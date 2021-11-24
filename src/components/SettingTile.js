import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {width} from './index';
import {useSelector} from 'react-redux';
import constants from '../theme/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SettingTile = ({name, onPress = () => {}}) => {
  const {allUsers} = useSelector(state => state.AppReducer);
  const height = useSelector(state => state.HeightReducer);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        marginVertical: height * 0.02,
      }}>
      <Avatar.Icon
        icon={() => <FontAwesome5 name="user-lock" size={20} color="green" />}
        size={50}
        style={{elevation: 4, backgroundColor: 'white'}}
      />
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          elevation: 4,
          borderWidth: 1,
          borderColor: '#bcbcbc',
          flex: 1,
          marginLeft: width * 0.04,
          paddingLeft: width * 0.04,
          paddingVertical: height * 0.01,
        }}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingTile;
