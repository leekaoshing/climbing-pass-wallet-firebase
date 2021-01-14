import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addGymToUser,
  decrementPass,
  fetchUserByUsername,
  incrementPass,
  requestConfirmation,
  selectError,
  selectIsLoadingUser,
  selectIsLoadingUpdateUser,
  selectUser,
  selectShowConfirmation,
  selectDatabaseUser,
  differentiateUserPasses,
  showAddGymDialog
} from './userSlice';
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

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

export function Passes() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (gyms.length === 0) {
      dispatch(fetchGyms());
    }
  }, [])

  const user = useSelector(selectUser);
  const databaseUser = useSelector(selectDatabaseUser);
  const isLoadingUser = useSelector(selectIsLoadingUser);
  const isLoadingUpdateUser = useSelector(selectIsLoadingUpdateUser);
  const gyms = useSelector(selectGyms);

  return (
    <div>
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
              <Button
                disabled={Object.keys(differentiateUserPasses(databaseUser, user)).length === 0}
                aria-label="saveChanges"
                color="primary"
                variant="outlined"
                onClick={() => dispatch(requestConfirmation())}
              >
                  Save changes
              </Button>
              }
              <ConfirmationDialog />

              <UpdateResultDialog />
              <br />
              <br />
            </div>
            :
            null
      }
    </div>
  );
}
