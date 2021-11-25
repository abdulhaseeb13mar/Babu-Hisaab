import React, {useEffect, useState} from 'react';
import {Text, FlatList} from 'react-native';
import {WrapperScreen, DuesPaidCard} from '../../../components';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import constants from '../../../theme/constants';
import Header from '../../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

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
      <Header
        Title="Confirm Dues Paid"
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      {sortedList.length > 0 ? (
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
      ) : (
        <Text style={styles.zeroStateText}>
          You do not have any{'\n'}dues to confirm
        </Text>
      )}
    </WrapperScreen>
  );
};

export default ConfirmDuesPaid;
