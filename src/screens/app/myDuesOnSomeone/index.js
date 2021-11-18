import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {WrapperScreen, width, DueCard} from '../../../components';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import firestore from '@react-native-firebase/firestore';

const MyDuesOnSomeone = props => {
  useEffect(() => {
    fetchThisPersonDuesOnMe();
  }, []);
  const user = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);

  const friendInfo = props.route.params;
  const {collections} = constants;

  const [duesList, setDuesList] = useState([]);

  const fetchThisPersonDuesOnMe = async () => {
    setLoading(true);
    await firestore()
      .collection(collections.DUES_ON_OTHER)
      .doc(user.id)
      .get()
      .then(snapshot => {
        if (!snapshot.exists) {
          return setDuesList([]);
        }
        const response = snapshot.data();
        if (!response[friendInfo.id]) {
          return setDuesList([]);
        } else {
          console.log(response[friendInfo.id]);
          return setDuesList([...response[friendInfo.id]]);
        }
      });
    setLoading(false);
  };

  return (
    <WrapperScreen>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          MY DUES ON{'\n'}
          {friendInfo.name.toUpperCase()}
        </Text>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={40} color="green" />
          </View>
        ) : (
          <FlatList
            data={duesList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}
            renderItem={({item}) => (
              <DueCard
                dueInfo={item}
                duesOnMe={false}
                friendInfo={friendInfo}
              />
            )}
            ListEmptyComponent={
              <Text style={{marginTop: 30, fontSize: 18, color: 'black'}}>
                You dont have any dues on {friendInfo.name}
              </Text>
            }
          />
        )}
      </View>
    </WrapperScreen>
  );
};

export default MyDuesOnSomeone;
