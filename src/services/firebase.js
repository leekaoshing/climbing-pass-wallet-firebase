// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';
// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import 'firebase/auth';
import 'firebase/firestore';
import { cloneDeep } from 'lodash';
import { setEditableUser, setLoadingUpdateUser, setShowUpdateResultDialog, setUpdateResult } from '../reducers/userSlice';

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

// TODO Use Google sign in
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        await userRef.set({
            ...additionalData,
            passes: {}
        });
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    // try {
        
    // } catch (error) {
    //     throw error;
    // }
};

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

export const signOut = () => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        window.location.reload();
    }).catch((error) => {
        // An error happened.
    });
}

// Finally, export it to use it throughout your app
// export default firebase;

export const updateUserInFireStore = () => (dispatch, getState) => {
    dispatch(setLoadingUpdateUser(true));

    const { user, firebase } = getState();
    const updatedUser = cloneDeep(user.editableUser);
    const auth = firebase.auth;

    // Remove gyms with 0 passes
    Object.keys(updatedUser.passes).forEach(gym => {
        if (updatedUser.passes[gym] === 0) {
            delete updatedUser.passes[gym];
        }
    })

    firestore.collection('users').doc(auth.uid).set(updatedUser)
        .then(() => {
            dispatch(setEditableUser(updatedUser));
            dispatch(setUpdateResult(
                {
                    success: true,
                    message: 'Successfully updated!'
                }
            ))
        })
        .catch(error => {
            dispatch(setUpdateResult(
                {
                    success: false,
                    message: error.message
                }
            ));
        })
        .finally(() => {
            dispatch(setLoadingUpdateUser(false));
            dispatch(setShowUpdateResultDialog(true));
        });
}