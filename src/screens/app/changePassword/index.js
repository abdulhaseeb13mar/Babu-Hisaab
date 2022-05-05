import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {WrapperScreen} from '../../../components';
import {useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import {useNavigation} from '@react-navigation/core';
import Header from '../../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showSnackbar} from '../../../utils/snackbar';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {PasswordUpdated} from '../../../components/modals';

const ResetPassword = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const {snackbarType} = constants;

  const resetPassword = async () => {
    setLoading(true);
    await auth()
      .sendPasswordResetEmail(user.email)
      .then(() => {
        setSuccessModal(true);
      })
      .catch(err =>
        showSnackbar('could not send reset email', snackbarType.SNACKBAR_ERROR),
      );
    setLoading(false);
  };

  return (
    <WrapperScreen>
      <Header
        Title="Reset Password"
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
        <Text style={{textAlign: 'center', fontSize: 16}}>
          A reset password email will be sent to{'\n'}
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.email}</Text>
        </Text>
        <Text style={{textAlign: 'center', marginTop: 10, fontSize: 16}}>
          please follow the link in the mail to reset password
        </Text>
        <Button
          mode="contained"
          onPress={resetPassword}
          style={{
            backgroundColor: loading ? 'rgba(0,0,0,0.12)' : 'green',
            width: '70%',
            marginTop: 20,
          }}
          loading={loading}
          disabled={loading}>
          {!loading && 'Send Reset Password Email'}
        </Button>
      </View>
      <PasswordUpdated
        isVisible={successModal}
        onBackdropPress={() => setSuccessModal(false)}
      />
    </WrapperScreen>
  );
};

export default ResetPassword;
