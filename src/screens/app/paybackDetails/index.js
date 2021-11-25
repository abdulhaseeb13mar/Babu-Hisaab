import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {DueCard, WrapperScreen} from '../../../components';
import CheckBox from '@react-native-community/checkbox';
import {Button} from 'react-native-paper';
import constants from '../../../theme/constants';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../../components/Header';
import styles from './style';

const PayBackDetails = props => {
  const height = useSelector(state => state.HeightReducer);
  const navigation = useNavigation();

  const user = useSelector(state => state.userReducer);
  const [selectedCards, setSelectedCards] = useState({});
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const {paybackInfo, friendInfo} = props.route.params;

  const {collections} = constants;
  const dueToBeClearRef = firestore()
    .collection(collections.DUES_TO_BE_CLEAR)
    .doc(user.id);
  const UserRef = firestore()
    .collection(collections.DUES_ON_OTHER)
    .doc(user.id);

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

  const selectAll = () => {
    let selectAll = {};
    if (!toggleCheckBox) {
      paybackInfo.dueList.map((item, index) => {
        selectAll[index] = {...item, index};
      });
    }
    setToggleCheckBox(!toggleCheckBox);
    setSelectedCards(selectAll);
  };

  const confirmPaid = async () => {
    setLoading(true);
    await dueToBeClearRef
      .get()
      .then(async dues => {
        const thisFriendDues = [...dues.data()[friendInfo.id]];

        const removedCurrentPaidDue = thisFriendDues.filter(
          eachdue => eachdue.date !== paybackInfo.date,
        );

        return await dueToBeClearRef
          .update({
            [friendInfo.id]: [...removedCurrentPaidDue],
          })
          .then(async () => {
            await addUnpaidDuesBack();
            setLoading(false);
            navigation.goBack();
          });
      })
      .catch(() =>
        showSnackbar(
          'unable to clear dues. try again or contact admin',
          snackbarType.SNACKBAR_ERROR,
        ),
      );
  };

  const addUnpaidDuesBack = async () => {
    let dataTobeUpdated = {};
    const selectedCardsArray = Object.values(selectedCards);
    const filterUnpaidCards = paybackInfo.dueList.filter(eachCard => {
      for (let i = 0; i < selectedCardsArray.length; i++) {
        if (eachCard.date === selectedCardsArray[i].date) {
          return false;
        }
      }
      return true;
    });
    if (filterUnpaidCards.length > 0) {
      await firestore()
        .runTransaction(transaction => {
          return transaction.get(UserRef).then(snapshot => {
            if (!snapshot.exists) {
              dataTobeUpdated = {
                [friendInfo.id]: filterUnpaidCards,
              };
              transaction.set(UserRef, dataTobeUpdated);
            } else {
              let copyData = {...snapshot.data()};
              if (copyData[friendInfo.id]) {
                let copyArray = [...copyData[friendInfo.id]];
                filterUnpaidCards.map(eachCard => copyArray.push(eachCard));
                copyData[friendInfo.id] = copyArray;
              } else {
                copyData[friendInfo.id] = [...filterUnpaidCards];
              }
              transaction.set(UserRef, copyData);
            }
            return Promise.resolve(true);
          });
        })
        .then(async () => {
          return await firestore()
            .runTransaction(async transaction => {
              const friendRef = firestore()
                .collection(collections.DUES_ON_ME)
                .doc(friendInfo.id);
              await transaction.get(friendRef).then(snapshot => {
                if (!snapshot.exists) {
                  transaction.set(friendRef, {
                    [user.id]: [...filterUnpaidCards],
                  });
                } else {
                  let copyData = {...snapshot.data()};
                  if (copyData[user.id]) {
                    let copyArray = [...copyData[user.id]];
                    filterUnpaidCards.map(eachCard => copyArray.push(eachCard));
                    copyData[user.id] = copyArray;
                  } else {
                    copyData[user.id] = [...filterUnpaidCards];
                  }
                  transaction.set(friendRef, copyData);
                }
              });
              return Promise.resolve(true);
            })
            .then(() => {
              setLoading(false);
            });
        })
        .catch(err => {
          showSnackbar(
            'unable to add unpaid dues back. try again or contact admin',
            snackbarType.SNACKBAR_ERROR,
          );
          setLoading(false);
        });
    }
  };

  return (
    <WrapperScreen>
      <Header
        Title={`Payback Details`}
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <Text style={styles(height).instruction}>
        Select the dues that have been paid
      </Text>
      <View style={styles(height).checkBoxConatiner}>
        <CheckBox
          value={toggleCheckBox}
          tintColors={{true: 'black', false: 'black'}}
          onValueChange={selectAll}
        />
        <Text style={styles(height).checBoxText}>Select All</Text>
      </View>
      <FlatList
        data={paybackInfo.dueList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(height).contentContainerStyle}
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
          <Text style={styles(height).zeroState}>
            You dont have any dues on {friendInfo.name}
          </Text>
        }
      />
      <Button
        mode="contained"
        disabled={loading}
        loading={loading}
        onPress={confirmPaid}>
        {loading ? null : 'Confirm Paid'}
      </Button>
    </WrapperScreen>
  );
};

export default PayBackDetails;
