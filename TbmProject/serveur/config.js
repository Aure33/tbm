const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyAJT4VLE-VHbEP1tChWn9cWo-ABXz45h7E",
  authDomain: "tbhess-335aa.firebaseapp.com",
  projectId: "tbhess-335aa",
  storageBucket: "tbhess-335aa.appspot.com",
  messagingSenderId: "1097359987216",
  appId: "1:1097359987216:web:3e92ce7219a39ab77b3095",
  measurementId: "G-FRH92SM0PH"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("User");
module.exports = User;
