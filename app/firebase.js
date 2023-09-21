// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5wmWnoRX8Q6ftDH6udq7AmQflNkrLIzk",
  authDomain: "mindmap-8fb1a.firebaseapp.com",
  projectId: "mindmap-8fb1a",
  storageBucket: "mindmap-8fb1a.appspot.com",
  messagingSenderId: "491064979451",
  appId: "1:491064979451:web:db02a764f5cb57723d655e"
};

// Initialize Firebase
const app = !firebase.apps.length ? initializeApp(firebaseConfig) : app;
export const auth = getAuth(app)
export {auth, app}

