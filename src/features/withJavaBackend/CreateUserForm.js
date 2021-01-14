import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    createUser,
    closeCreateUserDialog,
    selectCreateUserError,
    selectIsLoadingCreateUser,
    selectShowCreateUserDialog,
    selectSuccessfullyCreatedUser,
    setSuccessfullyCreatedUser,
    showCreateUserDialog,
    fetchUserByUsername,
} from './userSlice';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import { fetchGyms, selectGyms } from './gymSlice';

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
    username: '',
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
    const [usernameError, setUsernameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const classes = useStyles();

    const handleSubmit = () => {
        dispatch(createUser(newUser));
        // dispatch(closeCreateUserDialog());
    };

    const handleOpen = () => {
        dispatch(showCreateUserDialog())
    }

    const handleClose = () => {
        dispatch(setSuccessfullyCreatedUser(false));
        dispatch(closeCreateUserDialog());
        if (successfullyCreatedUser) {
            dispatch(fetchUserByUsername(newUser.username));
            dispatch(setSuccessfullyCreatedUser(false));
            setNewUser(newUserTemplate);
        }
    }

    const handleUsernameChange = (event) => {
        const username = event.target.value;
        validateUsername(username);
        setNewUser({
            ...newUser,
            username
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

    const validateUsername = username => {
        if (username === '') {
            setUsernameError("Username cannot be blank.");
        } else if (!username.match(/^[a-zA-Z0-9_]*$/g)) {
            setUsernameError("Alphanumeric characters and underscores only.");
        } else {
            setUsernameError('');
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
                        error={usernameError !== ''}
                        label="Username"
                        helperText={usernameError}
                        variant="outlined"
                        value={newUser.username}
                        onChange={handleUsernameChange}
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
                                    disabled={usernameError !== '' && firstNameError !== '' && lastNameError !== '' && emailError !== ''}
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




