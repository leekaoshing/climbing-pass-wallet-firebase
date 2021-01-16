import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectShowUpdateResultDialog,
    selectUpdateResult,
    setShowUpdateResultDialog
} from '../reducers/userSlice';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
    },
}));

export function UpdateResultDialog() {
    const dispatch = useDispatch();
    const showUpdateResultDialog = useSelector(selectShowUpdateResultDialog);
    const updateResult = useSelector(selectUpdateResult);

    const classes = useStyles();

    const handleClose = () => {
        dispatch(setShowUpdateResultDialog(false));
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showUpdateResultDialog}>
            <Paper className={classes.paper} elevation={0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {
                    updateResult.message
                }
                    &nbsp;
                {
                    updateResult.success ? <DoneIcon /> : null
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
