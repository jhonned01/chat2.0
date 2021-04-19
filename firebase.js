import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoOk2gMkZ-3z4Z1y-JXQEH6w0jTv199Rw",
  authDomain: "whatsapp2-de6f4.firebaseapp.com",
  projectId: "whatsapp2-de6f4",
  storageBucket: "whatsapp2-de6f4.appspot.com",
  messagingSenderId: "470698609646",
  appId: "1:470698609646:web:16a34499ea30682bef1cff",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

const Provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, Provider };
