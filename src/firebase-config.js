import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "campuscruise-c63a4.firebaseapp.com",
  projectId: "campuscruise-c63a4",
  storageBucket: "campuscruise-c63a4.appspot.com",
  messagingSenderId: "570606155967",
  appId: "1:570606155967:web:e787a97d31a8dc91082e0a",
  measurementId: "G-KCFF7ZKV4M",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
