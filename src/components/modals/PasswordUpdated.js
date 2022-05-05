import React from 'react';
import {Button} from 'react-native-paper';
import {View, Text, StyleSheet, Linking} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {width} from '../../components';

const PasswordUpdated = ({isVisible = false, onBackdropPress = () => {}}) => {
  const height = useSelector(state => state.HeightReducer);
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={styles(height).wrapper}>
        <Text style={styles(height).heading}>
          RESET PASSWORD MAIL SENT{'\n'}SUCCESSFULLY!
        </Text>
        <Button
          mode="contained"
          onPress={() => Linking.openURL('mailto:support@example.com')}
          style={{
            width: '70%',
            marginTop: 20,
          }}>
          open Email app
        </Button>
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
      alignItems: 'center',
    },
  });

export default PasswordUpdated;
