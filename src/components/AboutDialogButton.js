import Button from '@material-ui/core/Button';
import React from "react";
import { useDispatch } from 'react-redux';
import {
    setShowAboutDialog
} from '../reducers/userSlice';

export function AboutDialogButton() {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setShowAboutDialog(true));
    }

    return (
        <Button
            color="inherit"
            onClick={handleOpen}
        >
            About
        </Button>
    );
};