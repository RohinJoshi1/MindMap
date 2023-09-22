// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp  } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import { getFirestore, collection, getDocs } from 'firebase/firestore'

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyA5wmWnoRX8Q6ftDH6udq7AmQflNkrLIzk",
  authDomain: "mindmap-8fb1a.firebaseapp.com",
  projectId: "mindmap-8fb1a",
  storageBucket: "mindmap-8fb1a.appspot.com",
  messagingSenderId: "491064979451",
  appId: "1:491064979451:web:db02a764f5cb57723d655e"
};

// Initialize Firebase
const app =  getApps().length === 0 ? initializeApp(config) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, app,db}

