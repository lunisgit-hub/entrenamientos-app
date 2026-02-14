import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3mbTzNaYnNVxbG0KJ53YytGLMK7bMVxE",
  authDomain: "entrenamiento-app-bd7ea.firebaseapp.com",
  projectId: "entrenamiento-app-bd7ea",
  storageBucket: "entrenamiento-app-bd7ea.firebasestorage.app",
  messagingSenderId: "581794465202", 
  appId: "1:581794465202:web:32846702b9ad50287010ab" 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);