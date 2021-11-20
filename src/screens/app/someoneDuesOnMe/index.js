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
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});
  const [selectedTotal, setSelectedTotal] = useState(0);

  const friendInfo = props.route.params;
  const {collections} = constants;

  const [duesList, setDuesList] = useState([]);

  const duesToBeClearRef = firestore()
    .collection(collections.DUES_TO_BE_CLEAR)
    .doc(user.id);

  const friendDuesOnMeRef = firestore()
    .collection(collections.DUES_ON_ME)
    .doc(user.id);

  const fetchThisPersonDuesOnMe = async () => {
    setLoading(true);
    let total = 0;
    await firestore()
      .collection(collections.DUES_ON_ME)
      .doc(user.id)
      .get()
      .then(snapshot => {
        if (!snapshot.exists) {
          setTotalDue(total);
          return setDuesList([]);
        }
        const response = snapshot.data();
        if (!response[friendInfo.id]) {
          setTotalDue(total);
          return setDuesList([]);
        } else {
          response[friendInfo.id].map(
            due => (total = total + parseInt(due.amount)),
          );
          setTotalDue(total);
          return setDuesList([...response[friendInfo.id]]);
        }
      });
    setLoading(false);
  };

  const handleOnPress = (dueInfo, pressType) => {
    if (
      pressType === 'singlePress' &&
      Object.keys(selectedCards).length === 0
    ) {
      return;
    } else {
      let copy = {...selectedCards};
      if (selectedCards[dueInfo.index]) {
        setSelectedTotal(selectedTotal - parseInt(dueInfo.amount));
        delete copy[dueInfo.index];
      } else {
        setSelectedTotal(selectedTotal + parseInt(dueInfo.amount));
        copy[dueInfo.index] = dueInfo;
      }
      setSelectedCards(copy);
    }
  };

  const markAsPaid = async () => {
    setBtnLoading(true);
    const selectedDuesArray = [...Object.values(selectedCards)];
    await duesToBeClearRef
      .get()
      .then(async snapshot => {
        const dataToAdd = {
          date: Date.now().toString(),
          total: selectedTotal,
          dueList: selectedDuesArray,
        };
        if (!snapshot.exists) {
          return await duesToBeClearRef.set({
            [friendInfo.id]: [dataToAdd],
          });
        } else {
          const data = snapshot.data();
          if (!data[friendInfo.id]) {
            return await duesToBeClearRef.update({
              [friendInfo.id]: [dataToAdd],
            });
          } else {
            return await duesToBeClearRef.update({
              [friendInfo.id]: firestore.FieldValue.arrayUnion(dataToAdd),
            });
          }
        }
      })
      .then(async () => {
        await friendDuesOnMeRef.get().then(async snapshot => {
          const friendDuesOnMe = snapshot.data()[friendInfo.id];
          const filteredDues = friendDuesOnMe.filter(due => {
            for (let i = 0; i < selectedDuesArray.length; i++) {
              if (selectedDuesArray[i].date === due.date) {
                return false;
              }
            }
            return true;
          });
          await friendDuesOnMeRef
            .update({
              [friendInfo.id]:
                filteredDues.length > 0
                  ? filteredDues
                  : firestore.FieldValue.delete(),
            })
            .then(() => {
              setSelectedCards({});
              setSelectedTotal(0);
              fetchThisPersonDuesOnMe();
            });
        });
      })
      .catch(e => console.log(e));
    setBtnLoading(false);
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
            renderItem={({item, index}) => (
              <DueCard
                index={index}
                dueInfo={item}
                duesOnMe={true}
                friendInfo={friendInfo}
                onPress={handleOnPress}
                onLongPress={handleOnPress}
                isSelected={selectedCards[index] ? true : false}
              />
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
            {selectedTotal > 0 ? 'Selected Total' : 'TOTAL'}
          </Text>
          <Text
            style={{
              color: selectedTotal > 0 ? 'green' : 'black',
              fontSize: 26,
              fontWeight: 'bold',
            }}>
            {selectedTotal > 0 ? selectedTotal : totalDue}
          </Text>
        </View>
        <Button
          mode="contained"
          disabled={Object.keys(selectedCards).length === 0 || btnLoading}
          loading={btnLoading}
          onPress={markAsPaid}
          style={{borderRadius: 10, marginTop: height * 0.02}}>
          {btnLoading ? '' : 'Mark as Paid'}
        </Button>
      </View>
    </WrapperScreen>
  );
};

export default SomeoneDueOnMe;
