import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { selectGyms, selectLoggedInUser } from '../selectors/firebase';
import { firestore } from '../services/firebase';
import { AboutDialog } from './AboutDialog';
import { Login } from './Login';
import { NavBar } from './NavBar';
import { Passes } from './Passes';
import { SignUpDialog } from './SignUpDialog';

export function Application() {
    
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.firebase.auth);
    // const user = null;
    // // console.log('application user', user);
    // console.log('firebasejs auth', auth);

    // const reduxauth = useSelector(state => state.firebase.auth);
    // console.log('application auth', reduxauth);

    // auth.onAuthStateChanged(async userAuth => {
    //     const user2 = await getUser(userAuth);
    //     console.log('application getuser', user2);
    // });

    // const user = useSelector(selectUser);
    // if (!user) {
    //     const auth = useSelector(state => state.firebase.auth);
    //     auth.onAuthStateChanged(async userAuth => {
    //         const user2 = await getUser(userAuth);
    //         console.log('application getuser', user2);
    //     });
    // }

    useFirestoreConnect([
        {
            collection: 'users',
            doc: auth.uid
        },
        {
            collection: 'gyms'
        }
    ])

    const loggedInUser = useSelector(selectLoggedInUser);
    const isReady = isLoaded(auth) && !isEmpty(auth) && loggedInUser;

    return (
        <Container maxWidth="sm" style={{backgroundColor: 'white'}}>
            <NavBar />
            <AboutDialog />
            <SignUpDialog />
            {
                isReady ?
                    <Passes />
                    // <Test />
                    :
                    <Login />
            }
            <br />
            <br />
        </Container>
    );
}