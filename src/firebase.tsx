// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuPwARDomWaIBvqwUxX1qKOjXPZSbaRWM",
  authDomain: "social-m-81cfb.firebaseapp.com",
  projectId: "social-m-81cfb",
  storageBucket: "social-m-81cfb.appspot.com",
  messagingSenderId: "477598030422",
  appId: "1:477598030422:web:5f893ee42fc981eadeb9f7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);