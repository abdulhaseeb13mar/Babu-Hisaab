import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import {width} from './index';
import {useSelector} from 'react-redux';
import constants from '../theme/constants';

const DuesPaidCard = ({info}) => {
  const {allUsers} = useSelector(state => state.AppReducer);
  const height = useSelector(state => state.HeightReducer);
  const friendInfo = allUsers.filter(
    eachUser => eachUser.id === info.friendId,
  )[0];
  const date = new Date(parseInt(info.date));

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        marginVertical: height * 0.02,
      }}>
      <Avatar.Image
        source={{
          uri: friendInfo.photo,
        }}
        size={50}
        style={{elevation: 4}}
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
          {friendInfo.name} has paid back!
        </Text>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          Amount: Rs {info.total}
        </Text>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          Date:{' '}
          {`${date.getDate()} ${
            constants.months[date.getMonth()]
          } ${date.getFullYear()}`}
        </Text>
        <Text style={{color: 'rgb(137,137,137)', marginTop: height * 0.015}}>
          tap to see details and confirm
        </Text>
      </View>
    </View>
  );
};

export default DuesPaidCard;
