import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import CommonHeader from '../components/CommonHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import useRealm from './../hooks/useRealm';

const ServiceDetails = ({route}) => {
  const {data} = route.params;
  const {saveProduct} = useRealm();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <CommonHeader title="Service Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%', padding: 10}}>
        <View style={{width: '100%', marginBottom: 10}}>
          <Image
            source={{
              uri: data?.image,
            }}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text style={{color: '#000', fontSize: 20}}>{data?.serviceName}</Text>
          <Text style={{color: '#FF0000', fontSize: 15}}>
            Price: {data?.price}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: '#23527C'}}>
            <Text style={styles.text}>Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: '#16A34A'}}>
            <Text style={styles.text}>Order Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const product = {
                _id: data?._id,
                name: data?.serviceName,
                price: data?.price,
              };
              saveProduct(product);
            }}
            style={{width: 40, height: 40}}>
            <Image
              source={require('../assets/icons8-heart-suit-48.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, marginBottom: 50}}>
          <Text
            style={{
              fontSize: 15,

              fontWeight: 'bold',
              color: '#000',
            }}>
            Description:
          </Text>
          <Text style={{fontSize: 13, color: '#334155'}}>{data?.details}</Text>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
