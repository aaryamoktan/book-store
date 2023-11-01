
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAinOAFLOHf0iTz_7KTXNOC7ADRqsjX8to",
  authDomain: "book-store-8d7a0.firebaseapp.com",
  projectId: "book-store-8d7a0",
  storageBucket: "book-store-8d7a0.appspot.com",
  messagingSenderId: "133777360425",
  appId: "1:133777360425:web:95510631725d12f7b23e38",
  measurementId: "G-B59KRQPLZL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth(app)