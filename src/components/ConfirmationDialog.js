import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { getPassDifferences, selectEditableUser, selectShowConfirmationDialog, setShowConfirmationDialog, setShowUpdateResultDialog, setUpdateResult } from '../reducers/userSlice';
import { selectFirestoreAuth, selectLoggedInUser } from '../selectors/firebase';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
}));

export function ConfirmationDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const firestore = useFirestore();

    const auth = useSelector(selectFirestoreAuth);
    const userInDatabase = useSelector(selectLoggedInUser);
    const updatedUser = useSelector(selectEditableUser)
    const showConfirmationDialog = useSelector(selectShowConfirmationDialog);
    // const passDifferences = useSelector(selectPassDifferences);
    const passDifferences = useSelector(getPassDifferences);

    const handleClose = () => {
        dispatch(setShowConfirmationDialog(false));
    }

    const onConfirm = () => {
        // dispatch(setIsLoading(true));
        // TODO need to remove 0 passes
        firestore.collection('users').doc(auth.uid).set(updatedUser, { merge: true })
            .then(() => {
                dispatch(setUpdateResult(
                    {
                        success: true,
                        message: 'Successfully updated!'
                    }
                ))
            })
            .catch(error => {
                dispatch(setUpdateResult(
                    {
                        success: false,
                        message: error.message
                    }
                ));
            })
            .finally(() => {
                console.log('finally clause')
                dispatch(setShowUpdateResultDialog(true));
            });
        handleClose();
        // TODO Gyms with 0 passes should disappear
    }

    const getPassDifference = gym => {
        const difference = passDifferences[gym]
        if (difference < 0) {
            return difference;
        } else {
            return "+" + difference;
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showConfirmationDialog}>
            <DialogTitle id="update-passes-dialog-title">Confirm changes:</DialogTitle>
            <List>
                {
                    Object.keys(passDifferences).map(gym => {
                        return <ListItem key={gym}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    {gym}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={getPassDifference(gym)} />
                        </ListItem>

                    })
                }
            </List>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleClose}
                >
                    No
                    </Button>
                <Button
                    color="primary"
                    onClick={onConfirm}
                >
                    Yes
                    </Button>
            </DialogActions>
        </Dialog>
    );
}
