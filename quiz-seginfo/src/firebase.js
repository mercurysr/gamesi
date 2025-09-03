// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAia-dXWuFeTjc7wjqjYFnJcOcxNu6OHvA",
  authDomain: "game-si.firebaseapp.com",
  projectId: "game-si",
  storageBucket: "game-si.firebasestorage.app",
  messagingSenderId: "1019804807994",
  appId: "1:1019804807994:web:a4d5bf9eec78e8e4705603",
  measurementId: "G-RSX469ZSSN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);