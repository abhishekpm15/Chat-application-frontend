// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCHCQ9vCsPFx7YgNe-jK-4-0wzgaZO6V84",
  authDomain: "chat-app-v2-66453.firebaseapp.com",
  projectId: "chat-app-v2-66453",
  storageBucket: "chat-app-v2-66453.appspot.com",
  messagingSenderId: "641848606425",
  appId: "1:641848606425:web:828075fe313a0b58a448c8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
