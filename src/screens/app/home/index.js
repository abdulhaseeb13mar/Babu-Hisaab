import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import constants from '../../../theme/constants';
import firestore from '@react-native-firebase/firestore';
import {WrapperScreen, UserTile, width} from '../../../components';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {collections, actionTypes, appScreens} = constants;

  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  const {allUsers, duesToBeClearLength} = useSelector(
    state => state.AppReducer,
  );

  const duesToClearRef = firestore()
    .collection(collections.DUES_TO_BE_CLEAR)
    .doc(user.id);

  useEffect(() => {
    getUsers();
    const subscriber = duesToClearRef.onSnapshot(snapshot => {
      console.log('snapshot', snapshot.data());
      let pendingDuesLength = 0;
      if (snapshot.exists) {
        Object.values(snapshot.data()).map(arr => {
          pendingDuesLength = arr.length + pendingDuesLength;
        });
        console.log(pendingDuesLength, Object.values(snapshot.data()));
        dispatch({
          type: actionTypes.SET_DUES_TO_BE_CLEAR,
          payload: {
            duesToBeClear: snapshot.data(),
          },
        });
      } else {
        dispatch({
          type: actionTypes.SET_DUES_TO_BE_CLEAR,
          payload: {
            duesToBeClear: {},
          },
        });
      }
      dispatch({
        type: actionTypes.SET_DUES_TO_BE_CLEAR_LENGTH,
        payload: {
          duesToBeClearLength: pendingDuesLength,
        },
      });
    });
    return () => subscriber();
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
  const GoToConfirmDues = () => navigation.navigate(appScreens.confirmDuesPaid);
  const GoToProfileSettings = () =>
    navigation.navigate(appScreens.ProfileSettings);

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
        <View
          style={{
            marginTop: height * 0.015,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: width * 0.05,
          }}>
          <TouchableOpacity onPress={GoToConfirmDues} activeOpacity={0.9}>
            {duesToBeClearLength > 0 && (
              <Avatar.Text
                label={duesToBeClearLength}
                color="white"
                style={{
                  backgroundColor: 'red',
                  elevation: 3,
                  position: 'absolute',
                  right: 0,
                }}
                size={17}
              />
            )}
            <Ionicons name="notifications-outline" size={35} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'green',
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              fontStyle: 'italic',
            }}>
            <Text style={{fontStyle: 'normal', color: 'black'}}>BABU</Text>{' '}
            HISAAB
          </Text>
          <TouchableOpacity onPress={GoToProfileSettings} activeOpacity={0.9}>
            <Avatar.Image
              source={{uri: user.photo}}
              size={40}
              style={{elevation: 3}}
            />
          </TouchableOpacity>
        </View>
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
            {/* <Button
              mode="contained"
              onPress={GotoAddDues}
              style={{marginVertical: height * 0.03}}
              icon={'plus'}>
              Add Dues
            </Button> */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={GotoAddDues}
              style={{
                alignSelf: 'flex-start',
                marginTop: height * 0.02,
                marginBottom: height * 0.03,
                paddingLeft: width * 0.05,
                paddingRight: width * 0.05,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                paddingVertical: height * 0.01,
                elevation: 5,
                backgroundColor: 'green',
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Add Dues
              </Text>
            </TouchableOpacity>
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
