import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDcgFQZoTPUiJ97pWm8hwoXl97lOF-RJ58",
    authDomain: "crwn-db-5be38.firebaseapp.com",
    databaseURL: "https://crwn-db-5be38.firebaseio.com",
    projectId: "crwn-db-5be38",
    storageBucket: "crwn-db-5be38.appspot.com",
    messagingSenderId: "803022568278",
    appId: "1:803022568278:web:dcf7fbb8f03db59c9ff4f7",
    measurementId: "G-EDQH4T7MG6"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase; 
  