import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    closeConfirmation,
    differentiateUserPasses,
    selectShowConfirmation,
    selectDatabaseUser,
    selectUser,
    updateUser
} from '../../reducers/userSlice';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
}));

export function ConfirmationDialog() {
    const dispatch = useDispatch();
    const updatedUser = useSelector(selectUser);
    const databaseUser = useSelector(selectDatabaseUser);
    const showConfirmation = useSelector(selectShowConfirmation);

    const classes = useStyles();

    const handleClose = () => {
        dispatch(closeConfirmation());
    }

    const onConfirm = () => {
        handleClose();
        dispatch(updateUser(updatedUser));
    }

    const passDifference = differentiateUserPasses(databaseUser, updatedUser);

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showConfirmation}>
            <DialogTitle id="update-passes-dialog-title">Confirm changes:</DialogTitle>
            <List>
                {
                    Object.keys(passDifference).map(gym => {
                        return <ListItem key={gym}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    {gym}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={passDifference[gym]} />
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
