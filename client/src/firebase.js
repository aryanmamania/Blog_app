
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-2be09.firebaseapp.com",
  projectId: "mern-blog-2be09",
  storageBucket: "mern-blog-2be09.appspot.com",
  messagingSenderId: "403208995657",
  appId: "1:403208995657:web:15f46690d3fe3c447f5098"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

