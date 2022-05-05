import React, {useState} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
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
import FastImage from 'react-native-fast-image';
import babuHisaabLogo from '../../../assets/images/babuHisaabLogo.png';

const Login = props => {
  const height = useSelector(state => state.HeightReducer);
  const {collections, async, snackbarType} = constants;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const Signin = () => {
    const validation = isFormValid(email.trim(), password.trim());
    if (!validation.status) {
      showSnackbar(validation.errMsg, snackbarType.SNACKBAR_ERROR);
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then(async ({user}) => {
          const userInfo = await firestore()
            .collection(collections.USERS_INFO)
            .doc(user.uid)
            .get();
          if (userInfo.exists) {
            try {
              await AsyncStorage.setItem(
                async.user,
                JSON.stringify(userInfo.data()),
              );
              props.setUserInfoAction(userInfo.data());
            } catch (e) {
              showSnackbar(
                'error in user info contact admin',
                snackbarType.SNACKBAR_ERROR,
              );
            }
          }
        })
        .catch(err => {
          console.log(err);
          showSnackbar(
            'invalid email or password',
            snackbarType.SNACKBAR_ERROR,
          );
          setLoading(false);
        });
    }
  };

  const changePassword = text => setPassword(text);
  const changeEmail = text => setEmail(text);

  return (
    <WrapperScreen>
      <View style={styles(height).container}>
        <FastImage
          source={babuHisaabLogo}
          resizeMode="cover"
          style={styles(height).logo}
        />
        <Input
          placeholder="Email"
          style={styles(height).input}
          onChangeText={changeEmail}
        />
        <Input
          placeholder="Password"
          style={{...styles(height).input, marginTop: height * 0.025}}
          onChangeText={changePassword}
          secureTextEntry
        />
        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={Signin}
          labelStyle={{fontWeight: 'bold'}}
          style={{
            ...styles(height).button,
            backgroundColor: loading ? 'rgba(0,0,0,0.12)' : 'green',
          }}>
          {!loading && 'Login'}
        </Button>
      </View>
    </WrapperScreen>
  );
};

export default connect(null, {setUserInfoAction})(Login);
