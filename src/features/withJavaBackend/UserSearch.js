import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUserByDisplayName,
    selectFetchUserError,
} from '../../reducers/userSlice';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';

export function UserSearch() {
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const fetchUserError = useSelector(selectFetchUserError);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TextField
                error={fetchUserError !== null}
                id="outlined-error-helper-text"
                label="Enter displayName"
                helperText={fetchUserError}
                variant="outlined"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        dispatch(fetchUserByDisplayName(displayName))
                    }
                }}
            />
            &nbsp; &nbsp;
            <Button
                disabled={displayName === ''}
                color="primary"
                variant="outlined"
                onClick={() => {
                    dispatch(fetchUserByDisplayName(displayName))
                }}
            >
                Search
            </Button>
        </div>
    );
}
