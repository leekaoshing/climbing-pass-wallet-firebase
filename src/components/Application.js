import React from "react";
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { PasswordReset } from './PasswordReset';
import { Passes } from '../features/withJavaBackend/Passes';

export function Application() {
    const user = null;
    return (
        user ?
            <Passes />
            :
            <Switch>
                {/* <PrivateRoute path='/passes'>
                <Passes />
                </PrivateRoute> */}
                <Route exact path='/' component={Login} />
                <Route path='/signUp' component={SignUp} />
                <Route path='/passwordReset' component={PasswordReset} />


                {/* <Route exact path='/' component={Passes} /> */}
                {/* <Route path='/login' component={Login} /> */}
                <Redirect to='/' />
            </Switch>

    );
}