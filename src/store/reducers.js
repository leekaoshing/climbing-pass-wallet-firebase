import { combineReducers } from 'redux'
import firebase from 'react-redux-firebase/lib/reducer'
import firestore from 'redux-firestore/lib/reducer'
import locationReducer from './reducers/location'
import dialogReducer from './reducers/dialog'
import userReducer from './reducers/user'

export function makeRootReducer(asyncReducers) {
  return combineReducers({
    // Add sync reducers here
    firebase,
    firestore,
    dialog: dialogReducer,
    user: userReducer,
    location: locationReducer,
    ...asyncReducers
  })
}

export function injectReducer(store, { key, reducer }) {
  store.asyncReducers[key] = reducer // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
