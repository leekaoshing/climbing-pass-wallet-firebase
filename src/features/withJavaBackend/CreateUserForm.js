import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createUser,
    fetchUserByDisplayName, selectCreateUserError,
    selectIsLoadingCreateUser,
    selectShowCreateUserDialog,
    selectSuccessfullyCreatedUser,
    setSuccessfullyCreatedUser,
    setShowCreateUserDialog
} from '../../reducers/userSlice';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
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
    email: '',
    passes: {}
};

export function CreateUserForm() {
    const dispatch = useDispatch();
    const open = useSelector(selectShowCreateUserDialog);
    const isLoadingCreateUser = useSelector(selectIsLoadingCreateUser);
    const createUserError = useSelector(selectCreateUserError);
    const successfullyCreatedUser = useSelector(selectSuccessfullyCreatedUser);

    const [newUser, setNewUser] = useState(newUserTemplate);
    const [displayNameError, setDisplayNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const classes = useStyles();

    const handleSubmit = () => {
        dispatch(createUser(newUser));
        // dispatch(closeCreateUserDialog());
    };

    const handleOpen = () => {
        dispatch(setShowCreateUserDialog(true))
    }

    const handleClose = () => {
        dispatch(setSuccessfullyCreatedUser(false));
        dispatch(setShowCreateUserDialog(false));
        if (successfullyCreatedUser) {
            dispatch(fetchUserByDisplayName(newUser.displayName));
            dispatch(setSuccessfullyCreatedUser(false));
            setNewUser(newUserTemplate);
        }
    }

    const handleDisplayNameChange = (event) => {
        const displayName = event.target.value;
        validateDisplayName(displayName);
        setNewUser({
            ...newUser,
            displayName
        })
    }

    const handleFirstNameChange = (event) => {
        const firstName = event.target.value;
        validateFirstName(firstName);
        setNewUser({
            ...newUser,
            firstName
        })
    }

    const handleLastNameChange = (event) => {
        const lastName = event.target.value;
        validateLastName(lastName);
        setNewUser({
            ...newUser,
            lastName
        })
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setNewUser({
            ...newUser,
            email
        })
    }

    const validateFirstName = firstName => {
        if (firstName === '') {
            setFirstNameError("First name cannot be blank.");
        } else if (!firstName.match(/^[a-zA-Z]*$/g)) {
            setFirstNameError("Alphabetical characters only.");
        } else {
            setFirstNameError('');
        }
    }

    const validateLastName = lastName => {
        if (lastName === '') {
            setLastNameError("Last name cannot be blank.");
        } else if (!lastName.match(/^[a-zA-Z]*$/g)) {
            setLastNameError("Alphabetical characters only.");
        } else {
            setLastNameError('');
        }
    }

    const validateDisplayName = displayName => {
        if (displayName === '') {
            setDisplayNameError("DisplayName cannot be blank.");
        } else if (!displayName.match(/^[a-zA-Z0-9_]*$/g)) {
            setDisplayNameError("Alphanumeric characters and underscores only.");
        } else {
            setDisplayNameError('');
        }
    }

    const validateEmail = () => {
        if (newUser.email !== undefined) {
            const email = newUser.email;
            if (email === '') {
                setEmailError("Email cannot be blank.");
            } else if (!email.match(/^\S+@\S+[\.][0-9a-z]+$/g)) {
                setEmailError("Email in incorrect format.");
            } else {
                setEmailError('');
            }
        }

    }

    return (
        <div>
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpen}
            >
                Register
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="add-gym-dialog-title">User Registration</DialogTitle>
                {
                    createUserError !== null ?
                        <span style={{ color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {createUserError}
                        </span>
                        :
                        null
                }
                <Paper className={classes.paper} elevation={0}>
                    <TextField
                        error={displayNameError !== ''}
                        label="DisplayName"
                        helperText={displayNameError}
                        variant="outlined"
                        value={newUser.displayName}
                        onChange={handleDisplayNameChange}
                    />
                    <br />
                    <br />
                    <TextField
                        error={firstNameError !== ''}
                        label="First name"
                        helperText={firstNameError}
                        variant="outlined"
                        value={newUser.firstName}
                        onChange={handleFirstNameChange}
                    />
                    <br />
                    <br />
                    <TextField
                        error={lastNameError !== ''}
                        label="Last name"
                        helperText={lastNameError}
                        variant="outlined"
                        value={newUser.lastName}
                        onChange={handleLastNameChange}
                    />
                    <br />
                    <br />
                    <TextField
                        error={emailError !== ''}
                        label="Email address"
                        helperText={emailError}
                        variant="outlined"
                        value={newUser.email}
                        onChange={handleEmailChange}
                        onBlur={validateEmail}
                    />
                </Paper>
                <Paper className={classes.submitPaper} elevation={0}>
                    {
                        isLoadingCreateUser ? <CircularProgress />
                            :
                            successfullyCreatedUser ?
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Success! &nbsp;<DoneIcon /></div>
                                :
                                <Button
                                    disabled={displayNameError !== '' && firstNameError !== '' && lastNameError !== '' && emailError !== ''}
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
}




