import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {width} from '../../components';

const PasswordUpdated = ({isVisible = false, onBackdropPress = () => {}}) => {
  const height = useSelector(state => state.HeightReducer);
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles(height).wrapper}>
        <Text style={styles(height).heading}>
          PASSWORD UPDATED{'\n'}SUCCESSFULLY!
        </Text>
      </View>
    </Modal>
  );
};

const styles = height =>
  StyleSheet.create({
    heading: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 25,
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

export default PasswordUpdated;
