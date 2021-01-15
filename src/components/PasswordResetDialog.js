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
import {
    selectPasswordResetEmail,
    selectShowPasswordResetDialog,
    setPasswordResetEmail,
    setShowPasswordResetDialog
} from '../reducers/userSlice';
import { auth } from '../services/firebase';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
    },
    submitPaper: {
        padding: theme.spacing(0),
        textAlign: 'center',
    }
}));

export function PasswordResetDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const showPasswordResetDialog = useSelector(selectShowPasswordResetDialog);

    const email = useSelector(selectPasswordResetEmail);

    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [sendEmailError, setSendEmailError] = useState('');

    const handleSubmit = () => {
        setEmailError('');
        setLoading(true);
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                // setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
            })
            .catch(error => {
                setSendEmailError(error.message);
            })
            .then(() => {
                setLoading(false);
            })
    };

    const onEmailChange = event => {
        dispatch(setPasswordResetEmail(event.target.value));
    };

    const validateEmailOnBlur = () => {
        if (email === '') {
            setEmailError("Email cannot be blank.");
        } else if (!email.match(/^\S+@\S+[\.][0-9a-z]+$/g)) {
            setEmailError("Email in incorrect format.");
        } else {
            setEmailError('');
        }
    }

    const handleClose = () => {
        setEmailError('');
        setSendEmailError('');
        setLoading('');
        if (emailHasBeenSent) {
            dispatch(setPasswordResetEmail('')); // TODO Useless because Login.js will set the Redux state value from its internal state
        }
        setEmailHasBeenSent(false);
        dispatch(setShowPasswordResetDialog(false));
    }

    const cannotSubmit = emailError !== '' || email === '';

    return (
        <Dialog onClose={handleClose} aria-labelledby="about-dialog-title" open={showPasswordResetDialog}>
            <DialogTitle>Reset Password</DialogTitle>
            {
                sendEmailError !== '' ?
                    <Paper className={classes.paper} elevation={0}>
                        <Alert severity="error">{sendEmailError}</Alert>
                    </Paper>
                    :
                    null
            }
            <Paper className={classes.paper} elevation={0}>
                <TextField
                    error={emailError !== ''}
                    label="Email"
                    name="email"
                    helperText={emailError}
                    variant="outlined"
                    value={email}
                    onChange={onEmailChange}
                    onBlur={validateEmailOnBlur}
                />
            </Paper>
            <Paper className={classes.submitPaper} elevation={0}>
                {
                    loading ?
                        <CircularProgress />
                        :
                        emailHasBeenSent ?
                            <Paper className={classes.paper} elevation={0}>
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Success! Please check your inbox (including junk folders).</span>
                            </Paper>
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
    );
}