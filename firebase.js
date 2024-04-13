// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1n9z6k9g_3RgyOiKw00e58zge2-r3LQs",
  authDomain: "schmooze-525e5.firebaseapp.com",
  projectId: "schmooze-525e5",
  storageBucket: "schmooze-525e5.appspot.com",
  messagingSenderId: "1014953450621",
  appId: "1:1014953450621:web:2518bf0c159e36fb856514",
  measurementId: "G-VTZG8EDLJG"
};

// Initialize Firebase
// const app = !firebase.apps.length ? initializeApp(firebaseConfig) : firebaseConfig.app();
const app = initializeApp(firebaseConfig);

// const db = app.firestore();
// const auth = app.auth();
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// const analytics = getAnalytics(app);

export { db, auth, provider };