import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CommonHeader from '../components/CommonHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import {StateContext} from '../context/context';
import Toast from 'react-native-toast-message';
import useGetAllServices from '../hooks/useGetAllServices';
import {useNavigation} from '@react-navigation/native';
import useRealm from '../hooks/useRealm';

import Realm from 'realm';
const categories = {
  Face: {
    Wash: ['Spa'],
    Clining: ['Electric'],
  },
  Hair: {
    Cutting: ['Style'],
    Colour: ['Expert'],
  },
  Massage: {
    Body: ['Soft', 'Backrest'],
    Backrest: ['Liquid'],
    Dry: ['Massage'],
  },
};

const AddService = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [massageName, setMassageName] = useState('');
  const [additionalHeading, setAdditionalHeading] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const {localUser, netInfo} = useContext(StateContext);
  const {refetch} = useGetAllServices();
  const navigation = useNavigation();
  const {addedProductToDatabase} = useRealm();

  // function generateId() {
  //   const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  //   const machineId = Math.floor(Math.random() * 16777216).toString(16);
  //   const processId = Math.floor(Math.random() * 65536).toString(16);
  //   const counter = Math.floor(Math.random() * 16777216).toString(16);
  //   return timestamp + machineId + processId + counter;
  // }

  async function openImagePicker() {
    try {
      const options = {
        saveToPhotos: true,
        mediaType: 'photo',
      };

      const result = await launchImageLibrary(options);
      setPreviewImage(result.assets[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setSelectedItem(null);
  };

  const handleSubCategorySelect = subCategory => {
    setSelectedSubCategory(subCategory);
    setSelectedItem(null);
  };

  const handleItemSelect = item => {
    setSelectedItem(item);
  };

  const handlePostService = async () => {
    try {
      // if (!previewImage) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Select one of Photo',
      //     visibilityTime: 800,
      //     autoHide: true,
      //   });
      //   return;
      // }

      const serviceTwo = {
        serviceName: massageName,
        image: 'https://i.ibb.co/0rR46k8/handiwash-sanitizer-50-ml-2-pcs.webp',
        quantity: 1,
        price: Number(price),
        details: description,
        category: {
          mainCategory: selectedCategory,
          subCategory1: selectedSubCategory,
          subCategory2: selectedItem,
        },
        createdAt: new Date(),
      };

      if (!netInfo?.isConnected) {
        addedProductToDatabase(serviceTwo);

        Toast.show({
          type: 'success',
          text1: 'Product added to offline ',
          visibilityTime: 1500,
          autoHide: true,
        });

        return;
      }

      if (netInfo?.isConnected) {
        const formData = new FormData();
        formData.append('key', '3d122a021d924629c83631e131cf49f2');
        formData.append('image', {
          uri: previewImage?.uri,
          type: previewImage.type,
          name: previewImage.fileName,
        });
        setLoading(true);
        const results = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: formData,
        });
        const res = results.json();

        const service = {
          serviceName: massageName,
          additionalHeading,
          image: res?.data?.url,
          quantity: 1,
          price: Number(price),
          details: description,
          category: {
            mainCategory: selectedCategory,
            subCategory1: selectedSubCategory,
            subCategory2: selectedItem,
          },
          createdAt: new Date(),
        };
        const postService = await fetch(
          `https://parlur-server-techreme.vercel.app/services/single-service`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `${localUser?.token}`,
            },
            body: JSON.stringify(service),
          },
        );

        const postResult = postService.json();
        if (postResult?.success === true) {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Post Service Successfully',
            visibilityTime: 1500,
            autoHide: true,
          });
          refetch();
          navigation.navigate('AllService');
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Something Went Wrong',
            visibilityTime: 1500,
            autoHide: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <CommonHeader title="Add New service" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 10,
          }}>
          {previewImage && (
            <View style={{padding: 5, borderColor: '#CBD5E1', borderWidth: 1}}>
              <TouchableOpacity
                onPress={() => setPreviewImage(null)}
                style={{}}>
                <AntDesign name="close" size={27} color="#000" />
              </TouchableOpacity>
              <Image
                source={{uri: previewImage.uri}}
                style={{width: 100, height: 100}}
              />
            </View>
          )}
          <TouchableOpacity onPress={openImagePicker} style={styles.button}>
            <Text style={styles.text}>Choose Photo</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Massage Name *"
            value={massageName}
            placeholderTextColor="#000"
            onChangeText={massageName => setMassageName(massageName)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Additional heading *"
            value={additionalHeading}
            placeholderTextColor="#000"
            onChangeText={additionalHeading =>
              setAdditionalHeading(additionalHeading)
            }
          />
          <TextInput
            type="number"
            style={styles.textInput}
            placeholder="Price *"
            value={price}
            placeholderTextColor="#000"
            onChangeText={price => setPrice(price)}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 10,
            }}>
            <View style={{marginTop: 15, padding: 6}}>
              <View>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
                  Choose Categories
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                      Category
                    </Text>
                    {Object.keys(categories).map((category, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleCategorySelect(category)}
                        style={{paddingVertical: 10}}>
                        <Text
                          style={{
                            color:
                              selectedCategory === category ? 'blue' : 'black',
                          }}>
                          {category}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {selectedCategory && (
                    <View style={{flex: 1}}>
                      <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                        Sub-Category
                      </Text>
                      {Object.keys(categories[selectedCategory]).map(
                        (subCategory, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleSubCategorySelect(subCategory)}
                            style={{paddingVertical: 10}}>
                            <Text
                              style={{
                                color:
                                  selectedSubCategory === subCategory
                                    ? 'blue'
                                    : 'black',
                              }}>
                              {subCategory}
                            </Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  )}
                  {selectedSubCategory && (
                    <View style={{flex: 1}}>
                      <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                        Extra
                      </Text>
                      {categories[selectedCategory][selectedSubCategory].map(
                        (item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleItemSelect(item)}
                            style={{paddingVertical: 10}}>
                            <Text
                              style={{
                                color: selectedItem === item ? 'blue' : 'black',
                              }}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}
            placeholder="Description *"
            value={description}
            placeholderTextColor="#000"
            onChangeText={description => setDescription(description)}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 50,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor: '#3B82F6',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: 5,
              flexDirection: 'row',
            }}
            onPress={handlePostService}>
            <Text style={{paddingRight: 5}}>
              {loading && <ActivityIndicator size="small" color="#fff" />}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
              }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default AddService;

const styles = StyleSheet.create({
  textInput: {
    width: '97%',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#000',
  },
  text: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: '600',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderColor: '#FF0000',
    borderWidth: 2,
    borderRadius: 15,
  },
});
