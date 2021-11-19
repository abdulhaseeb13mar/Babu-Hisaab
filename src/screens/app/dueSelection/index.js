import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {WrapperScreen, width} from '../../../components';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import {Avatar} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DueSelection = () => {
  const navigation = useNavigation();
  const {selectedUser} = useSelector(state => state.AppReducer);
  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  return (
    <WrapperScreen>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingHorizontal: width * 0.06,
        }}>
        <DueDirectionCard
          user={user}
          selectedUser={selectedUser}
          height={height}
          duesOnMe={true}
          onPress={() =>
            navigation.navigate(
              constants.appScreens.MyDuesOnSomeone,
              selectedUser,
            )
          }
        />
        <DueDirectionCard
          user={user}
          selectedUser={selectedUser}
          height={height}
          duesOnMe={false}
          onPress={() =>
            navigation.navigate(
              constants.appScreens.SomeoneDuesOnMe,
              selectedUser,
            )
          }
        />
      </View>
    </WrapperScreen>
  );
};

const DueDirectionCard = ({height, user, selectedUser, duesOnMe, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        paddingVertical: height * 0.02,
        elevation: 4,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar.Image
          source={{uri: duesOnMe ? user.photo : selectedUser.photo}}
          style={{backgroundColor: 'white', elevation: 5}}
          size={(width / height) * 180}
        />
        <FontAwesome5
          name={`arrow-circle-right`}
          size={(width / height) * 100}
          style={{marginHorizontal: width * 0.06}}
          color="blue"
        />
        <Avatar.Image
          source={{uri: duesOnMe ? selectedUser.photo : user.photo}}
          style={{backgroundColor: 'white', elevation: 5}}
          size={(width / height) * 180}
        />
      </View>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: height * 0.02,
          fontSize: 20,
        }}>
        {duesOnMe
          ? `Your dues on ${selectedUser.name}`
          : `${selectedUser.name} dues on you`}
      </Text>
    </TouchableOpacity>
  );
};

export default DueSelection;
