import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyClgJ_5NAb7RnV2CdKrrvYttKPs4AaEFAM",
  authDomain: "update-project-89f35.firebaseapp.com",
  projectId: "update-project-89f35",
  storageBucket: "update-project-89f35.appspot.com",
  messagingSenderId: "354855163591",
  appId: "1:354855163591:web:8824630ca3cb96b17190e2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };
export const signOutUser = () => {
  auth.signOut()
    .then(() => {
      console.log('User signed out successfully');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
};