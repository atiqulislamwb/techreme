import React, {createContext, useEffect, useMemo, useState} from 'react';

import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../firebase/auth.js';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
const LOCAL_USER = 'LOCAL_USER';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
export const StateContext = createContext();

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [localUser, setLocalUser] = useState({});
  const [netInfo, setNetInfo] = useState(null);
  const saveToAsyncStorage = async user => {
    const result = await fetch(
      `https://parlur-server-techreme.vercel.app/users/login?email=${user?.email}`,
    );
    const res = await result.json();

    const information = {
      email: user.email,
      name: user.displayName,
      password: res.data.password,
      token: res.jwtToken,
      role: res.data.role,
    };

    setLocalUser(information);

    await AsyncStorage.setItem(LOCAL_USER, JSON.stringify(information));
  };

  const handleLogout = async () => {
    try {
      signOut(auth)
        .then(abc => {
          setUser({});

          navigation.navigate('Login');
          Toast.show({
            type: 'success',
            text2: 'Logout Successfully',
            visibilityTime: 2000,
            autoHide: true,
          });
        })
        .catch(error => console.log(error));
      await AsyncStorage.removeItem(LOCAL_USER);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the user  from storage on component mount
    const fetchUser = async () => {
      try {
        const items = await AsyncStorage.getItem(LOCAL_USER);
        setLocalUser(JSON.parse(items) || {});
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    return () => {
      fetchUser();
    };
  }, []);

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribed();
  }, [user]);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state);
    });

    return () =>
      // Unsubscribe
      unsubscribe();
  }, []);
  console.log(netInfo);
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        // userFromDbLoading,
        handleLogout,
        localUser,
        setLocalUser,
        LOCAL_USER,
        saveToAsyncStorage,
        netInfo,
      }}>
      {children}
    </StateContext.Provider>
  );
};
