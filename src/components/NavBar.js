import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { firestore } from '../services/firebase';
import { AboutDialogButton } from './AboutDialogButton';
import { ProfileMenuButton } from './ProfileMenuButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    homeButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    }
}));

export function NavBar() {
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
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" className={classes.homeButton} color="inherit" aria-label="menu" onClick={() => window.location.reload()}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="button" className={classes.title}>
                        Climbing Pass Wallet
                    </Typography>
                    <AboutDialogButton />
                    <Button color="inherit" onClick={addGyms}>Add gyms</Button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <ProfileMenuButton />
                </Toolbar>
            </AppBar>
        </div>
    );
}