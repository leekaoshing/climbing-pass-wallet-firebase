import Button from '@material-ui/core/Button';
import React from "react";
import { useDispatch } from 'react-redux';
import { signOut } from '../services/firebase';

export function SignOutButton() {
    const dispatch = useDispatch();

    const handleClick = () => {
        signOut();
    }

    return (
        <Button // TODO Fix change to dropdown menu
            color="inherit"
            aria-label="signout"
            // variant="outlined"
            onClick={handleClick}
        >
            Sign Out
        </Button>
    );
};