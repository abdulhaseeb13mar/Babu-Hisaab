import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {WrapperScreen, width, DueCard} from '../../../components';
import {useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native-paper';

const MyDuesOnSomeone = props => {
  useEffect(() => {
    fetchMyDuesOnThisPerson();
  }, []);
  const user = useSelector(state => state.userReducer);
  const height = useSelector(state => state.HeightReducer);
  const [totalDue, setTotalDue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});

  const friendInfo = props.route.params;
  const {collections} = constants;

  const [duesList, setDuesList] = useState([]);

  const duesOnOtherRef = firestore()
    .collection(collections.DUES_ON_OTHER)
    .doc(user.id);

  const duesOnMeRef = firestore()
    .collection(collections.DUES_ON_ME)
    .doc(friendInfo.id);

  const fetchMyDuesOnThisPerson = async () => {
    setLoading(true);
    await duesOnOtherRef.get().then(snapshot => {
      let total = 0;
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
        delete copy[dueInfo.index];
      } else {
        copy[dueInfo.index] = dueInfo;
      }
      setSelectedCards(copy);
    }
  };

  const removeDues = async () => {
    setBtnLoading(true);
    const selectedDuesArray = [...Object.values(selectedCards)];
    await firestore()
      .runTransaction(transaction => {
        return transaction.get(duesOnOtherRef).then(async snapshot => {
          const myDuesOnThisFriend = snapshot.data()[friendInfo.id];
          const filteredDues = myDuesOnThisFriend.filter(due => {
            for (let i = 0; i < selectedDuesArray.length; i++) {
              if (selectedDuesArray[i].date === due.date) {
                return false;
              }
            }
            return true;
          });
          await transaction.update(duesOnOtherRef, {
            [friendInfo.id]:
              filteredDues.length > 0
                ? filteredDues
                : firestore.FieldValue.delete(),
          });

          await transaction.update(duesOnMeRef, {
            [user.id]:
              filteredDues.length > 0
                ? filteredDues
                : firestore.FieldValue.delete(),
          });
        });
      })
      .then(() => {
        setSelectedCards({});
        setBtnLoading(false);
        fetchMyDuesOnThisPerson();
      })
      .catch(e => console.log(e));
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
            renderItem={({item, index}) => (
              <DueCard
                index={index}
                dueInfo={item}
                duesOnMe={false}
                friendInfo={friendInfo}
                onPress={handleOnPress}
                onLongPress={handleOnPress}
                isSelected={selectedCards[index] ? true : false}
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
          onPress={removeDues}
          loading={btnLoading}
          disabled={Object.keys(selectedCards).length === 0 || btnLoading}
          style={{
            borderRadius: 10,
            marginTop: height * 0.02,
          }}
          labelStyle={{fontWeight: 'bold'}}>
          {btnLoading ? '' : 'Remove Due'}
        </Button>
      </View>
    </WrapperScreen>
  );
};

export default MyDuesOnSomeone;
