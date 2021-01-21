import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirestore } from 'react-redux-firebase';
import { setShowAddGymDialog, setShowConfirmationDialog } from '../reducers/dialogSlice';
import { getPassDifferences, selectEditableUser, selectLoadingUpdateUser, setEditableUser } from '../reducers/userSlice';
import { selectFirebaseAuth, selectGyms, selectLoggedInUser } from '../selectors/firebase';
import { AddGymDialog } from './AddGymDialog';
import { ConfirmationDialog } from './ConfirmationDialog';
import { UpdateResultDialog } from './UpdateResultDialog';
import { UserDetails } from './UserDetails';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    }
}));

export function Passes() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const firestore = useFirestore();

    const auth = useSelector(selectFirebaseAuth);
    const userInDatabase = useSelector(selectLoggedInUser);
    const loadingUpdateUser = useSelector(selectLoadingUpdateUser);

    // useEffect(() => {
    //     if (isLoaded(auth) && !isEmpty(auth)) {
    //         firestore.collection('users').doc(auth.uid).get().then(user => {
    //             dispatch(setEditableUser(user.data()));
    //         });
    //     }
    // }, [auth, dispatch, firestore])

    const openAddGymDialog = () => {
        dispatch(setShowAddGymDialog(true));
    }

    const resetEditableUser = () => {
        dispatch(setEditableUser(userInDatabase));
    }

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

                {
                    loadingUpdateUser ?
                        <CircularProgress />
                        :
                        <div>
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
                                Save &nbsp; <SaveIcon />
                            </Button>
                        </div>
                }

                <ConfirmationDialog />
                <UpdateResultDialog />
            </Paper>
        </div >
        : null
    );
}
