// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvRRIJxKxSOFDxtvJXCyyOC_kPwOiCQ5U",
  authDomain: "bookcourier-b525d.firebaseapp.com",
  projectId: "bookcourier-b525d",
  storageBucket: "bookcourier-b525d.firebasestorage.app",
  messagingSenderId: "339183540842",
  appId: "1:339183540842:web:9f55677334a08620274813",
  measurementId: "G-XGHGG6M7C3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);