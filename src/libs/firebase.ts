// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApGocTVWSgJADjv9VNNh3L8o_ZsD5w94g",
  authDomain: "bix-project-60371.firebaseapp.com",
  projectId: "bix-project-60371",
  storageBucket: "bix-project-60371.appspot.com",
  messagingSenderId: "955313661625",
  appId: "1:955313661625:web:5e7c50024da083566e9d68",
  measurementId: "G-LQC5D9LG3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
