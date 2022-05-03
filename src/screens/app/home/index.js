import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import constants from '../../../theme/constants';
import firestore from '@react-native-firebase/firestore';
import {WrapperScreen, UserTile} from '../../../components';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showSnackbar} from '../../../utils/snackbar';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {collections, actionTypes, appScreens, url} = constants;

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
      let pendingDuesLength = 0;
      if (snapshot.exists) {
        Object.values(snapshot.data()).map(arr => {
          pendingDuesLength = arr.length + pendingDuesLength;
        });
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
      .catch(e =>
        showSnackbar(
          'error fetching users info. try again or contact admin',
          snackbarType.SNACKBAR_ERROR,
        ),
      );
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
    <WrapperScreen style={styles(height).screenWrapper}>
      <View style={styles(height).mainContainer}>
        <View style={styles(height).headerBox}>
          <TouchableOpacity onPress={GoToConfirmDues} activeOpacity={0.9}>
            {duesToBeClearLength > 0 && (
              <Avatar.Text
                label={duesToBeClearLength}
                color="white"
                style={styles(height).notificationIcon}
                size={17}
              />
            )}
            <Ionicons name="notifications-outline" size={35} color="black" />
          </TouchableOpacity>
          <Text style={styles(height).headerText}>
            <Text style={{fontStyle: 'normal', color: 'black'}}>BABU</Text>{' '}
            HISAAB
          </Text>
          <TouchableOpacity onPress={GoToProfileSettings} activeOpacity={0.9}>
            <Avatar.Image
              source={{uri: user.photo}}
              size={40}
              style={styles(height).avatarPhoto}
            />
          </TouchableOpacity>
        </View>
        {allUsers.length === 0 ? (
          <View style={styles(height).loaderBox}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <View style={styles(height).listContainer}>
            <View style={styles(height).DuesBtnContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={GotoAddDues}
                style={styles(height).AddDuesBtn}>
                <Text style={styles(height).addDuesText}>Add Dues</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  GoToDueSelection({name: 'everyone', photo: url.xordLogo})
                }
                style={[styles(height).AddDuesBtn, styles(height).AllDuesBtn]}>
                <Text style={styles(height).addDuesText}>All Dues</Text>
              </TouchableOpacity>
            </View>
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
