import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Drawer} from 'react-native-drawer-layout';
import HomeHeader from '../components/HomeHeader';
import DrawerContent from '../components/DrawerContent';
import useGetAllServices from './../hooks/useGetAllServices';
import Service from '../components/Service';
import {StateContext} from '../context/context';
import Toast from 'react-native-toast-message';

const Home = () => {
  const [open, setOpen] = useState(false);
  const {data, isLoading, isError, error, refetch} = useGetAllServices();
  const {netInfo} = useContext(StateContext);

  useEffect(() => {
    if (netInfo?.isConnected == true) {
      Toast.show({
        type: 'success',
        text1: 'You are Online',
        autoHide: true,
        visibilityTime: 600,
      });
    }

    if (netInfo?.isConnected == false) {
      Toast.show({
        type: 'error',
        text1: 'You are Offline',
        autoHide: true,
      });
    }
  }, [netInfo]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <StatusBar color="transparent" />
      <Drawer
        drawerStyle={{width: '80%', height: '100%'}}
        drawerType="slide"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => <DrawerContent setOpen={setOpen} />}>
        <HomeHeader setOpen={setOpen} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{padding: 5, marginTop: 10}}>
          {isLoading && <ActivityIndicator size="large" color="#3B82F6" />}
          {data?.data?.map((item, i) => (
            <Service key={i} item={item} />
          ))}
        </ScrollView>
      </Drawer>
      <Toast />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
