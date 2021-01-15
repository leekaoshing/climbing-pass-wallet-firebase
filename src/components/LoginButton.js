import Button from '@material-ui/core/Button';
import React from "react";
import { useDispatch } from 'react-redux';
import {
    setShowLoginDialog
} from '../reducers/userSlice';

export function LoginButton() {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setShowLoginDialog(true));
    }

    return (
        <Button
            color="inherit"
            // variant="contained"
            onClick={handleOpen}
        >
            Log In
        </Button>
    );
};