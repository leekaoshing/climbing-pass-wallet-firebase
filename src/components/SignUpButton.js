import Button from '@material-ui/core/Button';
import React from "react";
import { useDispatch } from 'react-redux';
import {
    setShowCreateUserDialog
} from '../reducers/userSlice';

export function SignUpButton() {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setShowCreateUserDialog(true));
    }

    return (
        <Button
            color="inherit"
            // variant="contained"
            onClick={handleOpen}
        >
            Register
        </Button>
    );
};