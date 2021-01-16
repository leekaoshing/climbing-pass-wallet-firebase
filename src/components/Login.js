import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setPasswordResetEmail, setShowPasswordResetDialog } from "../reducers/userSlice";
import { auth } from '../services/firebase';
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
    const history = useHistory();
    const classes = useStyles();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [identifierError, setIdentifierError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const signInWithEmailAndPasswordHandler = async (email, password) => {
        await auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setIdentifier('');
                setPassword('');
                setLoading(false);
            })
            .catch(error => {
                setLoginError(error.message);
                setLoading(false);
            });
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
        signInWithEmailAndPasswordHandler(identifier, password);
    }

    const handleForgotPassword = () => {
        dispatch(setPasswordResetEmail(identifier)); // TODO Assumes it is email
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

    const cannotSubmit = identifierError !== '' || passwordError !== '' || identifier === '' || password === '';

    return (
        <div>
            <PasswordResetDialog />
            {/* <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showLoginDialog}>
                <DialogTitle id="add-gym-dialog-title">Log In</DialogTitle> */}
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
                    name="identifier"
                    helperText={identifierError}
                    variant="outlined"
                    value={identifier}
                    onChange={onChangeHandler}
                    onBlur={validateIdentifierOnBlur}
                />
                <br />
                <br />
                <TextField
                    error={passwordError !== ''}
                    label="Password"
                    name="password"
                    helperText={passwordError}
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={onChangeHandler}
                    onBlur={validatePasswordOnBlur}
                />
            </Paper>
            <Paper className={classes.submitPaper} elevation={0}>
                {
                    loading ?
                        <CircularProgress />
                        // :
                        // successfullyCreatedUser ?
                        // <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Success! &nbsp;<DoneIcon /></div>
                        // :
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
            {/* <DialogActions>
                    <Button
                        color="primary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogActions> */}
            {/* </Dialog> */}
        </div>

        // <div className="mt-8">
        //     <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
        //     <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        //         {error !== null && <div className="py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        //         <form className="">
        //             <label htmlFor="userEmail" className="block">
        //                 Email:
        //   </label>
        //             <input
        //                 type="email"
        //                 className="my-1 p-1 w-full"
        //                 name="userEmail"
        //                 value={email}
        //                 placeholder="E.g: faruq123@gmail.com"
        //                 id="userEmail"
        //                 onChange={(event) => onChangeHandler(event)}
        //             />
        //             <label htmlFor="userPassword" className="block">
        //                 Password:
        //   </label>
        //             <input
        //                 type="password"
        //                 className="mt-1 mb-3 p-1 w-full"
        //                 name="userPassword"
        //                 value={password}
        //                 placeholder="Your Password"
        //                 id="userPassword"
        //                 onChange={(event) => onChangeHandler(event)}
        //             />
        //             <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
        //                 Sign in
        //   </button>
        //         </form>
        //         <p className="text-center my-3">or</p>
        //         <button
        //             className="bg-red-500 hover:bg-red-600 w-full py-2 text-white">
        //             Sign in with Google
        // </button>
        //         <p className="text-center my-3">
        //             Don't have an account?{" "}
        //             <button onClick={() => history.push('/signUp')} className="text-blue-500 hover:text-blue-600">
        //                 Sign up here
        //                 </button>{" "}
        //             <br />{" "}
        //             <button onClick={() => history.push('/passwordReset')} className="text-blue-500 hover:text-blue-600">
        //                 Forgot Password?
        //                 </button>
        //         </p>
        //     </div>
        // </div>
    );
};