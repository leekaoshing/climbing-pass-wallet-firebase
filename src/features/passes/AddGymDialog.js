import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addGymToUser,
    closeAddGymDialog,
    selectShowAddGymDialog,
    selectUser
} from './userSlice';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchGyms, selectGyms } from './gymSlice';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export function AddGymDialog() {
    const dispatch = useDispatch();
    const gyms = useSelector(selectGyms);
    const user = useSelector(selectUser);
    const showAddGymDialog = useSelector(selectShowAddGymDialog);

    const handleSelect = (gymId) => {
        dispatch(addGymToUser(gymId));
        dispatch(closeAddGymDialog());
    };

    const handleClose = () => {
        dispatch(closeAddGymDialog());
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={showAddGymDialog}>
            <DialogTitle id="add-gym-dialog-title">Add new gym:</DialogTitle>
            <List>
                {
                    gyms.map(gym => {
                        if (user.passes != null && !Object.keys(user.passes).includes(gym.id)) {
                            return <ListItem key={gym.id} button onClick={() => handleSelect(gym.id)}>
                                <ListItemText primary={gym.name} />
                            </ListItem>
                        }
                    })
                }
            </List>
        </Dialog>

        // <div>
        //     <FormControl className={classes.formControl}>
        //         <InputLabel htmlFor="gym-native-simple">Add gym</InputLabel>
        //         <Select
        //             native
        //             value={gym}
        //             onChange={handleChange}
        //             inputProps={{
        //                 name: 'gym',
        //                 id: 'gym-native-simple',
        //             }}
        //         >
        //             <option aria-label="None" value="" />
        //             {optionDivs}
        //         </Select>
        //     </FormControl>
        // </div>
    );
}
