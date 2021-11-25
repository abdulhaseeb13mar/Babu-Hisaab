import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
        ...styles(height).container,
        borderColor: isSelected ? 'green' : 'transparent',
      }}>
      <View style={styles(height).leftInnerContainer}>
        <View style={styles(height).detailsBox}>
          <Text style={styles(height).heading}>
            {duesOnMe
              ? `You owe ${friendInfo.name}`
              : `${friendInfo.name} owes you`}
          </Text>
          <View style={styles(height).avatarsBox}>
            <Avatar.Image
              source={{uri: duesOnMe ? friendInfo.photo : user.photo}}
              style={styles(height).Avatar}
              size={(width / height) * 50}
            />
            <FontAwesome5Icon
              name={`arrow-circle-right`}
              size={(width / height) * 30}
              style={styles(height).arrowIcon}
              color={'green'}
            />
            <Avatar.Image
              source={{uri: duesOnMe ? user.photo : friendInfo.photo}}
              style={styles(height).Avatar}
              size={(width / height) * 50}
            />
          </View>
        </View>
        <Text style={styles(height).date}>
          {`${date.getDate()} ${
            constants.months[date.getMonth()]
          } ${date.getFullYear()}`}
        </Text>
        <Text style={styles(height).description}>{dueInfo.description}</Text>
      </View>
      <View style={styles(height).amountBox}>
        <Text style={styles(height).amount}>{dueInfo.amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = height =>
  StyleSheet.create({
    amount: {color: 'black', fontSize: 30, fontWeight: 'bold'},
    amountBox: {marginLeft: width * 0.08},
    description: {color: 'black', fontSize: 15, marginTop: height * 0.01},
    date: {color: color.darkGray, fontSize: 12, fontWeight: 'bold'},
    arrowIcon: {marginHorizontal: width * 0.02},
    Avatar: {backgroundColor: 'white', elevation: 3},
    avatarsBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    heading: {color: 'black', fontSize: 17, fontWeight: 'bold'},
    detailsBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftInnerContainer: {flex: 1},
    container: {
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
    },
  });

export default DueCard;
