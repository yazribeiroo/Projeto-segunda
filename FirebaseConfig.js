import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Importa o auth

const firebaseConfig = {
  apiKey: "AIzaSyB5jgGSCtc1mKDPp9VGfs2Q47alIIPml0I",
  authDomain: "loginapp-91c39.firebaseapp.com",
  projectId: "loginapp-91c39",
  storageBucket: "loginapp-91c39.appspot.com",
  messagingSenderId: "71336792683",
  appId: "1:71336792683:web:c6e73988bd68899b38172e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);  // Exporta o auth para usar em login/cadastro
