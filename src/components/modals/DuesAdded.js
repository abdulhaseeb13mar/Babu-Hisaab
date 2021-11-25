import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
      <View style={styles(height).wrapper}>
        <Text style={styles(height).heading}>
          DUES ADDED{'\n'}SUCCESSFULLY!
        </Text>
        <Text style={styles(height).subText}>
          {`RS ${amount} has been added to the following Babusoftians:`}
        </Text>
        <Text style={styles(height).names}>
          {Object.keys(selectedUsers).length > 0 && prepareNames()}
        </Text>
      </View>
    </Modal>
  );
};

const styles = height =>
  StyleSheet.create({
    names: {
      color: 'green',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 17,
      marginTop: height * 0.02,
    },
    subText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 17,
      marginTop: height * 0.02,
    },
    heading: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
    wrapper: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.02,
      borderWidth: 5,
      borderColor: 'green',
    },
  });

export default DuesAdded;
