import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {width} from './index';
import {useSelector} from 'react-redux';
import constants from '../theme/constants';

const DuesPaidCard = ({info, onPress = () => {}}) => {
  const {allUsers} = useSelector(state => state.AppReducer);
  const height = useSelector(state => state.HeightReducer);
  const friendInfo = allUsers.filter(
    eachUser => eachUser.id === info.friendId,
  )[0];
  const date = new Date(parseInt(info.date));

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(friendInfo)}
      style={styles(height).mainContainer}>
      <Avatar.Image
        source={{
          uri: friendInfo.photo,
        }}
        size={50}
        style={styles(height).avatar}
      />
      <View style={styles(height).detailsBox}>
        <Text style={styles(height).heading}>
          {friendInfo.name} has paid back!
        </Text>
        <Text style={styles(height).amount}>Amount: Rs {info.total}</Text>
        <Text style={styles(height).date}>
          Date:{' '}
          {`${date.getDate()} ${
            constants.months[date.getMonth()]
          } ${date.getFullYear()}`}
        </Text>
        <Text style={styles(height).instruction}>
          tap to see details and confirm
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = height =>
  StyleSheet.create({
    instruction: {color: 'rgb(137,137,137)', marginTop: height * 0.015},
    date: {color: 'black', fontWeight: 'bold'},
    amount: {color: 'black', fontWeight: 'bold'},
    heading: {color: 'black', fontSize: 18, fontWeight: 'bold'},
    detailsBox: {
      backgroundColor: 'white',
      borderRadius: 15,
      elevation: 4,
      borderWidth: 1,
      borderColor: '#bcbcbc',
      flex: 1,
      marginLeft: width * 0.04,
      paddingLeft: width * 0.04,
      paddingVertical: height * 0.01,
    },
    avatar: {elevation: 4},
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.05,
      marginVertical: height * 0.02,
    },
  });

export default DuesPaidCard;
