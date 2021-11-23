import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {WrapperScreen, width, DuesPaidCard} from '../../../components';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import constants from '../../../theme/constants';

const ConfirmDuesPaid = () => {
  const navigation = useNavigation();
  const {duesToBeClear} = useSelector(state => state.AppReducer);

  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    setDuesPaidInOrder();
  }, []);

  const setDuesPaidInOrder = () => {
    let AllDues = [];
    Object.keys(duesToBeClear).map(friendId =>
      duesToBeClear[friendId].map(eachDue =>
        AllDues.push({...eachDue, friendId}),
      ),
    );
    AllDues.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    setSortedList([...AllDues]);
  };

  useEffect(() => {
    setDuesPaidInOrder();
  }, [duesToBeClear]);

  return (
    <WrapperScreen>
      <Text
        style={{
          color: 'black',
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        CONFIRM DUES PAID
      </Text>
      {sortedList.length > 0 && (
        <FlatList
          data={sortedList}
          renderItem={({item}) => (
            <DuesPaidCard
              info={item}
              onPress={friendInfo =>
                navigation.navigate(constants.appScreens.PaybackDetails, {
                  friendInfo,
                  paybackInfo: {...item},
                })
              }
            />
          )}
        />
      )}
    </WrapperScreen>
  );
};

export default ConfirmDuesPaid;
