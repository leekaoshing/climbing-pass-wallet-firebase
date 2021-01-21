import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { setShowPasswordResetDialog } from "../reducers/dialogSlice";
import { setEditableUser } from "../reducers/userSlice";
import { PasswordResetDialog } from './PasswordResetDialog';
import { SignUpButton } from './SignUpButton';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    submitPaper: {
        padding: theme.spacing(0),
        textAlign: 'center',
    },
}));

export function Login() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const firebase = useFirebase();
    const firestore = useFirestore();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [identifierError, setIdentifierError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const cannotSubmit = identifierError !== '' || passwordError !== '' || identifier === '' || password === '';

    const signInWithEmailAndPasswordHandler = async (email, password) => {
        console.log('USE FIREBASE', firebase);
        const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = await firestore.collection('users').doc(auth.uid).get(); // TODO This is for login, but shouldn't be here since user may already be logged in on page load
        console.log('FETCHED USER', user.data())
        dispatch(setEditableUser(user.data()));
        // .then(() => {
        //     setIdentifier('');
        //     setPassword('');
        //     setLoading(false);
        // })
        // .catch(error => {
        //     setLoginError(error.message);
        //     setLoading(false);
        // });
    };

    const handleSubmit = () => {
        // TODO Cannot sign in by displayName yet, see getEmailFromDisplayName() in firebase.js
        // if (identifier.match(/^\S+@\S+[\.][0-9a-z]+$/g)) {
        //     auth.signInWithEmailAndPassword(identifier, password).catch(error => {
        //         setError("Error signing in with password and email!");
        //         console.error("Error signing in with password and email", error);
        //     });
        // } else {
        //     email = getEmailFromDisplayName(identifier);
        //     auth.signInWithEmailAndPassword(displayName, password).catch(error => {
        //         setError("Error signing in with password and email!");
        //         console.error("Error signing in with password and email", error);
        //     });
        // }

        // TODO add loading icon and error message
        setLoading(true);
        signInWithEmailAndPasswordHandler(identifier, password)
            .then(() => {
                setIdentifier('');
                setPassword('');
                setLoading(false);
            })
            .catch(error => {
                console.log('ERROR', error)
                setLoginError(error.message);
                setLoading(false);
            });
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter' && !cannotSubmit) {
            handleSubmit();
        }
    }

    const handleForgotPassword = () => {
        dispatch(setShowPasswordResetDialog(true));
    }

    const onChangeHandler = event => {
        const { name, value } = event.target;
        if (name === "identifier") {
            setIdentifier(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const validateIdentifierOnBlur = () => {
        if (identifier === '') {
            setIdentifierError("Email cannot be blank");
        } else {
            setIdentifierError('');
        }
    }

    const validatePasswordOnBlur = () => {
        if (password === '') {
            setPasswordError("Password cannot be blank");
        } else {
            setPasswordError('');
        }
    }

    return (
        <div>
            <PasswordResetDialog />
            {
                loginError !== '' ?
                    <Paper className={classes.paper} elevation={0}>
                        <Alert severity="error">{loginError}</Alert>
                    </Paper>
                    :
                    null
            }
            <Paper className={classes.paper} elevation={0}>
                <TextField
                    error={identifierError !== ''}
                    label="Email"
                    id="email for login"
                    name="identifier"
                    helperText={identifierError}
                    variant="outlined"
                    value={identifier}
                    onChange={onChangeHandler}
                    onBlur={validateIdentifierOnBlur}
                    onKeyDown={handleKeyDown}
                />
                <br />
                <br />
                <TextField
                    error={passwordError !== ''}
                    label="Password"
                    id="password for login"
                    name="password"
                    helperText={passwordError}
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={onChangeHandler}
                    onBlur={validatePasswordOnBlur}
                    onKeyDown={handleKeyDown}
                />
            </Paper>
            <Paper className={classes.submitPaper} elevation={0}>
                {
                    loading ?
                        <CircularProgress />
                        :
                        <div>
                            <Button
                                disabled={cannotSubmit}
                                aria-label="submitLogIn"
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Log In
                            </Button>
                            <br />
                            <br />
                            <SignUpButton />
                            &nbsp;
                            &nbsp;
                            <Button
                                aria-label="forgotPassword"
                                variant="contained"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </Button>
                        </div>
                }
            </Paper>
        </div>
    );
};