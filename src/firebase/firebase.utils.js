import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: "AIzaSyBiOAvVUF4Z5iKB_QNh9XBPILM8IRkZbcs",
  authDomain: "crwn-db-b9d23.firebaseapp.com",
  projectId: "crwn-db-b9d23",
  storageBucket: "crwn-db-b9d23.appspot.com",
  messagingSenderId: "1089047599436",
  appId: "1:1089047599436:web:eacc13e4b5351ce7ed17e9",
  measurementId: "G-YEY93V3F4P"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
