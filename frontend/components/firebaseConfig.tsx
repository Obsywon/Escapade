// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCfaZTRP3qpC_XqVpZgMAEs2b10E0-j12c",
  authDomain: "escapade-37d5e.firebaseapp.com",
  projectId: "escapade-37d5e",
  storageBucket: "escapade-37d5e.appspot.com",
  messagingSenderId: "509799142893",
  appId: "1:509799142893:web:464b7ae509e92c6453c3e4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
