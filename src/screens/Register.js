import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../firebase/auth';

import Toast from 'react-native-toast-message';
import {StateContext} from '../context/context';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const {setUser, loading, setLoading} = useContext(StateContext);
  const handleSignUp = () => {
    if (!name) {
      Alert.alert('Please enter a name');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Alert.alert(' Please provide correct email address');
      return;
    }
    if (!password) {
      Alert.alert('Please enter password');
      return;
    }

    if (!email) {
      Alert.alert(' Please provide  email address');
      return;
    }

    if (password?.length < 6) {
      Alert.alert(' Password should be 6 characters');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        setUser(user);
        updateName(name);
        saveToDatabase(user);

        Keyboard.dismiss();
        setName('');
        setEmail('');
        setPassword('');
        Toast.show({
          type: 'success',
          text1: 'Registration Success, Please Login',
          visibilityTime: 1000,
          autoHide: true,
        });
        setLoading(false);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateName = name => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log('display name updated');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const saveToDatabase = user => {
    const userInformation = {
      name: user?.name,
      email: user?.email,
      role: 'user',
      createdAt: new Date(),
    };

    fetch(`https://parlur-server-techreme.vercel.app/users/singleuser`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInformation),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === true) {
          console.log('save to database successfully');
        } else {
          console.log('data not save to database ');
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Register" />
      <Text
        style={{
          color: '#4E8FF7',
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 30,
          marginBottom: 30,
        }}>
        House_Of_Taste
      </Text>
      <TextInput
        type="text"
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
        placeholder="Name"
        placeholderTextColor="#000"
      />
      <TextInput
        type="text"
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        placeholderTextColor="#000"
      />

      <TextInput
        type="text"
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#000"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text>
          {loading && <ActivityIndicator size="small" color="#fff" />}{' '}
        </Text>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            fontSize: 15,
            color: '#000',
            marginTop: 20,
            marginBottom: 10,
          }}>
          Already Account ? Login
        </Text>
      </TouchableOpacity>
      <Toast />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
