import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBcxzvY24bryyLquGynkykq43DyV-Wm9O4",
  authDomain: "desafio-ppt-final.firebaseapp.com",
  databaseURL: "https://desafio-ppt-final-default-rtdb.firebaseio.com",
  projectId: "desafio-ppt-final",
  storageBucket: "desafio-ppt-final.firebasestorage.app",
  messagingSenderId: "534029611487",
  appId: "1:534029611487:web:180457122f8a26ca3c146a",
  measurementId: "G-16CJ0DFTDY"
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);
export { rtdb };