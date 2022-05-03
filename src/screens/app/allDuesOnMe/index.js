import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import {constants} from '../../../theme';
import firestore from '@react-native-firebase/firestore';
import {WrapperScreen, DueCard} from '../../../components';
import {useSelector} from 'react-redux';
import {showSnackbar} from '../../../utils/snackbar';
import {useNavigation} from '@react-navigation/core';
import Header from '../../../components/Header';
import styles from '../myDuesOnSomeone/style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  sortDuesWithTimeStamp,
  makeUsersObject,
  addUserIdToEachDue,
} from '../../../utils';

const AllDuesOnMe = props => {
  useEffect(() => {
    makeUsersObject(allUsers, users => setUsersObject(users));
    getAllDues();
  }, []);

  const navigation = useNavigation();
  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  const {allUsers} = useSelector(state => state.AppReducer);
  const [loading, setLoading] = useState(false);
  const [duesOnMe, setDuesOnMe] = useState({});
  const [usersObject, setUsersObject] = useState({});
  const [totalDue, setTotalDue] = useState(0);

  const everyoneInfo = props.route.params;
  const {collections, snackbarType} = constants;
  const duesOnMeRef = firestore()
    .collection(collections.DUES_ON_ME)
    .doc(user.id);

  const getAllDues = async () => {
    setLoading(true);
    await duesOnMeRef
      .get()
      .then(snapshot => {
        if (!snapshot.exists) return setDuesOnMe([]);
        const {allDues, total} = addUserIdToEachDue(snapshot.data());
        setTotalDue(total);
        setDuesOnMe(sortDuesWithTimeStamp(allDues));
      })
      .catch(err =>
        showSnackbar(
          'error fetching dues. Try Again or contact admin',
          snackbarType.SNACKBAR_ERROR,
        ),
      );
    setLoading(false);
  };

  return (
    <WrapperScreen>
      <Header
        Title={`${everyoneInfo.name} dues on me`}
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        {loading ? (
          <View style={styles(height).loaderBox}>
            <ActivityIndicator size={40} color="green" />
          </View>
        ) : (
          <FlatList
            data={duesOnMe}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles(height).contentContainerStyle}
            renderItem={({item, index}) => (
              <DueCard
                index={index}
                dueInfo={item}
                duesOnMe
                friendInfo={usersObject[item.userId]}
                onPress={() => {}}
                onLongPress={() => {}}
                isSelected={false}
              />
            )}
            ListEmptyComponent={
              <Text style={styles(height).zeroStateText}>
                You do not have any{'\n'}dues on {everyoneInfo.name}
              </Text>
            }
          />
        )}
      </View>
      <View style={styles(height).totalBox}>
        <View style={styles(height).totalRow}>
          <Text style={styles(height).totalText}>TOTAL</Text>
          <Text style={styles(height).totalAmount}>{totalDue}</Text>
        </View>
      </View>
    </WrapperScreen>
  );
};

export default AllDuesOnMe;
