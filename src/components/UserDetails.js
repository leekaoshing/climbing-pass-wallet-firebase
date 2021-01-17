import Avatar from '@material-ui/core/Avatar';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { blue } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    findPassDifferences
} from '../actions/actions';
import { getPassDifferences, setEditableUser, setPassDifferences } from '../reducers/userSlice';
import {
    selectLoggedInUser
} from '../selectors/firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buyButton: {
        color: blue[600],
    }
}));

export function UserDetails(props) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const editableUser = props.user;
    const gyms = props.gyms;

    const userInDatabase = useSelector(selectLoggedInUser);

    const passDifferences = useSelector(getPassDifferences);

    const getTextStyle = gym => {
        if (passDifferences[gym] && passDifferences[gym] !== 0) {
            return { color: blue[600], fontWeight: 'bold', fontSize: '14px' };
        }
        return { fontSize: '14px' };
    }

    const openGymLink = gymId => {
        window.open(gyms[gymId]['appUrl'] ? gyms[gymId]['appUrl'] : gyms[gymId]['url']);
    }

    const changePass = (gym, change) => {
        const currentPassCount = editableUser.passes[gym];
        if (currentPassCount === 0 && change < 0) {
            return;
        }
        const updatedUser = {
            ...editableUser,
            passes: {
                ...editableUser.passes,
                [gym]: currentPassCount + change
            }
        }
        const newPassDifferences = findPassDifferences(userInDatabase.passes, updatedUser.passes);
        dispatch(setPassDifferences(newPassDifferences));
        dispatch(setEditableUser(updatedUser))
    }

    var counter = 0;

    const updatedPasses = editableUser.passes;

    return (
        editableUser !== null ?
            <div className={classes.root}>
                <List>
                    <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper className={classes.paper} elevation={2}>
                            <span>{`${editableUser.firstName} ${editableUser.lastName}`} &nbsp; ({<i>{editableUser.displayName}</i>})</span>
                        </Paper>
                    </ListItem>
                    {
                        updatedPasses !== null ?
                            Object.keys(updatedPasses).length !== 0 ?
                                Object.keys(updatedPasses)
                                    .sort()
                                    .map(gymId => {
                                        counter += 1;
                                        return <div key={gymId}>
                                            {counter !== 1 ? <Divider variant="middle" /> : null}
                                            <ListItem style={{ height: '60px' }}>
                                                <Grid container>
                                                    <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Avatar className={classes.avatar}>
                                                            {gymId}
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item xs={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: '12px' }}>{gyms[gymId]['name']}</span>
                                                    </Grid>
                                                    <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <IconButton aria-label="decrementPass" onClick={() => changePass(gymId, -1)}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={getTextStyle(gymId)}>{updatedPasses[gymId]}</span>
                                                    </Grid>
                                                    <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <IconButton aria-label="incrementPass" onClick={() => changePass(gymId, 1)}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconButton aria-label="buyPasses" onClick={() => openGymLink(gymId)} className={classes.buyButton} variant="contained">
                                                        <span style={{ fontSize: 8 }}>Buy</span> &nbsp; <CallMadeIcon style={{ fontSize: 8 }}/>
                                                    </IconButton>    
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        </div>
                                    })
                                :
                                <ListItem style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><b>No passes here yet. Try adding some!</b></ListItem>
                            :
                            null
                    }
                </List>
            </div>
            :
            null
    );
}