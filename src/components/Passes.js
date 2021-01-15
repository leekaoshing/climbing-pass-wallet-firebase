import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from "react-redux-firebase";
import {
    differentiateUserPasses, requestConfirmation,
    resetUser,





    selectDatabaseUser, selectIsLoadingUpdateUser, selectIsLoadingUser,

    selectUser,



    showAddGymDialog
} from '../reducers/userSlice';
import { selectFirestoreAuth, selectGyms, selectUserByUid } from '../selectors/firebase';
// import { AddGymDialog } from './AddGymDialog';
import { UserDetails } from './UserDetails';



export function Passes() {
    const dispatch = useDispatch();

    const auth = useSelector(selectFirestoreAuth);
    console.log('passes auth', auth);
    // Add user to redux store
    useFirestoreConnect([// TODO NOT LOADING DATA IN SUDDENLY
        {
            collection: 'users',
            doc: auth.uid
        },
        {
            collections: 'gyms'
        }
    ])
    // const user = useSelector(state => state.firestore.data.users[auth.uid])
    // const user = useSelector(
    //     ({ firestore: { data } }) => data.users && data.users[auth.uid]
    //   )
    
    // console.log('firestore user', user);

    // const users = useSelector(
    //     ({ firestore: { data } }) => data.users
    //   )
    
    // console.log('firestore users collection', users);

    const data = useSelector(state => state.firestore.data)
    
    console.log('firestore data', data);

    // TODO Load initial passes state into another variable for changes

    // Add gyms to redux store
    // useFirestoreConnect(['gyms'])
    // const gyms = useSelector(selectGyms)
    // console.log('firestore gyms', gyms)


    // const [newPasses, setNewPasses] = useState(user.passes);



    // const user = useSelector(selectUser);
    // const databaseUser = useSelector(selectDatabaseUser);
    // const isLoadingUser = useSelector(selectIsLoadingUser);
    // const isLoadingUpdateUser = useSelector(selectIsLoadingUpdateUser);
    // const gyms = useSelector(selectGyms);

    return (
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
    );
}
