// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQgVCJQOSHFDnlOCgWoku6aylgfJhrlqQ", // Replace with your actual API key
  authDomain: "medicine-tracker-a4a45.firebaseapp.com",
  projectId: "medicine-tracker-a4a45",
  storageBucket: "medicine-tracker-a4a45.appspot.com", // Fixed the storage bucket URL
  messagingSenderId: "847138534989",
  appId: "1:847138534989:web:2e8310f42daa75644d4e04",
  measurementId: "G-QXBCF1VS5D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
