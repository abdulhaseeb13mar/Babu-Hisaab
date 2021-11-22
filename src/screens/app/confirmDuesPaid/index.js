import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {WrapperScreen, width, DuesPaidCard} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';

const ConfirmDuesPaid = () => {
  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  const {allUsers, duesToBeClearLength, duesToBeClear} = useSelector(
    state => state.AppReducer,
  );

  console.log('ALL USERSSSS', allUsers);

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
    console.log('all dues===>', AllDues);
  };

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
          renderItem={({item}) => <DuesPaidCard info={item} />}
        />
      )}
    </WrapperScreen>
  );
};

export default ConfirmDuesPaid;
