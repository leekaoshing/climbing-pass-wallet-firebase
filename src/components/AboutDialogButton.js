import Button from '@material-ui/core/Button';
import React from "react";
import { useDispatch } from 'react-redux';
import {
    setShowAboutDialog
} from '../reducers/dialogSlice';

export function AboutDialogButton() {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setShowAboutDialog(true));
    }

    return (
        <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleOpen}
        >
            About
        </Button>
    );
};