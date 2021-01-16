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

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    console.log('generate user document', additionalData);
    console.log('generate user document user', user);
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        // try {
            await userRef.set({
                ...additionalData,
                passes: {}
            });
        // }
        // catch (error) {
        //     throw error;  // TODO handle here, throw to user
        // }
    }
    return getUserDocument(user.uid);
};

// export const getEmailFromDisplayName = async (displayName) => {
//     if (!displayName) return;

//     const usersCollectionRef = firestore.collection('users');
//     const user = await usersCollectionRef.where('displayName', '==', displayName) // TODO Problem: not allowed to look for users if user is not signed in, since users will only be allowed to see their own data
//         .get()
//         .then(results => {
//             if (!results.empty) {
//                 console.error('user does not exist!') // TODO handle here, throw to user
//             }
//             return null;
//         })
//         .catch(error => {
//             console.error('Unable to check if user \'' + additionalData.displayName + '\' exists: ', error); // TODO handle here, throw to user
//     })

//     // if (user !== null) {
//     //     auth.getUserFromUid(user.uid) //.... continue this
//     //     return Email;
//     // }
// }

export const getUser = async (user) => {
    if (!user) return;
    return getUserDocument(user.uid);
}

export const isDisplayNameTaken = async (displayName) => {
    if (!displayName) return;
    return await firestore.collection('users').where('displayName', '==', displayName)
        .get()
        .then(results => {
            if (!results.empty) {
                return true;
            }
            return false;
        })
}

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        throw error;  // TODO handle here, throw to user
    }
};

export const signOut = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

// Finally, export it to use it throughout your app
export default firebase;