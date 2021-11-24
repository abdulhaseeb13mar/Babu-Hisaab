import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {width} from './index';
import {color, constants} from '../theme';

const DueCard = ({
  dueInfo,
  duesOnMe,
  friendInfo,
  onPress = () => {},
  onLongPress = () => {},
  index,
  isSelected = false,
}) => {
  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);

  const date = new Date(parseInt(dueInfo.date));

  return (
    <TouchableOpacity
      onPress={() => onPress({...dueInfo, index}, 'singlePress')}
      onLongPress={() => onLongPress({...dueInfo, index}, 'longPress')}
      delayLongPress={200}
      activeOpacity={0.9}
      style={{
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.015,
        elevation: 3,
        marginVertical: height * 0.02,
        borderWidth: 2.5,
        borderColor: isSelected ? 'green' : 'transparent',
      }}>
      <View style={{flex: 1, borderColor: 'red'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
            {duesOnMe
              ? `You owe ${friendInfo.name}`
              : `${friendInfo.name} owes you`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar.Image
              source={{uri: duesOnMe ? friendInfo.photo : user.photo}}
              style={{backgroundColor: 'white', elevation: 3}}
              size={(width / height) * 50}
            />
            <FontAwesome5Icon
              name={`arrow-circle-right`}
              size={(width / height) * 30}
              style={{marginHorizontal: width * 0.02}}
              color={'green'}
            />
            <Avatar.Image
              source={{uri: duesOnMe ? user.photo : friendInfo.photo}}
              style={{backgroundColor: 'white', elevation: 3}}
              size={(width / height) * 50}
            />
          </View>
        </View>
        <Text style={{color: color.darkGray, fontSize: 12, fontWeight: 'bold'}}>
          {`${date.getDate()} ${
            constants.months[date.getMonth()]
          } ${date.getFullYear()}`}
        </Text>
        <Text style={{color: 'black', fontSize: 15, marginTop: height * 0.01}}>
          {dueInfo.description}
        </Text>
      </View>
      <View style={{marginLeft: width * 0.08}}>
        <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
          {dueInfo.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DueCard;
