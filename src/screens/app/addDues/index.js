import React, {useState} from 'react';
import {View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/core';
import {Button, Text} from 'react-native-paper';
import {WrapperScreen, UserTile} from '../../../components';
import {useSelector} from 'react-redux';
import {color, constants} from '../../../theme';
import {width} from '../../../components/Responsive';
import firestore from '@react-native-firebase/firestore';
import {DuesAdded} from '../../../components/modals';
import Header from '../../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AddDues = () => {
  const height = useSelector(state => state.HeightReducer);
  const {allUsers} = useSelector(state => state.AppReducer);
  const user = useSelector(state => state.userReducer);

  const navigation = useNavigation();

  const {collections} = constants;

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
        await firestore()
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
            setLoading(false);
            console.log(err);
          });
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
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
      <View
        style={{
          marginHorizontal: width * 0,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <TextInput
            placeholder="Enter Amount"
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: color.lightGrey1,
              backgroundColor: 'white',
              elevation: 3,
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              paddingHorizontal: width * 0.04,
              marginTop: height * 0.05,
              marginHorizontal: width * 0.05,
            }}
            keyboardType="decimal-pad"
            placeholderTextColor={color.lightGrey3}
            onChangeText={t => setAmount(t)}
            value={amount}
          />
          <TextInput
            placeholder="Enter Description"
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: color.lightGrey1,
              backgroundColor: 'white',
              elevation: 3,
              fontSize: 20,
              color: 'black',
              paddingHorizontal: width * 0.04,
              marginVertical: height * 0.03,
              marginHorizontal: width * 0.05,
            }}
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
                  style={{width: '50%', borderWidth: 0}}
                  onPress={() => handleCardPress(item)}>
                  <UserTile
                    item={item}
                    onPress={() => handleCardPress(item)}
                    style={{width: '100%'}}
                    imageStyle={{
                      borderWidth: selectedUsers[item.id] ? 2 : 0,
                      borderColor: 'green',
                    }}
                    isSelected={selectedUsers[item.id] ? true : false}
                  />
                </TouchableOpacity>
              )}
              horizontal={false}
              numColumns={2}
              style={styles(height).flatlistStyle}
              contentContainerStyle={{
                paddingTop: height * 0.015,
              }}
            />
          </View>
        </View>
        <Button
          onPress={addDues}
          loading={loading}
          disabled={loading}
          mode="contained"
          style={{
            borderColor: 'black',
            marginTop: height * 0.015,
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
