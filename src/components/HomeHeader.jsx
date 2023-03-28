import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const HomeHeader = ({setOpen}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#3B82F6',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Toast />
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={{width: 30, height: 30}}
          onPress={() => setOpen(prevOpen => !prevOpen)}>
          <Image
            source={require('../assets/icons8-menu-rounded-50.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,

            fontWeight: 'bold',
            color: '#fff',
          }}>
          House_Of_Taste
        </Text>
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={{width: 33, height: 33}}
          onPress={() => navigation.navigate('Search')}>
          <Image
            source={require('../assets/icons8-search-more-50.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    columnGap: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
