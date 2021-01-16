import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AboutDialogButton } from './AboutDialogButton';
import { LoginButton } from './LoginButton';
import { SignUpButton } from './SignUpButton';
import { signOut } from '../services/firebase';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
}));

export function NavBar() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = null;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <AboutDialogButton />
                    {
                        user ?
                            <span><Button color="inherit">Home</Button></span>
                            :
                            <span>
                                <SignUpButton />
                                <LoginButton />
                                <Button // TODO Fix
                                    aria-label="signout"
                                    variant="outlined"
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </Button>
                            </span>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}