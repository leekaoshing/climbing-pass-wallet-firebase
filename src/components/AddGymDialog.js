import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShowAddGymDialog,
    setShowAddGymDialog
} from '../reducers/dialogSlice';
import {
    addGymToEditableUser,
    selectEditableUser
} from '../reducers/userSlice';
import { selectGyms } from '../selectors/firebase';

export function AddGymDialog() {
    const dispatch = useDispatch();
    const gyms = useSelector(selectGyms);
    const user = useSelector(selectEditableUser);
    const showAddGymDialog = useSelector(selectShowAddGymDialog);

    const handleSelect = (gymId) => {
        dispatch(addGymToEditableUser(gymId));
        handleClose();
    };

    const handleClose = () => {
        dispatch(setShowAddGymDialog(false));
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showAddGymDialog}>
            <DialogTitle id="add-gym-dialog-title">Add new gym:</DialogTitle>
            <List>
                {
                    Object.keys(gyms).map(id => {
                        if (user.passes != null && !Object.keys(user.passes).includes(id)) {
                            return (
                                <ListItem key={id} button onClick={() => handleSelect(id)}>
                                    <ListItemText primary={gyms[id].name} />
                                </ListItem>
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </List>
        </Dialog>
    );
}
