import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { useSelector } from 'react-redux';
import { AboutDialogButton } from './AboutDialogButton';
import { ProfileMenuButton } from './ProfileMenuButton';
import { selectLoggedInUser } from '../selectors/firebase';

// import Button from '@material-ui/core/Button';
// import { firestore } from '../services/firebase'

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

    // const addGyms = () => { // TODO Remove this temporary function
    //     firestore.collection('gyms').doc('BM').set({
    //         id: 'BM',
    //         name: 'Boulder Movement'
    //     });
    //     firestore.collection('gyms').doc('FB').set({
    //         id: 'FB',
    //         name: 'Fit Bloc'
    //     });
    //     firestore.collection('gyms').doc('LH').set({
    //         id: 'LH',
    //         name: 'Lighthouse Climbing'
    //     });
    // }

    const showProfileMenu = useSelector(selectLoggedInUser);

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0}>
                <Toolbar style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton edge="start" className={classes.homeButton} color="inherit" aria-label="menu" onClick={() => window.location.reload()}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="body2" className={classes.title}>
                        Climbing Pass Wallet
                    </Typography>
                    <AboutDialogButton />
                    {
                        showProfileMenu ?
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&nbsp; <ProfileMenuButton /></div>
                            :
                            null
                    }
                    {/* <Button color="inherit" onClick={addGyms}>Add gyms</Button> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}