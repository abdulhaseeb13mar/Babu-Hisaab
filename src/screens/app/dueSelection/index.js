import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {WrapperScreen, width} from '../../../components';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import {Avatar} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../../components/Header';
import styles from './style';

const DueSelection = () => {
  const navigation = useNavigation();
  const {selectedUser} = useSelector(state => state.AppReducer);
  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  return (
    <WrapperScreen>
      <Header
        Title="Due Selection"
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <View style={styles(height).mainContainer}>
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
    <TouchableOpacity onPress={onPress} style={styles(height).mainBox}>
      <View style={styles(height).avatarsBox}>
        <Avatar.Image
          source={{uri: duesOnMe ? user.photo : selectedUser.photo}}
          style={styles(height).avatar}
          size={(width / height) * 180}
        />
        <FontAwesome5
          name={`arrow-circle-right`}
          size={(width / height) * 100}
          style={styles(height).arrowIcon}
          color="green"
        />
        <Avatar.Image
          source={{uri: duesOnMe ? selectedUser.photo : user.photo}}
          style={styles(height).avatar}
          size={(width / height) * 180}
        />
      </View>
      <Text style={styles(height).text}>
        {duesOnMe
          ? `Your dues on ${selectedUser.name}`
          : `${selectedUser.name} dues on you`}
      </Text>
    </TouchableOpacity>
  );
};

export default DueSelection;
