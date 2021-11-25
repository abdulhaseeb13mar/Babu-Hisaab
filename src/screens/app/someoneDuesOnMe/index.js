import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {WrapperScreen, DueCard} from '../../../components';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../../components/Header';
import {color} from '../../../theme';
import {showSnackbar} from '../../../utils/snackbar';
import styles from './style';

const SomeoneDueOnMe = props => {
  useEffect(() => {
    fetchThisPersonDuesOnMe();
  }, []);
  const navigation = useNavigation();
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
    .doc(friendInfo.id);

  const friendDuesOnMeRef = firestore()
    .collection(collections.DUES_ON_ME)
    .doc(user.id);

  const myDuesOnFriendRef = firestore()
    .collection(collections.DUES_ON_OTHER)
    .doc(friendInfo.id);

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
      })
      .catch(() =>
        showSnackbar(
          'error fetching user dues. Try Again or contact admin',
          snackbarType.SNACKBAR_ERROR,
        ),
      );
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
            [user.id]: [dataToAdd],
          });
        } else {
          const data = snapshot.data();
          if (!data[user.id]) {
            return await duesToBeClearRef.update({
              [user.id]: [dataToAdd],
            });
          } else {
            return await duesToBeClearRef.update({
              [user.id]: firestore.FieldValue.arrayUnion(dataToAdd),
            });
          }
        }
      })
      .then(async () => {
        return await firestore().runTransaction(transaction => {
          return transaction.get(friendDuesOnMeRef).then(async snapshot => {
            const friendDuesOnMe = snapshot.data()[friendInfo.id];
            const filteredDues = friendDuesOnMe.filter(due => {
              for (let i = 0; i < selectedDuesArray.length; i++) {
                if (selectedDuesArray[i].date === due.date) {
                  return false;
                }
              }
              return true;
            });
            await transaction.update(friendDuesOnMeRef, {
              [friendInfo.id]:
                filteredDues.length > 0
                  ? filteredDues
                  : firestore.FieldValue.delete(),
            });

            await transaction.update(myDuesOnFriendRef, {
              [user.id]:
                filteredDues.length > 0
                  ? filteredDues
                  : firestore.FieldValue.delete(),
            });
          });
        });
      })
      .then(() => {
        setSelectedCards({});
        setSelectedTotal(0);
        fetchThisPersonDuesOnMe();
      })
      .catch(e =>
        showSnackbar(
          'error marking dues as paid. Try Again or contact admin',
          snackbarType.SNACKBAR_ERROR,
        ),
      );
    setBtnLoading(false);
  };

  return (
    <WrapperScreen>
      <Header
        Title={`${friendInfo.name} Dues on me`}
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <View style={styles(height).mainContainer}>
        {loading ? (
          <View style={styles(height).loaderBox}>
            <ActivityIndicator size={40} color="green" />
          </View>
        ) : (
          <FlatList
            data={duesList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles(height).contentContainerStyle}
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
              <Text style={styles(height).zeroStateText}>
                {friendInfo.name} does not have{'\n'}any dues on you.
              </Text>
            }
          />
        )}
      </View>
      <View style={styles(height).totalBox}>
        <View style={styles(height).totalRow}>
          <Text style={styles(height).totalText}>
            {selectedTotal > 0 ? 'Selected Total' : 'TOTAL'}
          </Text>
          <Text
            style={{
              color: selectedTotal > 0 ? 'green' : 'black',
              ...styles(height).totalAmount,
            }}>
            {selectedTotal > 0 ? selectedTotal : totalDue}
          </Text>
        </View>
      </View>
      <Button
        mode="contained"
        disabled={Object.keys(selectedCards).length === 0 || btnLoading}
        loading={btnLoading}
        onPress={markAsPaid}
        style={{
          backgroundColor:
            Object.keys(selectedCards).length === 0 || btnLoading
              ? 'rgba(0,0,0,0.12)'
              : 'green',
        }}>
        {btnLoading ? '' : 'Mark as Paid'}
      </Button>
    </WrapperScreen>
  );
};

export default SomeoneDueOnMe;
