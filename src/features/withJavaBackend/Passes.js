import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addGymToUser,
  decrementPass,
  fetchUserByDisplayName,
  incrementPass,
  requestConfirmation,
  resetUser,
  selectError,
  selectIsLoadingUser,
  selectIsLoadingUpdateUser,
  selectUser,
  selectShowConfirmation,
  selectDatabaseUser,
  differentiateUserPasses,
  showAddGymDialog
} from '../../reducers/userSlice';
import {
  fetchGymById,
  fetchGyms,
  selectGyms,
  selectGymNameForId,
} from './gymSlice';
import { makeStyles } from '@material-ui/core/styles';
import { ConfirmationDialog } from './ConfirmationDialog';
import { UpdateResultDialog } from './UpdateResultDialog';
import { AddGymDialog } from './AddGymDialog';
import { UserDetails } from './UserDetails';
import { UserSearch } from './UserSearch';
import { CreateUserForm } from './CreateUserForm';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';

import { useFirestoreConnect } from "react-redux-firebase";

export function Passes() {
  const dispatch = useDispatch();

  // const auth = useSelector((state) => state.firebase.auth);

  // // Add user to redux store
  // useFirestoreConnect([
  //   {
  //     collection: 'users',
  //     doc: auth.uid
  //   }
  // ])
  // const user = useSelector(
  //   ({ firestore: { data } }) => data.users && data.users[auth.uid]
  // )
  // console.log('firestore user', user);
  // // TODO Load initial passes state into another variable for changes

  // // Add gyms to redux store
  // useFirestoreConnect(['gyms'])
  // const gyms = useSelector((state) => state.firestore.data.gyms)
  // console.log('firestore gyms', gyms)

  
  // const [newPasses, setNewPasses] = useState(user.passes);
  


  const user = useSelector(selectUser);
  const databaseUser = useSelector(selectDatabaseUser);
  const isLoadingUser = useSelector(selectIsLoadingUser);
  const isLoadingUpdateUser = useSelector(selectIsLoadingUpdateUser);
  const gyms = useSelector(selectGyms);

  return (
    <Container maxWidth="xs">
      <header style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      Welcome to your climbing pass wallet!
      
      &nbsp; &nbsp;
        <CreateUserForm />
      </header>

      <UserSearch />
      {
        isLoadingUser ?
          <CircularProgress />
          :
          user !== null ?
            <div>

              <UserDetails />
              <Button
                aria-label="addGym"
                variant="outlined"
                onClick={() => dispatch(showAddGymDialog())}
              >
                Add gym
              </Button>
              <AddGymDialog />

              <br />
              <br />

              {isLoadingUpdateUser ?
                <CircularProgress />
                :
                <div>
                  <Button
                  variant="outlined"
                  onClick={() => dispatch(resetUser())}
                >
                    Reset &nbsp; <ReplayIcon />
                </Button>
                &nbsp; &nbsp;
                <Button
                  disabled={Object.keys(differentiateUserPasses(databaseUser, user)).length === 0}
                  aria-label="saveChanges"
                  color="primary"
                  variant="outlined"
                  onClick={() => dispatch(requestConfirmation())}
                >
                    Save changes &nbsp; <SaveIcon />
                </Button>
              </div>
              }
              <ConfirmationDialog />

              <UpdateResultDialog />
              <br />
              <br />
            </div>
            :
            null
      }
    </Container>
  );
}
