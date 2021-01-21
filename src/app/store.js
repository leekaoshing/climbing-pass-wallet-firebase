import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { actionTypes, firestoreReducer } from 'redux-firestore';
import userReducer from '../reducers/userSlice';
import dialogReducer from '../reducers/dialogSlice';

// import { createStore, applyMiddleware, compose } from 'redux';
// import reduxThunk from 'redux-thunk';
// import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
// import { reduxFirestore, getFirestore } from 'redux-firestore';
// import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import firebase from '../services/firebase';

export const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  onAuthStateChanged: (authData, firebase, dispatch) => {
    // Clear redux-firestore state if auth does not exist (i.e logout)
    if (!authData) {
      dispatch({ type: actionTypes.CLEAR_DATA })
    }
 }
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

export const rootReducer = {
  user: userReducer,
  dialog: dialogReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
};

export default configureStore({
  reducer: rootReducer
});
