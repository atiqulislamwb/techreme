import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import useGetSingleServices from '../hooks/useGetSingleService';
import CommonHeader from '../components/CommonHeader';
import {StateContext} from '../context/context';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import useGetAllServices from '../hooks/useGetAllServices';
const UpdateService = ({route}) => {
  const {data} = route.params;
  const id = data?._id;
  const {refetch} = useGetAllServices();
  const {localUser} = useContext(StateContext);
  const {singleService, isLoading, isError, error} = useGetSingleServices(id);

  const [previewImage, setPreviewImage] = useState(null);
  const [massageName, setMassageName] = useState(data?.serviceName);
  const [additionalHeading, setAdditionalHeading] = useState(
    data?.additionalHeading,
  );
  const [price, setPrice] = useState(singleService?.price);
  const [description, setDescription] = useState(data?.details);
  const [selectedCategory, setSelectedCategory] = useState(
    data?.category?.mainCategory,
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    data?.category?.subCategory1,
  );
  const [selectedItem, setSelectedItem] = useState(
    data?.category?.subCategory2,
  );
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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

  const handleUpdateService = id => {
    const data = {
      serviceName: massageName,
      additionalHeading,
      image: singleService?.image,
      quantity: 1,
      price: Number(price),
      details: description,
      category: {
        mainCategory: selectedCategory,
        subCategory1: selectedSubCategory,
        subCategory2: selectedItem,
      },
      updatedAt: new Date(),
    };
    setLoading(true);
    fetch(
      `https://parlur-server-techreme.vercel.app/services/single-service/${id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: `${localUser?.token}`,
        },
        body: JSON.stringify(data),
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data?.success === true) {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Update Success',
            visibilityTime: 1000,
            autoHide: true,
          });
          refetch();
          navigation.navigate('AllService');
        }
      })
      .catch(err => console.log(err));
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', width: '100%'}}>
      <CommonHeader title="Update Service" />
      {isLoading && <ActivityIndicator size="large" color="#3B82F6" />}

      {!isLoading && !isError && id && (
        <ScrollView style={{padding: 10}} showsVerticalScrollIndicator={false}>
          <View style={{}}>
            <Image
              source={{
                uri: singleService?.image,
              }}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
          </View>

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
              onPress={() => handleUpdateService(singleService?._id)}>
              <Text style={{paddingRight: 5}}>
                {loading && <ActivityIndicator size="small" color="#fff" />}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      <Toast />
    </SafeAreaView>
  );
};

export default UpdateService;

const styles = StyleSheet.create({
  textInput: {
    width: '97%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#000',
  },
});
