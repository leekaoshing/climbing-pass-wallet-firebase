import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useCheckMobileScreen } from '../actions/actions';
import { selectLoggedInUser, selectUsers } from '../selectors/firebase';
import { AboutDialog } from './AboutDialog';
import { Login } from './Login';
import { NavBar } from './NavBar';
import { Passes } from './Passes';
import { SignUpDialog } from './SignUpDialog';

const getScreenSize = isMobile => {
    if (isMobile) {
        return 'xs';
    } else {
        return 'sm';
    }
}

export function Application() {
    const auth = useSelector((state) => state.firebase.auth);

    const isScreenSizeMobile = useCheckMobileScreen();

    const [loading, setLoading] = useState(true);
    const [showUser, setShowUser] = useState(false);
    const users = useSelector(selectUsers);

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
    useEffect(() => {
        setLoading(!isLoaded(auth) || (!isEmpty(auth) && (!users || !Object.keys(users).includes(auth.uid))));
        setShowUser(loggedInUser);
    }, [auth, users, loggedInUser])

    return (
        <div  style={{ backgroundColor: 'white', height: '100vh', minHeight : '100vh' }}>
            <NavBar />
            <Container maxWidth={getScreenSize(isScreenSizeMobile)}>

                <AboutDialog />
                <SignUpDialog />
                {
                    loading ?
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <br /><br /><br /><br /><br />
                            <CircularProgress />
                        </div>
                        :
                        showUser ?
                            <Passes />
                            :
                            <Login />
                }
                <br />
                <br />
            </Container>
        </div>
    );
}