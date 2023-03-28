import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import {auth} from '../firebase/auth';
import Toast from 'react-native-toast-message';

import {StateContext} from '../context/context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {
    setUser,

    loading,
    setLoading,
    saveToAsyncStorage,
  } = useContext(StateContext);

  // const showToast = () => {
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Hello',
  //     text2: 'This is some something 👋',
  //     visibilityTime: 1000,
  //     autoHide: true,
  //   });
  // };

  const handleLoginSubmit = async () => {
    try {
      if (email === '' || password == '') {
        Alert.alert('Provide correct email & password ');
        return;
      }

      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          setUser(user);
          saveToAsyncStorage(user);

          setEmail('');
          setPassword('');
          Keyboard.dismiss();
          navigation.navigate('Home');
          Toast.show({
            type: 'success',
            text1: 'Login Success',
          });
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Login" />

      <Text
        style={{
          color: '#4E8FF7',
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 50,
          marginBottom: 30,
        }}>
        House_Of_Taste
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        placeholderTextColor="#000"
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholderTextColor="#000"
        secureTextEntry={true}
        placeholder="Password"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLoginSubmit()}>
        <Text style={{paddingRight: 5}}>
          {loading && <ActivityIndicator size="small" color="#fff" />}
        </Text>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            fontSize: 15,
            color: '#000',
            marginTop: 20,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          Create An Account
        </Text>
      </TouchableOpacity>
      <Toast />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderColor: 'transparent',
    backgroundColor: '#E2E8F0',
    width: '90%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4E8FF7',
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
