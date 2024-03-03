// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernblog-410db.firebaseapp.com",
  projectId: "mernblog-410db",
  storageBucket: "mernblog-410db.appspot.com",
  messagingSenderId: "1059590632104",
  appId: "1:1059590632104:web:0dbd281bb7b7ab33ef889d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

