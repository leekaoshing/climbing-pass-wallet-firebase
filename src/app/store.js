import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/withJavaBackend/userSlice';
import gymReducer from '../features/withJavaBackend/gymSlice';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';

// import { createStore, applyMiddleware, compose } from 'redux';
// import reduxThunk from 'redux-thunk';
// import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
// import { reduxFirestore, getFirestore } from 'redux-firestore';
// import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import firebase from '../services/firebase';

export const rrfConfig = {
  userProfile: 'users',
  // attachAuthIsReady: true,
  useFirestoreForProfile: true
}

// export default configureStore = () => {
//   const middlewares = [thunk.withExtraArgument(getFirebase)];

//   const composedEnhancer = composeWithDevTools(
//     applyMiddleware(...middlewares),
//     reactReduxFirebase(firebase, rrfConfig),
//     reduxFirestore(firebase)
//   );

//   const store = createStore({
//     user: userReducer,
//     gym: gymReducer
//   }, composedEnhancer)

//   return store
// }

export default configureStore({
  reducer: {
    user: userReducer,
    gym: gymReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
  },
});
