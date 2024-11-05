// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAESbSNXNwrwZMdaE4wCUEywCkf7Jkpigc",
  authDomain: "qrcreatorbyunique.firebaseapp.com",
  projectId: "qrcreatorbyunique",
  storageBucket: "qrcreatorbyunique.appspot.com",
  messagingSenderId: "531810809757",
  appId: "1:531810809757:web:5f0b4a236a80ed2a3ce174",
  measurementId: "G-TRGSXFXH3J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
