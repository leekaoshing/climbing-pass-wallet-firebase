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
import { selectShowConfirmationDialog, setShowConfirmationDialog } from '../reducers/dialogSlice';
import { getPassDifferences } from '../reducers/userSlice';
import { updateUserInFireStore } from '../services/firebase';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
}));

export function ConfirmationDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();


    const showConfirmationDialog = useSelector(selectShowConfirmationDialog);
    const passDifferences = useSelector(getPassDifferences);

    const onClose = () => {
        dispatch(setShowConfirmationDialog(false));
    }

    const onConfirm = () => {
        dispatch(updateUserInFireStore());
        onClose();
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
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={showConfirmationDialog}>
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
                    onClick={onClose}
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
