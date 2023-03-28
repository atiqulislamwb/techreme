import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';

import CommonHeader from '../components/CommonHeader';

import Toast from 'react-native-toast-message';
import useRealm from '../hooks/useRealm';
import {StateContext} from '../context/context';

const Pos = () => {
  const {netInfo} = useContext(StateContext);
  const {offlineProducts, sendProductsToMongoDB} = useRealm();

  useEffect(() => {
    if (netInfo.isConnected == true) {
      sendProductsToMongoDB();
    }
  }, [netInfo.isConnected]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', width: '100%'}}>
      <CommonHeader title="POS Products" />
      <Text
        style={{
          fontSize: 25,
          padding: 10,
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
        }}>
        {offlineProducts?.length} Products
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 5, paddingBottom: 20}}>
        {offlineProducts.length === 0 && (
          <View>
            <Text>No Product</Text>
          </View>
        )}
        {offlineProducts?.map((item, i) => (
          <View
            key={i}
            style={{
              marginTop: 10,
              backgroundColor: '#F1F5F9',
              padding: 10,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20}}>{item?.name}</Text>
            <Text>{item?.price} taka</Text>
            <Text
              style={{
                color: item?.isSynced ? 'green' : 'red',
              }}>
              {item.isSynced ? 'Synced' : 'Not Synced'}
            </Text>
          </View>
        ))}
      </ScrollView>
      {offlineProducts?.length > 0 && (
        <TouchableOpacity
          onPress={() => sendProductsToMongoDB()}
          disabled={netInfo?.isConnected == false}
          style={{
            ...styles.button,
            backgroundColor: netInfo?.isConnected == false ? '#fff' : '#6366F1',
          }}>
          <Text style={styles.text}>push</Text>
        </TouchableOpacity>
      )}
      <Toast />
    </SafeAreaView>
  );
};

export default Pos;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 15,

    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
