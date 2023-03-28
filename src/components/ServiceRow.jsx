import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {StateContext} from '../context/context';
import Toast from 'react-native-toast-message';
import useGetAllServices from '../hooks/useGetAllServices';

const ServiceRow = ({item}) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {localUser} = useContext(StateContext);
  const time = moment(item?.createdAt).format('LLL');
  const {refetch} = useGetAllServices();
  const handleDeleteService = id => {
    setLoading(true);
    fetch(`https://parlur-server-techreme.vercel.app/services/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `${localUser?.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data?.success === true) {
          Toast.show({
            type: 'success',
            text1: 'Delete Successfully',
            visibilityTime: 1000,
            autoHide: true,
          });
          setLoading(false);
          refetch();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View
      style={{
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 3,
        marginTop: 10,
        backgroundColor: '#F1F5F9',
      }}>
      <View
        style={{
          padding: 4,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ServiceDetails', {data: item})}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            <View style={{}}>
              <Image
                source={{
                  uri: item?.image,
                }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',

                paddingLeft: 10,
              }}>
              <View>
                <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
                  {item?.serviceName}
                </Text>
              </View>
              <View>
                <Text style={{color: '#000', fontSize: 12}}>{time}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginRight: 15,
            alignItems: 'center',
            columnGap: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateService', {data: item})}>
            <Image
              source={require('../assets/icons8-ball-point-pen-64.png')}
              style={{width: 36, height: 36}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteService(item?._id)}>
            <Image
              source={require('../assets/icons8-remove-64.png')}
              style={{width: 36, height: 36}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServiceRow;

const styles = StyleSheet.create({});
