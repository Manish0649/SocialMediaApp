// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACT8SlWRlYYKDS3pQtA1WFey1PfF5CeuI",
  authDomain: "newdatabase-7f8f3.firebaseapp.com",
  projectId: "newdatabase-7f8f3",
  storageBucket: "newdatabase-7f8f3.firebasestorage.app",
  messagingSenderId: "1032456534944",
  appId: "1:1032456534944:web:74ebfabfdc4fb97451c2c5",
  measurementId: "G-0MNYXB5X8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const User = collection(db, "users");
const Posts = collection(db, "posts");

export { User, Posts , db };