import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJT4VLE-VHbEP1tChWn9cWo-ABXz45h7E",
  authDomain: "tbhess-335aa.firebaseapp.com",
  projectId: "tbhess-335aa",
  storageBucket: "tbhess-335aa.appspot.com",
  messagingSenderId: "1097359987216",
  appId: "1:1097359987216:web:3e92ce7219a39ab77b3095",
  measurementId: "G-FRH92SM0PH"
};
const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
   const User = collection(db, "User");
   const auth = getAuth(app);

  return { auth, User,db }; // Ajoutez auth ici
};

export { initFirebase };