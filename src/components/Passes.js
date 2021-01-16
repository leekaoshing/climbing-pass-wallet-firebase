import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectEditableUser, selectPassDifferences, setEditableUser, setShowAddGymDialog, setShowConfirmationDialog, getPassDifferences
} from '../reducers/userSlice';
import { selectFirestoreAuth, selectGyms, selectLoggedInUser } from '../selectors/firebase';
import { AddGymDialog } from './AddGymDialog';
import { ConfirmationDialog } from './ConfirmationDialog';
import { UpdateResultDialog } from './UpdateResultDialog';
import { UserDetails } from './UserDetails';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { firestore } from '../services/firebase';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    }
}));

export function Passes() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const auth = useSelector(selectFirestoreAuth);
    const userInDatabase = useSelector(selectLoggedInUser);
    const updatedUser = useSelector(selectEditableUser)

    useEffect(() => {
        if (isLoaded(auth) && !isEmpty(auth)) {
            firestore.collection('users').doc(auth.uid).get().then(user => {
                dispatch(setEditableUser(user.data()));
            });
        }
    }, [])

    const openAddGymDialog = () => {
        dispatch(setShowAddGymDialog(true));
    }

    const resetEditableUser = () => {
        dispatch(setEditableUser(userInDatabase));
    }

    // const passDifferences = useSelector(selectPassDifferences);
    const passDifferences = useSelector(getPassDifferences);

    const disableSubmit = Object.keys(passDifferences).length === 0 || Object.values(passDifferences).every(v => v === 0)

    const requestConfirmation = () => {
        dispatch(setShowConfirmationDialog(true));
    }

    const gyms = useSelector(selectGyms)
    const user = useSelector(selectEditableUser);
    const allLoaded = user && gyms;

    

    return (allLoaded ?
        <div>
            <AddGymDialog />
            <UserDetails user={user} gyms={gyms} />
            <Paper className={classes.paper} elevation={0}>
                <Button
                    aria-label="addGym"
                    variant="outlined"
                    onClick={openAddGymDialog}
                >
                    Add gym
                </Button>
                <br />
                <br />

                {/* {isLoadingUpdateUser ? // TODO Set Loading bar
                    <CircularProgress />
                    : */}

                <Button
                    variant="outlined"
                    onClick={resetEditableUser}
                >
                    Reset &nbsp; <ReplayIcon />
                </Button>
                        &nbsp; &nbsp;
                <Button
                    disabled={disableSubmit}
                    aria-label="saveChanges"
                    color="primary"
                    variant="outlined"
                    onClick={requestConfirmation}
                >
                    Save changes &nbsp; <SaveIcon />
                </Button>

                <ConfirmationDialog />
                <UpdateResultDialog />
            </Paper>
        </div >
        : null
    );
}
