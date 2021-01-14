// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import 'firebase/auth';
import 'firebase/firestore';

// Your app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD3WTY0d0oHdZSxnAghqg-F7hKJ74jrtyA',
    authDomain: 'climbing-pass-wallet.firebaseapp.com',
    projectId: 'climbing-pass-wallet',
    storageBucket: 'climbing-pass-wallet.appspot.com',
    messagingSenderId: '287194549775',
    appId: '1:287194549775:web:b4792b4fd172931caf9d7a',
    measurementId: 'G-ZLTF129GET'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
if (window.location.hostname === "localhost") {  // Emulator
    firestore.useEmulator("localhost", 9091);
    auth.useEmulator('http://localhost:9099/');
}

// Google sign in
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

// Password sign in
export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

// Finally, export it to use it throughout your app
export default firebase;