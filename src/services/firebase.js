import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAoKea43e73OZmgYSxF6ns-yiAPwHndoR0",
  authDomain: "e-commerce-f27b4.firebaseapp.com",
  projectId: "e-commerce-f27b4",
  storageBucket: "e-commerce-f27b4.firebasestorage.app",
  messagingSenderId: "151737910944",
  appId: "1:151737910944:web:04f6799009fb63be62abc5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);