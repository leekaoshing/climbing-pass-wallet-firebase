import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShowUpdateResultDialog,
    setShowUpdateResultDialog
} from '../reducers/dialogSlice';
import {
    selectUpdateResult
} from '../reducers/userSlice';

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
                    updateResult ?
                        <div>
                            {
                                updateResult.message
                            }
                            &nbsp;
                            {
                                updateResult.success ? <DoneIcon /> : null
                            }
                        </div>
                        :
                        null
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
