import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUserByUsername,
    selectFetchUserError,
} from '../../reducers/userSlice';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';

export function UserSearch() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const fetchUserError = useSelector(selectFetchUserError);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TextField
                error={fetchUserError !== null}
                id="outlined-error-helper-text"
                label="Enter username"
                helperText={fetchUserError}
                variant="outlined"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        dispatch(fetchUserByUsername(username))
                    }
                }}
            />
            &nbsp; &nbsp;
            <Button
                disabled={username === ''}
                color="primary"
                variant="outlined"
                onClick={() => {
                    dispatch(fetchUserByUsername(username))
                }}
            >
                Search
            </Button>
        </div>
    );
}
