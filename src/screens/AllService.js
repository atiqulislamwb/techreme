import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import useGetAllServices from '../hooks/useGetAllServices';
import ServiceRow from '../components/ServiceRow';
import CommonHeader from '../components/CommonHeader';
import Toast from 'react-native-toast-message';

const AllService = () => {
  const {data, isLoading, isError, error, refetch} = useGetAllServices();
  console.log(data);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', width: '100%'}}>
      <CommonHeader title="All Services" />
      <Toast />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 5, paddingBottom: 20}}>
        {isLoading && <ActivityIndicator size="large" color="#3B82F6" />}
        {data?.data?.map((item, i) => (
          <ServiceRow key={i} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllService;

const styles = StyleSheet.create({});
