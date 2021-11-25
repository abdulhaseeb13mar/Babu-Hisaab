import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {constants, color} from '../../../theme';
import firestore from '@react-native-firebase/firestore';
import {WrapperScreen, width, DueCard} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AllDues = () => {
  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  const {allUsers} = useSelector(state => state.AppReducer);

  useEffect(() => {
    getAllDues();
  }, []);

  const [duesOnOthers, setDuesOnOthers] = useState({});
  const [duesOnMe, setDuesOnMe] = useState([]);

  const {collections} = constants;

  const duesOnOthersRef = firestore().collection(collections.DUES_ON_OTHER);

  const getAllDues = async () => {
    await duesOnOthersRef
      .doc(user.id)
      .get()
      .then(snapshot => {
        if (!snapshot.exists) {
          return setDuesOnOthers([]);
        }
        const dues = {...snapshot.data()};
        setDuesOnOthers(dues);
      });
  };

  return (
    <WrapperScreen style={{paddingHorizontal: width * 0.0}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: height * 0.02,
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            flex: 1,
            alignItems: 'center',
            paddingVertical: height * 0.01,
            backgroundColor: 'white',
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            My Dues on them
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            flex: 1,
            alignItems: 'center',
            paddingVertical: height * 0.01,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Their Dues on me
          </Text>
        </TouchableOpacity>
      </View>
      {Object.keys(duesOnOthers).length > 0 && (
        <FlatList
          data={Object.keys(duesOnOthers)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={({item}) => {
            return (
              <DueCard
                item={duesOnOthers[item]}
                duesOnMe={false}
                friendInfo={allUsers[item]}
              />
            );
          }}
        />
      )}
    </WrapperScreen>
  );
};

export default AllDues;
