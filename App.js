import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Home from './src/screens/Home';
import AddService from './src/screens/AddService';
import UpdateService from './src/screens/UpdateService';
import Search from './src/screens/Search';
import ServiceDetails from './src/screens/ServiceDetails';
import AllService from './src/screens/AllService';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

import {ContextProvider} from './src/context/context';

import Pos from './src/screens/Pos';
import OffLineProduct from './src/screens/OffLineProduct';

const queryClient = new QueryClient();

const Stack = createStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ContextProvider>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
            <Stack.Screen name="AddService" component={AddService} />
            <Stack.Screen name="UpdateService" component={UpdateService} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="AllService" component={AllService} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Pos" component={Pos} />
            <Stack.Screen name="OffLineProduct" component={OffLineProduct} />
          </Stack.Navigator>
        </ContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
