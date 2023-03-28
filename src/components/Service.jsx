import {Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Service = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ServiceDetails', {data: item})}
      style={{
        padding: 4,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        marginBottom: 20,
      }}>
      <View style={{width: '100%', padding: 4}}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={{
            width: '100%',
            height: 250,
            borderRadius: 15,
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: 'red', fontSize: 14}}>
            Expense {item?.price}
          </Text>
        </View>
        <View>
          <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
            {item?.serviceName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Service;

const styles = StyleSheet.create({});
