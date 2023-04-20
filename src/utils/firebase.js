import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCZsw5OwhxIES0-9llukkuiUq7KvoKGg74",
  authDomain: "smartshoes-af8ae.firebaseapp.com",
  databaseURL: "https://smartshoes-af8ae-default-rtdb.firebaseio.com",
  projectId: "smartshoes-af8ae",
  storageBucket: "smartshoes-af8ae.appspot.com",
  messagingSenderId: "77539385839",
  appId: "1:77539385839:web:8db98e95be481cb444d61a",
  measurementId: "G-DG4JZX5C74"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);