import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDe-GlJXmZMtevuFT4nZbyf555ctXdPWEw",
  authDomain: "crwn-db-9366b.firebaseapp.com",
  projectId: "crwn-db-9366b",
  storageBucket: "crwn-db-9366b.appspot.com",
  messagingSenderId: "244403369394",
  appId: "1:244403369394:web:4e838e27d1f0c9ec6fe0ab",
  measurementId: "G-GTBPZLNETG",
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
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
