import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers, compose } from 'redux'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import gymReducer from '../features/withJavaBackend/gymSlice';
import userReducer from '../reducers/userSlice';

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

// const rootReducer = combineReducers({
//   user: userReducer,
//   gym: gymReducer,
//   firebase: firebaseReducer,
//   firestore: firestoreReducer
// })

// // Create store with reducers and initial state
// const initialState = {}
// export default createStore(rootReducer, initialState);

export default configureStore({
  reducer: {
    user: userReducer,
    gym: gymReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
  },
});
