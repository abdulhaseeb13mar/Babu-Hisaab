import React, {useState} from 'react';
import {View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/core';
import {Button} from 'react-native-paper';
import {WrapperScreen, UserTile} from '../../../components';
import {useSelector} from 'react-redux';
import {color, constants} from '../../../theme';
import firestore from '@react-native-firebase/firestore';
import {DuesAdded} from '../../../components/modals';
import Header from '../../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showSnackbar} from '../../../utils/snackbar';

const AddDues = () => {
  const height = useSelector(state => state.HeightReducer);
  const {allUsers} = useSelector(state => state.AppReducer);
  const user = useSelector(state => state.userReducer);

  const navigation = useNavigation();

  const {collections, snackbarType} = constants;

  const UserRef = firestore()
    .collection(collections.DUES_ON_OTHER)
    .doc(user.id);

  const [selectedUsers, setSelectedUsers] = useState({});
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [addedModal, setAddedModal] = useState(false);

  const handleCardPress = item => {
    let updatedSelection = {...selectedUsers};
    if (selectedUsers[item.id]) {
      delete updatedSelection[item.id];
    } else {
      updatedSelection[item.id] = {...item};
    }
    setSelectedUsers(updatedSelection);
  };

  const addDues = async () => {
    if (amount === '') {
      return showSnackbar('Enter amount', snackbarType.SNACKBAR_ERROR);
    }
    if (description === '') {
      return showSnackbar('Enter description', snackbarType.SNACKBAR_ERROR);
    }
    if (Object.keys(selectedUsers).length === 0) {
      return showSnackbar('Select Babusoftians', snackbarType.SNACKBAR_ERROR);
    }
    setLoading(true);
    const usersSelected = Object.keys(selectedUsers);
    let dataTobeUpdated = {};
    const date = Date.now().toString();
    await firestore()
      .runTransaction(transaction => {
        return transaction.get(UserRef).then(snapshot => {
          if (!snapshot.exists) {
            usersSelected.map(id => {
              dataTobeUpdated[id] = [
                {
                  amount,
                  description,
                  date,
                },
              ];
            });
            transaction.set(UserRef, dataTobeUpdated);
          } else {
            let copyData = {...snapshot.data()};
            usersSelected.map(id => {
              if (copyData[id]) {
                let copyArray = [...copyData[id]];
                copyArray.push({amount, description, date});
                copyData[id] = copyArray;
              } else {
                copyData[id] = [{amount, description, date}];
              }
            });
            transaction.set(UserRef, copyData);
          }
          return Promise.resolve(true);
        });
      })
      .then(async () => {
        return await firestore()
          .runTransaction(async transaction => {
            for (let i = 0; i < usersSelected.length; i++) {
              const userId = usersSelected[i];
              const userRef = firestore()
                .collection(collections.DUES_ON_ME)
                .doc(userId);
              await transaction.get(userRef).then(snapshot => {
                if (!snapshot.exists) {
                  transaction.set(userRef, {
                    [user.id]: [{amount, description, date}],
                  });
                } else {
                  let copyData = {...snapshot.data()};
                  if (copyData[user.id]) {
                    let copyArray = [...copyData[user.id]];
                    copyArray.push({amount, description, date});
                    copyData[user.id] = copyArray;
                  } else {
                    copyData[user.id] = [{amount, description, date}];
                  }
                  transaction.set(userRef, copyData);
                }
              });
            }
            return Promise.resolve(true);
          })
          .then(() => {
            setAddedModal(true);
            setLoading(false);
          })
          .catch(err => {
            showSnackbar(
              'error adding user dues. try again or contact admin',
              snackbarType.SNACKBAR_ERROR,
            );
            setLoading(false);
          });
      })
      .catch(err => {
        showSnackbar(
          'error adding user dues. try again or contact admin',
          snackbarType.SNACKBAR_ERROR,
        );
        setLoading(false);
      });
  };

  const clearFields = () => {
    setAmount('');
    setDescription('');
    setSelectedUsers({});
    setAddedModal(false);
  };

  return (
    <WrapperScreen>
      <Header
        Title="Add Dues"
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <View style={styles(height).mainContainer}>
        <View>
          <TextInput
            placeholder="Enter Amount"
            style={styles(height).amountInput}
            keyboardType="decimal-pad"
            placeholderTextColor={color.lightGrey3}
            onChangeText={t => setAmount(t)}
            value={amount}
          />
          <TextInput
            placeholder="Enter Description"
            style={styles(height).descriptionInput}
            placeholderTextColor={color.lightGrey3}
            onChangeText={t => setDescription(t)}
            value={description}
          />
          <View style={styles(height).listContainer}>
            <FlatList
              data={allUsers}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles(height).userTileOuterBox}
                  onPress={() => handleCardPress(item)}>
                  <UserTile
                    item={item}
                    onPress={() => handleCardPress(item)}
                    style={{width: '100%'}}
                    imageStyle={{
                      ...styles(height).imageStyle,
                      borderWidth: selectedUsers[item.id] ? 2 : 0,
                    }}
                    isSelected={selectedUsers[item.id] ? true : false}
                  />
                </TouchableOpacity>
              )}
              horizontal={false}
              numColumns={2}
              style={styles(height).flatlistStyle}
              contentContainerStyle={styles(height).contentContainerStyle}
            />
          </View>
        </View>
        <Button
          onPress={addDues}
          loading={loading}
          disabled={loading}
          mode="contained"
          style={{
            ...styles(height).btnStyle,
            backgroundColor: loading ? 'rgba(0,0,0,0.12)' : 'green',
          }}>
          {loading ? '' : 'ADD DUES'}
        </Button>
      </View>
      <DuesAdded
        isVisible={addedModal}
        onBackdropPress={clearFields}
        selectedUsers={selectedUsers}
        amount={amount}
      />
    </WrapperScreen>
  );
};

export default AddDues;
