// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkR6PjwqYIGoyqrxkf1PGStrXztjZfokQ",
  authDomain: "sathyodhayam-50d9a.firebaseapp.com",
  projectId: "sathyodhayam-50d9a",
  storageBucket: "sathyodhayam-50d9a",
  messagingSenderId: "696545506494",
  appId: "1:696545506494:web:9fa5337c4ae125acf51aef",
  measurementId: "G-V216WKYGQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth,db };
