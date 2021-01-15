import Container from '@material-ui/core/Container';
import React from "react";
import { useSelector } from 'react-redux';
import { Passes } from './Passes';
import { selectUser } from '../reducers/userSlice';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { AboutDialog } from './AboutDialog';
import { Login } from './Login';
import { LoginWrapper } from './LoginWrapper';
import { NavBar } from './NavBar';
import { SignUp } from './SignUp';
import { selectFirestoreAuth } from '../selectors/firebase';

export function Application() {
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

    const auth = useSelector((state) => state.firebase.auth);
    return (
        <Container maxWidth="xs">
            <NavBar />
            <AboutDialog />
            <Login />
            <SignUp />
            {
                isLoaded(auth) && !isEmpty(auth) ?
                    <Passes />
                    :
                    <LoginWrapper />
            }
        </Container>
    );
}