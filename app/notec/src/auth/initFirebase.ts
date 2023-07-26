import { getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtoLuSMXLKA_KD8aCVNiioX4Dnl_skUso",
  authDomain: "notec-app-ef5e3.firebaseapp.com",
  projectId: "notec-app-ef5e3",
  storageBucket: "notec-app-ef5e3.appspot.com",
  messagingSenderId: "694507045582",
  appId: "1:694507045582:web:3a6323f2f462f86355869f",
  measurementId: "G-RD96HZBXJH",
};

export const initializeFirebase = () => {
  if (getApps().length) return;
  initializeApp(firebaseConfig);
};
