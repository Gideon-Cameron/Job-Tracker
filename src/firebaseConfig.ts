import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS7vrQc1eoQFxaGZW-F22huPrzqE4lkGM",
  authDomain: "job-tracker-fc05d.firebaseapp.com",
  projectId: "job-tracker-fc05d",
  storageBucket: "job-tracker-fc05d.appspot.com", // 
  messagingSenderId: "818949339957",
  appId: "1:818949339957:web:c3031294e96624224a2a7c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export default app;
export const db = getFirestore(app);