import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {isFormValid} from './validation';
import {WrapperScreen} from '../../../components';
import Input from '../../../components/Input';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useSelector} from 'react-redux';
import {setUserInfoAction} from '../../../redux/actions';
import {constants} from '../../../theme';
import {Button} from 'react-native-paper';
import {showSnackbar} from '../../../utils/snackbar';

const Login = props => {
  const height = useSelector(state => state.HeightReducer);
  const {collections, async, snackbarType} = constants;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const authRef = firestore().collection(collections.AUTH).doc('auth');

  const Signin = async () => {
    const validation = isFormValid(email, password);
    if (!validation.status) {
      showSnackbar(validation.errMsg, snackbarType.SNACKBAR_ERROR);
    } else {
      setLoading(true);
      const doc = await authRef.get();
      if (!doc.exists) {
        setLoading(false);
        return showSnackbar('Error Logging In', snackbarType.SNACKBAR_ERROR);
      }
      const data = doc.data();
      if (data[email.trim().toLowerCase()] === undefined) {
        setLoading(false);
        return showSnackbar('Invalid email', snackbarType.SNACKBAR_ERROR);
      }
      if (data[email] !== password.trim()) {
        setLoading(false);
        return showSnackbar('Invalid password', snackbarType.SNACKBAR_ERROR);
      }

      const userInfo = await firestore()
        .collection(collections.USERS_INFO)
        .where('email', '==', email.trim().toLowerCase())
        .get();

      if (userInfo.empty) {
        setLoading(false);
        return showSnackbar(
          'No Such User in Database',
          snackbarType.SNACKBAR_ERROR,
        );
      }
      const userData = userInfo.docs[0].data();
      console.log('userInfo', userInfo.docs[0].data());
      try {
        await AsyncStorage.setItem(async.user, JSON.stringify(userData));
        props.setUserInfoAction(userData);
      } catch (e) {
        showSnackbar(
          'error setting user info to local storage contact admin',
          snackbarType.SNACKBAR_ERROR,
        );
      }
    }
  };

  const changePassword = text => setPassword(text);
  const changeEmail = text => setEmail(text);

  return (
    <WrapperScreen>
      <View style={styles.container}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: height * 0.1,
          }}>
          BABU HISAAB
        </Text>
        <Input
          placeholder="Email"
          style={styles.input}
          onChangeText={changeEmail}
        />
        <Input
          placeholder="Password"
          style={{...styles.input, marginTop: height * 0.025}}
          onChangeText={changePassword}
          secureTextEntry
        />
      </View>
      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={Signin}
        style={{
          backgroundColor: loading ? 'rgba(0,0,0,0.12)' : 'green',
        }}>
        {!loading && 'Login'}
      </Button>
    </WrapperScreen>
  );
};

export default connect(null, {setUserInfoAction})(Login);
