import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAFsLCelAgdcdAUBWlwx1w_aHZi-W6rwus",
  authDomain: "data-base-auth.firebaseapp.com",
  projectId: "data-base-auth",
  storageBucket: "data-base-auth.firebasestorage.app",
  messagingSenderId: "498930935412",
  appId: "1:498930935412:web:ab51de7f47db9380645321",
  measurementId: "G-J2BZ9F9FSM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);