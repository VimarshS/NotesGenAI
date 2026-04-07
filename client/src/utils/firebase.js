
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-2218a.firebaseapp.com",
  projectId: "authexamnotes-2218a",
  storageBucket: "authexamnotes-2218a.firebasestorage.app",
  messagingSenderId: "776321257804",
  appId: "1:776321257804:web:35566cd4fc3cd2ba827fe9"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}