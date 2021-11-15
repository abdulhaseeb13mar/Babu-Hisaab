import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {width} from '../../components';

const DuesAdded = ({
  isVisible = false,
  onBackdropPress = () => {},
  selectedUsers = [],
  amount = '0',
}) => {
  const height = useSelector(state => state.HeightReducer);
  const prepareNames = () => {
    const NamesArray = Object.keys(selectedUsers).map(
      id => selectedUsers[id].name,
    );
    let names = '';
    NamesArray.map(name => {
      names = names + ` ${name}` + ',';
    });
    return names;
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          paddingHorizontal: width * 0.05,
          paddingVertical: height * 0.02,
        }}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          DUES ADDED SUCCESSFULLY
        </Text>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 17,
            marginTop: height * 0.02,
          }}>
          {`RS ${amount} has been added to the following Babusoftians:`}
        </Text>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 17,
            marginTop: height * 0.02,
          }}>
          {Object.keys(selectedUsers).length > 0 && prepareNames()}
        </Text>
      </View>
    </Modal>
  );
};

export default DuesAdded;
