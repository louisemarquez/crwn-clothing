import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDhq2gp7NVEwGIQPFfDxFSAUlhhAcls-dM",
  authDomain: "crwn-db-b014f.firebaseapp.com",
  databaseURL: "https://crwn-db-b014f.firebaseio.com",
  projectId: "crwn-db-b014f",
  storageBucket: "crwn-db-b014f.appspot.com",
  messagingSenderId: "370969470417",
  appId: "1:370969470417:web:0d5aa25239b0bd8bc2ecf0",
  measurementId: "G-1K4P81BS7B"
  };

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
        })

      } catch (error){
        console.log('Error creating user', error.message);
      }
    }
    return userRef;
  };

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach( obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

   return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = ( collections ) => {
    const transformedCollection = collections.docs.map(
      doc => {
        const { title, items } = doc.data();

        return {
          routeName: encodeURI(title.toLowerCase()),
          id: doc.id,
          title,
          items
        }
      });

      return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
      }, {});
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase; 
    