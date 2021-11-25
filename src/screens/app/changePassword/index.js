import React, {useState} from 'react';
import {View} from 'react-native';
import {WrapperScreen} from '../../../components';
import {useSelector} from 'react-redux';
import constants from '../../../theme/constants';
import {useNavigation} from '@react-navigation/core';
import Header from '../../../components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Input from '../../../components/Input';
import {showSnackbar} from '../../../utils/snackbar';
import {Button} from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import {PasswordUpdated} from '../../../components/modals';

const ChangePassword = () => {
  const navigation = useNavigation();
  const height = useSelector(state => state.HeightReducer);
  const user = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const {snackbarType} = constants;
  const changePassword = async () => {
    if (oldPassword === '') {
      return showSnackbar('enter old password', snackbarType.SNACKBAR_ERROR);
    }
    if (newPassword === '') {
      return showSnackbar('enter new password', snackbarType.SNACKBAR_ERROR);
    }
    setLoading(true);
    const currentUser = await firebase.auth().currentUser;
    const cred = await firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword,
    );
    await currentUser
      .reauthenticateWithCredential(cred)
      .then(() => {
        currentUser
          .updatePassword(newPassword)
          .then(() => {
            setSuccessModal(true);
          })
          .catch(e => {
            showSnackbar(
              'could not update password',
              snackbarType.SNACKBAR_ERROR,
            );
          });
      })
      .catch(e => {
        showSnackbar(
          'could not authenticate user',
          snackbarType.SNACKBAR_ERROR,
        );
      });
    setOldPassword('');
    setNewPassword('');
    setLoading(false);
  };

  return (
    <WrapperScreen>
      <Header
        Title="Change Password"
        leftIconName="arrow-left"
        leftIcon={FontAwesome5}
        leftIconAction={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        <Input
          value={oldPassword}
          placeholder="Enter old password"
          style={{marginTop: height * 0.08}}
          onChangeText={e => setOldPassword(e)}
          secureTextEntry
        />
        <Input
          value={newPassword}
          placeholder="Enter new password"
          style={{marginTop: height * 0.03}}
          onChangeText={e => setNewPassword(e)}
          secureTextEntry
        />
      </View>
      <Button
        mode="contained"
        onPress={changePassword}
        style={{
          backgroundColor: loading ? 'rgba(0,0,0,0.12)' : 'green',
        }}
        loading={loading}
        disabled={loading}>
        {!loading && 'change password'}
      </Button>
      <PasswordUpdated
        isVisible={successModal}
        onBackdropPress={() => setSuccessModal(false)}
      />
    </WrapperScreen>
  );
};

export default ChangePassword;
