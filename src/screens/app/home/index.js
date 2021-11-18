import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import constants from '../../../theme/constants';
import firestore from '@react-native-firebase/firestore';
import {WrapperScreen, UserTile} from '../../../components';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {collections, actionTypes, appScreens} = constants;

  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  const {allUsers} = useSelector(state => state.AppReducer);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await firestore()
      .collection(collections.USERS_INFO)
      .get()
      .then(collection => {
        const allUsers = collection.docs
          .map(doc => doc.data())
          .filter(thisUser => thisUser.id !== user.id);
        dispatch({
          type: actionTypes.SET_ALL_USERS,
          payload: {allUsers},
        });
      })
      .catch(e => console.log(e));
  };

  const GotoAddDues = () => navigation.navigate(appScreens.AddDues);
  const GoToAllDues = () => navigation.navigate(appScreens.AllDues);

  const GoToDueSelection = selectedUser => {
    dispatch({
      type: actionTypes.SET_SELECTED_USER,
      payload: {selectedUser},
    });
    navigation.navigate(appScreens.DueSelection);
  };

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          BABUSOFTIANS
        </Text>
        {allUsers.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <View style={styles(height).listContainer}>
            <Button
              mode="contained"
              onPress={GotoAddDues}
              style={{marginVertical: height * 0.03}}
              icon={'plus'}>
              Add Dues
            </Button>
            <Button
              mode="contained"
              onPress={GoToAllDues}
              style={{marginBottom: height * 0.02}}>
              All Dues Information
            </Button>
            <FlatList
              data={allUsers}
              renderItem={({item}) => (
                <UserTile item={item} onPress={() => GoToDueSelection(item)} />
              )}
              horizontal={false}
              numColumns={2}
              style={styles(height).flatlistStyle}
            />
          </View>
        )}
      </View>
    </WrapperScreen>
  );
};

export default Home;
