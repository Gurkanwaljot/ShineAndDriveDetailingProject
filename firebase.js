// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "shineanddrivedetailingservices.firebaseapp.com",
  projectId: "shineanddrivedetailingservices",
  storageBucket: "shineanddrivedetailingservices.firebasestorage.app",
  messagingSenderId: "321602418912",
  appId: "1:321602418912:web:8188a3b2d6a2e54d6f3885",
  measurementId: "G-2JG9STTMT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);