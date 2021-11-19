import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {WrapperScreen, width, DueCard} from '../../../components';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native-paper';

const SomeoneDueOnMe = props => {
  useEffect(() => {
    fetchThisPersonDuesOnMe();
  }, []);
  const user = useSelector(state => state.userReducer);
  const height = useSelector(state => state.HeightReducer);
  const [totalDue, setTotalDue] = useState(0);
  const [loading, setLoading] = useState(false);

  const friendInfo = props.route.params;
  const {collections} = constants;

  const [duesList, setDuesList] = useState([]);

  const fetchThisPersonDuesOnMe = async () => {
    setLoading(true);
    await firestore()
      .collection(collections.DUES_ON_ME)
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
          let total = 0;
          response[friendInfo.id].map(
            due => (total = total + parseInt(due.amount)),
          );
          setTotalDue(total);
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
          {friendInfo.name.toUpperCase()} DUES ON{'\n'}ME
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
              <DueCard dueInfo={item} duesOnMe={true} friendInfo={friendInfo} />
            )}
            ListEmptyComponent={
              <Text
                style={{
                  marginTop: 30,
                  fontSize: 18,
                  color: 'black',
                  textAlign: 'center',
                }}>
                {friendInfo.name} does not have{'\n'}any dues on you.
              </Text>
            }
          />
        )}
      </View>
      <View
        style={{
          borderWidth: 1.5,
          backgroundColor: 'white',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: width * 0.05,
          paddingVertical: height * 0.02,
          elevation: 5,
          borderColor: '#bcbcbc',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
              opacity: 0.5,
            }}>
            TOTAL
          </Text>
          <Text style={{color: 'black', fontSize: 26, fontWeight: 'bold'}}>
            {totalDue}
          </Text>
        </View>
        <Button
          mode="contained"
          style={{borderRadius: 10, marginTop: height * 0.02}}>
          Send to Paid
        </Button>
      </View>
    </WrapperScreen>
  );
};

export default SomeoneDueOnMe;