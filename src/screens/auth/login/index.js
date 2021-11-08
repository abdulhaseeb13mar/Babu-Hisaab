/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, Button, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './style';
import {color} from '../../../theme';
import {isFormValid} from './validation';
import {WrapperScreen} from '../../../components';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useSelector} from 'react-redux';
import {setUserInfoAction} from '../../../redux/actions';
import {constants} from '../../../theme';

const Login = props => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const height = useSelector(state => state.HeightReducer);

  const Signin = () => {
    const validation = isFormValid(email, password);
    if (!validation.status) {
      console.log('ara', validation);
      errorMsgHandler(validation.errCategory, validation.errMsg);
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async ({user}) => {
          const userInfo = await firestore()
            .collection(constants.collections.USERS_INFO)
            .doc(user.uid)
            .get();
          if (userInfo.exists) {
            try {
              await AsyncStorage.setItem(
                constants.async.user,
                JSON.stringify(userInfo.data()),
              );
              props.setUserInfoAction(userInfo.data());
            } catch (e) {
              console.log(e);
            }
            // setLoading(false);
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrorMsg(errMsg);
      setPasswordErrorMsg('');
    } else if (errCategory === 'password') {
      setPasswordErrorMsg(errMsg);
      setEmailErrorMsg('');
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
        <TextInput
          placeholder="Email"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changeEmail}
        />
        <Text style={{color: 'black'}}>{emailErrorMsg}</Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor={color.darkGray}
          style={styles.input}
          onChangeText={changePassword}
          secureTextEntry
        />
        <Text style={{color: 'black'}}>{passwordErrorMsg}</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={Signin} />
        )}
      </View>
    </WrapperScreen>
  );
};

export default connect(null, {setUserInfoAction})(Login);
