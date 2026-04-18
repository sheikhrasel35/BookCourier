import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDvRRlJxKxSOFDxtvJXCyY0C_kPw0iCQ5U",
  authDomain: "bookcourier-b525d.firebaseapp.com",
  projectId: "bookcourier-b525d",
  storageBucket: "bookcourier-b525d.firebasestorage.app",
  messagingSenderId: "339183540842",
  appId: "1:339183540842:web:9f55677334a08620274813",
  measurementId: "G-XGHGG6M7C3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 

export default app;