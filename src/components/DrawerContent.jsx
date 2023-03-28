import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {StateContext} from '../context/context';

const DrawerContent = () => {
  const navigation = useNavigation();
  const {localUser, handleLogout} = useContext(StateContext);
  return (
    <SafeAreaView style={{flex: 1, height: '100%', position: 'relative'}}>
      <View>
        {!localUser?.email && (
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                fontWeight: '800',
                color: '#4E8FF7',
                textAlign: 'center',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {localUser?.email && (
        <View
          style={{
            padding: 10,
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('AllService')}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 16,
                fontWeight: '700',
                color: '#4E8FF7',
                backgroundColor: '#F8FAFC',
                paddingVertical: 10,
              }}>
              All Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddService')}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#4E8FF7',
                backgroundColor: '#F8FAFC',
                paddingVertical: 10,
              }}>
              Add New Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Pos')}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#4E8FF7',
                backgroundColor: '#F8FAFC',
                paddingVertical: 10,
              }}>
              POS Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('OffLineProduct')}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#4E8FF7',
                backgroundColor: '#F8FAFC',
                paddingVertical: 10,
              }}>
              Off Line Product
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => handleLogout()}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 10,
        }}>
        {localUser?.email && (
          <View style={styles.innerWrapper}>
            <View>
              <Image
                source={require('../assets/icons8-arrow-left-65.png')}
                style={{width: 34, height: 34}}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.text}>Logout</Text>
          </View>
        )}
      </TouchableOpacity>
      <Toast />
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  innerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {color: '#4E8FF7', marginLeft: 9, fontSize: 16, fontWeight: 'bold'},
});
