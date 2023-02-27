// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDZXeWoJ6nKj8Rq6y-xXA9X7G28GNRaknM",
  authDomain: "hithere-chatapp.firebaseapp.com",
  projectId: "hithere-chatapp",
  storageBucket: "hithere-chatapp.appspot.com",
  messagingSenderId: "1007015268744",
  appId: "1:1007015268744:web:9e52f617e3994871356a3d",
  measurementId: "G-3HVW7Z4YS7"
};

// Initialize Firebase
// const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()