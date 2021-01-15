import { isLoaded, isEmpty } from 'react-redux-firebase';

export const selectUserByUid = (state, uid) => {
    return state.firestore.data.users && state.firestore.data.users[uid];
}

export const selectLoggedInUser = state => {
    const auth = state.firebase.auth;
    return isLoaded(auth) && !isEmpty(auth) && state.firestore.data.users && state.firestore.data.users[auth.uid];
}

export const selectFirestoreAuth = state => {
    return state.firebase.auth;
}

export const selectGyms = state => {
    return state.firestore.data.gyms;
}