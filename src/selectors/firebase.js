import { isLoaded, isEmpty } from 'react-redux-firebase';

export const selectLoggedInUser = state => {
    const auth = state.firebase.auth;
    return isLoaded(auth) && !isEmpty(auth) && state.firestore.data.users && state.firestore.data.users[auth.uid];
}

export const selectUsers = state => {
    return state.firestore.data && state.firestore.data.users;
}

export const selectFirebaseAuth = state => {
    return state.firebase.auth;
}

export const selectGyms = state => {
    return state.firestore.data.gyms;
}