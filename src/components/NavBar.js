import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AboutDialogButton } from './AboutDialogButton';
import { SignOutButton } from './SignOutButton';
import { firestore } from '../services/firebase';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    homeButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
}));

export function NavBar() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const addGyms = () => { // TODO Remove this temporary function
        firestore.collection('gyms').doc('BM').set({
            id: 'BM',
            name: 'Boulder Movement'
        });
        firestore.collection('gyms').doc('FB').set({
            id: 'FB',
            name: 'Fit Bloc'
        });
        firestore.collection('gyms').doc('LH').set({
            id: 'LH',
            name: 'Lighthouse Climbing'
        });
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.homeButton} color="inherit" aria-label="menu" onClick={() =>window.location.reload()}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="button" className={classes.title}>
                        Climbing Pass Wallet
                    </Typography>
                    <AboutDialogButton />
                    {/* <Button color="inherit" onClick={addGyms}>Add gyms</Button> */}
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <SignOutButton />
                    {/* {
                        user ?
                            <span>
                                <Button color="inherit">Home</Button>
                            </span>
                            :
                            <span>
                                
                            </span>
                    } */}
                </Toolbar>
            </AppBar>
        </div>
    );
}