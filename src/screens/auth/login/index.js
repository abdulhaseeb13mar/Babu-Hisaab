import React, {useState} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './style';
import {isFormValid} from './validation';
import {WrapperScreen, Input} from '../../../components';
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

  const Signin = () => {
    const validation = isFormValid(email, password);
    if (!validation.status) {
      showSnackbar(validation.errMsg, snackbarType.SNACKBAR_ERROR);
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
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
