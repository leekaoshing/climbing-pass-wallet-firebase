import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    closeUpdateResultModal,
    selectShowUpdateResult,
    selectUpdateResult
} from './userSlice';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
    },
}));

export function UpdateResultDialog() {
    const dispatch = useDispatch();
    const showUpdateResult = useSelector(selectShowUpdateResult);
    const message = useSelector(selectUpdateResult);

    const classes = useStyles();

    const handleClose = () => {
        dispatch(closeUpdateResultModal());
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showUpdateResult}>
                <Paper className={classes.paper} elevation={0}>
                    {message}
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
