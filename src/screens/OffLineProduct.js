import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import CommonHeader from '../components/CommonHeader';
import {StateContext} from '../context/context';
import useRealm from '../hooks/useRealm';
import Toast from 'react-native-toast-message';

const OffLineProduct = () => {
  const {netInfo} = useContext(StateContext);
  const {AddedProducts, sendAddedProductsToMongoDB} = useRealm();

  useEffect(() => {
    if (netInfo?.isConnected == true) {
      sendAddedProductsToMongoDB();
    }
  }, [netInfo?.isConnected]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', width: '100%'}}>
      <CommonHeader title="Off Line Products" />
      <Text
        style={{
          fontSize: 25,
          padding: 10,
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
        }}>
        {AddedProducts?.length} Products
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 5, paddingBottom: 20}}>
        {AddedProducts?.length === 0 && (
          <View>
            <Text>No Product</Text>
          </View>
        )}
        {AddedProducts?.map((item, i) => (
          <View
            key={i}
            style={{
              marginTop: 10,
              backgroundColor: '#F1F5F9',
              padding: 10,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              columnGap: 20,
            }}>
            <Image
              source={{
                uri: item?.image,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 35,
              }}
              resizeMode="contain"
            />
            <View>
              <Text style={{fontSize: 20, color: '#000'}}>
                {item?.serviceName}
              </Text>
              <Text>{item?.price} taka</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text>{item?.category?.mainCategory} </Text>
                <Text>{item?.category?.subCategory1} </Text>
                <Text>{item?.category?.subCategory2} </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* {AddedProducts?.length > 0 && (
        <TouchableOpacity
          onPress={() => {}}
          disabled={netInfo?.isConnected == false}
          style={{
            ...styles.button,
            backgroundColor: netInfo?.isConnected == false ? '#fff' : '#6366F1',
          }}>
          <Text style={styles.text}>push</Text>
        </TouchableOpacity>
      )} */}
      <Toast />
    </SafeAreaView>
  );
};

export default OffLineProduct;

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
