import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import useSearchResult from '../hooks/useSearchResult';
import Service from '../components/Service';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {searchResult, isLoading, isError, error} = useSearchResult(searchText);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F1F5F9', width: '100%'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          height: 70,
          backgroundColor: '#F1F5F9',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 2,
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../assets/icons8-left-arrow-100.png')}
              style={{width: 34, height: 34}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              backgroundColor: '#F8FAFC',
              marginLeft: 20,
              borderRadius: 8,
            }}>
            <Image
              source={require('../assets/icons8-search-64.png')}
              style={{width: 32, height: 32}}
              resizeMode="contain"
            />
            <TextInput
              style={{
                height: 50,
                borderBottomWidth: 0,
                borderColor: 'transparent',
                borderWidth: 1,
                width: 260,
                color: '#000',
              }}
              placeholder="Search Service"
              placeholderTextColor="#000"
              underlineColorAndroid="transparent"
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
          </View>
        </View>
      </View>

      {searchText && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: 30}}>
          {isLoading && <ActivityIndicator size="large" color="#3B82F6" />}

          {!isLoading && !isError && (
            <View>
              {searchResult.length === 0 && <Text>No services</Text>}
              {searchResult.length > 0 && (
                <View>
                  {searchResult?.map((item, i) => (
                    <Service key={i} item={item} />
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
