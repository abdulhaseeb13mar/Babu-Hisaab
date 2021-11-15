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

const AddDues = () => {
  const height = useSelector(state => state.HeightReducer);
  const {allUsers} = useSelector(state => state.AppReducer);
  const user = useSelector(state => state.userReducer);

  const {collections} = constants;

  const UserRef = firestore()
    .collection(collections.DUES_ON_OTHER)
    .doc(user.id);

  const [selectedUsers, setSelectedUsers] = useState({});
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

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
    await firestore()
      .runTransaction(transaction => {
        return transaction.get(UserRef).then(snapshot => {
          if (!snapshot.exists) {
            usersSelected.map(id => {
              dataTobeUpdated[id] = [
                {
                  amount,
                  description,
                },
              ];
            });
            transaction.set(UserRef, dataTobeUpdated);
          } else {
            let copyData = {...snapshot.data()};
            usersSelected.map(id => {
              if (copyData[id]) {
                let copyArray = [...copyData[id]];
                copyArray.push({amount, description});
                copyData[id] = copyArray;
              } else {
                copyData[id] = [{amount, description}];
              }
            });
            transaction.set(UserRef, copyData);
          }
          return Promise.resolve(true);
        });
      })
      .then(() => {
        setLoading(false);
        setAmount('');
        setDescription('');
        setSelectedUsers({});
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <WrapperScreen style={{marginHorizontal: width * 0.05}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: height * 0.02,
        }}>
        ADD DUES
      </Text>
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
          contentContainerStyle={{paddingTop: height * 0.015}}
        />
      </View>
      <Button
        onPress={addDues}
        loading={loading}
        mode="contained"
        style={{
          borderRadius: 10,
          borderColor: 'black',
          marginTop: height * 0.015,
        }}>
        ADD DUES
      </Button>
    </WrapperScreen>
  );
};

export default AddDues;
