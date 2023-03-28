import {useContext, useEffect, useState} from 'react';

import NetInfo from '@react-native-community/netinfo';
import {realm} from '../Realm/Realm.js';
import Toast from 'react-native-toast-message';
import {StateContext} from '../context/context.js';

const useRealm = () => {
  const [offlineProducts, setOfflineProducts] = useState([]);
  const [AddedProducts, setAddedProducts] = useState([]);
  const {localUser} = useContext(StateContext);

  // Save pos product to Realm database
  const saveProduct = product => {
    realm.write(() => {
      realm.create('Product', product);
      setOfflineProducts([...offlineProducts, product]);
    });
    Toast.show({
      type: 'success',
      text1: 'Success add to offline',
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  const addedProductToDatabase = newProduct => {
    console.log(newProduct);

    realm.write(() => {
      realm.create('AddProduct', newProduct);
      setAddedProducts([...AddedProducts, newProduct]);
    });
    Toast.show({
      type: 'success',
      text1: 'Success add to offline',
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  // Send products to MongoDB database
  const sendProductsToMongoDB = async () => {
    try {
      let products = realm.objects('Product');
      products.forEach(product => {
        realm.write(() => {
          product.isSynced = true;
        });
      });

      const response = await fetch(
        'https://aptdeco-atiqulislamwb.vercel.app/all-wishlist',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(products),
        },
      );
      const json = await response.json();
      if (json.success == true) {
        realm.write(() => {
          realm.delete(products);
          setOfflineProducts([]);
        });
        Toast.show({
          type: 'success',
          text1: 'Success',
          visibilityTime: 1500,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendAddedProductsToMongoDB = async () => {
    try {
      let products = realm.objects('AddProduct');

      const response = await fetch(
        'https://parlur-server-techreme.vercel.app/services/multipalServices',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${localUser?.token}`,
          },
          body: JSON.stringify(products),
        },
      );
      const json = await response.json();
      if (json.success == true) {
        realm.write(() => {
          realm.delete(products);
          setAddedProducts([]);
        });
        Toast.show({
          type: 'success',
          text1: 'Product Successfully Uploaded Backend',
          visibilityTime: 1500,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //   useEffect(() => {
  //     const backgroundTask = () => {
  //       setInterval(() => {
  //         if (checkConnection()) {
  //           sendProductsToMongoDB();
  //         }
  //       }, 60000); // check every minute
  //     };

  //     return () => backgroundTask();
  //   }, []);

  useEffect(() => {
    const products = realm.objects('Product');
    setOfflineProducts([...products]);
  }, []);

  useEffect(() => {
    const products = realm.objects('AddProduct');
    setAddedProducts([...products]);
  }, []);

  return {
    saveProduct,
    offlineProducts,
    sendProductsToMongoDB,
    addedProductToDatabase,
    AddedProducts,
    sendAddedProductsToMongoDB,
  };
};

export default useRealm;
