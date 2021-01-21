import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import {
    selectShowCreateUserDialog,
    setShowCreateUserDialog
} from '../reducers/dialogSlice';
import { generateUserDocument, isDisplayNameTaken } from '../services/firebase';

const MINIMUM_USERNAME_LENGTH = 4;

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

const newUserTemplate = {
    displayName: '',
    firstName: '',
    lastName: '',
    email: ''
};

export function SignUpDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const firebase = useFirebase();

    const showCreateUserDialog = useSelector(selectShowCreateUserDialog);

    const [newUser, setNewUser] = useState(newUserTemplate);
    const [password, setPassword] = useState('');

    const [displayNameError, setDisplayNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [createUserError, setCreateUserError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    // const [error, setError] = useState(null);


    const createUserWithEmailAndPasswordHandler = async (newUser, password) => {
        try {
            if (await isDisplayNameTaken(newUser.displayName)) {
                throw new Error(`Display Name '${newUser.displayName} is already taken.`);
            }
            const { user } = await firebase.auth().createUserWithEmailAndPassword(newUser.email, password); // TODO How to set displayName in the firebase auth user?
            await generateUserDocument(user, {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                displayName: newUser.displayName,
                email: newUser.email,
            });

            setSuccess(true);
        }
        catch (error) {
            setCreateUserError(error.message);
        }
    };

    const handleClose = () => {
        setLoading(false);
        setSuccess(false);
        if (success) {
            clearForm();
        }
        setDisplayNameError('');
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setCreateUserError('');
        dispatch(setShowCreateUserDialog(false));
    }

    const handleSubmit = () => {
        setCreateUserError('');
        setLoading(true);
        createUserWithEmailAndPasswordHandler(newUser, password).then(() => {
            setLoading(false);
        });
    };

    const clearForm = () => {
        setNewUser(newUserTemplate);
        setPassword('');
    }

    const onChangeHandler = event => {
        const { name, value } = event.target;
        if (name === "displayName") {
            validateDisplayName(value);
            setNewUser({
                ...newUser,
                displayName: value
            });
        } else if (name === "firstName") {
            validateFirstName(value);
            setNewUser({
                ...newUser,
                firstName: value
            });
        } else if (name === "lastName") {
            validateLastName(value);
            setNewUser({
                ...newUser,
                lastName: value
            });
        } else if (name === "email") {
            setNewUser({
                ...newUser,
                email: value
            });
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const validateFirstName = firstName => {
        if (firstName === '') {
            setFirstNameError("First name cannot be blank.");
        } else if (!firstName.match(/^[a-zA-Z ]*$/g)) {
            setFirstNameError("Alphabetical characters only.");
        } else {
            setFirstNameError('');
        }
    }

    const validateLastName = lastName => {
        if (lastName === '') {
            setLastNameError("Last name cannot be blank.");
        } else if (!lastName.match(/^[a-zA-Z ]*$/g)) {
            setLastNameError("Alphabetical characters only.");
        } else {
            setLastNameError('');
        }
    }

    const validateDisplayName = displayName => {
        if (displayName === '') {
            setDisplayNameError("Display name cannot be blank.");
        } else if (!displayName.match(/^[a-zA-Z]*.*$/g)) {
            setDisplayNameError("Must start with an alphabet.");
        } else if (!displayName.match(/^[a-zA-Z0-9]*$/g)) {
            setDisplayNameError("Alphanumeric characters only, no spaces.");
        } else {
            setDisplayNameError('');
        }
    }

    const validatePasswordOnBlur = () => {
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
        } else {
            setPasswordError('');
        }
    }

    const validateDisplayNameOnBlur = () => {
        if (newUser.displayName.length < MINIMUM_USERNAME_LENGTH) {
            setDisplayNameError(`Display name must be at least ${MINIMUM_USERNAME_LENGTH} characters.`);
        } else {
            setDisplayNameError('');
        }
    }

    const validateEmailOnBlur = () => {
        if (newUser.email !== undefined) {
            const email = newUser.email;
            if (email === '') {
                setEmailError("Email cannot be blank.");
            } else if (!email.match(/^\S+@\S+[.][0-9a-z]+$/g)) {
                setEmailError("Email in incorrect format.");
            } else {
                setEmailError('');
            }
        }
    }

    const errorsExist = displayNameError !== '' || firstNameError !== '' || lastNameError !== '' || emailError !== '' || passwordError !== '';
    const fieldsAreBlank = newUser.displayName === '' || newUser.firstName === '' || newUser.lastName === '' || newUser.email === '' || password === '';

    const cannotSubmit = errorsExist || fieldsAreBlank;

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showCreateUserDialog}>
                <DialogTitle id="add-gym-dialog-title">User Registration</DialogTitle>
                {
                    createUserError !== '' ?
                        <Paper className={classes.paper} elevation={0}>
                            <Alert severity="error">{createUserError}</Alert>
                        </Paper>
                        :
                        null
                }
                <Paper className={classes.paper} elevation={0}>
                    <TextField
                        error={displayNameError !== ''}
                        label="Display Name"
                        name="displayName"
                        helperText={displayNameError}
                        variant="outlined"
                        value={newUser.displayName}
                        onChange={onChangeHandler}
                        onBlur={validateDisplayNameOnBlur}
                    />
                    <br />
                    <br />
                    <TextField
                        error={firstNameError !== ''}
                        label="First Name"
                        name="firstName"
                        helperText={firstNameError}
                        variant="outlined"
                        value={newUser.firstName}
                        onChange={onChangeHandler} // TODO Validate first and last names on blur to check if empty
                    />
                    <br />
                    <br />
                    <TextField
                        error={lastNameError !== ''}
                        label="Last Name"
                        name="lastName"
                        helperText={lastNameError}
                        variant="outlined"
                        value={newUser.lastName}
                        onChange={onChangeHandler}
                    />
                    <br />
                    <br />
                    <TextField
                        error={emailError !== ''}
                        label="Email"
                        name="email"
                        helperText={emailError}
                        variant="outlined"
                        value={newUser.email}
                        onChange={onChangeHandler}
                        onBlur={validateEmailOnBlur}
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
                        // isLoadingCreateUser ? <CircularProgress />
                        // :
                        // successfullyCreatedUser ?
                        // <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Success! &nbsp;<DoneIcon /></div>
                        // :
                        loading ?
                            <CircularProgress />
                            :
                            success ?
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Success! &nbsp;<DoneIcon /></span>
                                :
                                <Button
                                    disabled={cannotSubmit}
                                    aria-label="submitNewUser"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                    }
                </Paper>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};