// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCzmkdMF7skiKEveIx1MvoactgPiv1UTaY',
  authDomain: 'tasteofhouse-266c7.firebaseapp.com',
  projectId: 'tasteofhouse-266c7',
  storageBucket: 'tasteofhouse-266c7.appspot.com',
  messagingSenderId: '135992997740',
  appId: '1:135992997740:web:4cc8f78cd2008f02d76549',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
