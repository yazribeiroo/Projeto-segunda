// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB5jgGSCtc1mKDPp9VGfs2Q47alIIPml0I",
  authDomain: "loginapp-91c39.firebaseapp.com",
  projectId: "loginapp-91c39",
  storageBucket: "loginapp-91c39.appspot.com", // corrigido: "firebasestorage.app" → "appspot.com"
  messagingSenderId: "71336792683",
  appId: "1:71336792683:web:c6e73988bd68899b38172e"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore
export const db = getFirestore(app);
