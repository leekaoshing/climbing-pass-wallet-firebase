import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from "react-redux-firebase";
import {
    resetUser, showAddGymDialog
} from '../reducers/userSlice';
import { selectFirestoreAuth, selectGyms, selectLoggedInUser } from '../selectors/firebase';
import { signOut } from '../services/firebase';
// import { AddGymDialog } from './AddGymDialog';
import { UserDetails } from './UserDetails';



export function Passes() {
    const dispatch = useDispatch();

    const auth = useSelector(selectFirestoreAuth);
    console.log('passes auth', auth);

    useFirestoreConnect([
        {
            collection: 'users',
            doc: auth.uid
        },
        {
            collection: 'gyms'
        }
    ]);

    const gyms = useSelector(selectGyms)


    const loggedInUser = useSelector(selectLoggedInUser);

    const isLoaded = loggedInUser && gyms;

    return (isLoaded ?
        <div>
            <div>
                <UserDetails />
                <Button
                    aria-label="addGym"
                    variant="outlined"
                    onClick={() => dispatch(showAddGymDialog())}
                >
                    Add gym
                </Button>
                <Button
                    aria-label="signout"
                    variant="outlined"
                    onClick={() => signOut()}
                >
                    Sign out
                </Button>
                {/* <AddGymDialog /> */}

                <br />
                <br />

                {/* {isLoadingUpdateUser ?
                    <CircularProgress />
                    : */}
                <div>
                    <Button
                        variant="outlined"
                        onClick={() => dispatch(resetUser())}
                    >
                        Reset &nbsp; <ReplayIcon />
                    </Button>
                        &nbsp; &nbsp;
                        {/* <Button
                            disabled={Object.keys(differentiateUserPasses(databaseUser, user)).length === 0}
                            aria-label="saveChanges"
                            color="primary"
                            variant="outlined"
                            onClick={() => dispatch(requestConfirmation())}
                        >
                            Save changes &nbsp; <SaveIcon />
                        </Button> */}
                </div>
                {/* } */}
                {/* <ConfirmationDialog /> */}

                {/* <UpdateResultDialog /> */}
                <br />
                <br />
            </div>
        </div>
        : null
    );
}
