// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6AU5MiicosQWto2PYi0uD3DnZs0zUVEc",
  authDomain: "viorastore-ae620.firebaseapp.com",
  projectId: "viorastore-ae620",
  storageBucket: "viorastore-ae620.firebasestorage.app",
  messagingSenderId: "277712350020",
  appId: "1:277712350020:web:4da5edcb9ce2f75c574511",
  measurementId: "G-GJFR4WGBZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };