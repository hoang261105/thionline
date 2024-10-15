// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "project-m24-b5efe.firebaseapp.com",
  projectId: "project-m24-b5efe",
  storageBucket: "project-m24-b5efe.appspot.com",
  messagingSenderId: "631002250527",
  appId: "1:631002250527:web:fff98d1e29bdaafb1b042a",
  measurementId: "G-ZJRWWS8NKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);