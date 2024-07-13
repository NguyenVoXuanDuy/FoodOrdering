import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: "food-ordering-8050b.firebaseapp.com",
  projectId: "food-ordering-8050b",
  storageBucket: "food-ordering-8050b.appspot.com",
  messagingSenderId: "736127400010",
  appId: "1:736127400010:web:a2ec50e21038cccd7b0eb3",
  databaseUrl:
    "https://food-ordering-8050b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db: Firestore = getFirestore(app);

export const storage: FirebaseStorage = getStorage(app);
