import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    decrementPass,
    differentiateUserPasses,
    incrementPass,
    selectUser,
    selectDatabaseUser,
    resetUser,
} from '../../reducers/userSlice';
import {
    fetchGyms,
    selectGyms,
} from './gymSlice';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { blue } from '@material-ui/core/colors';

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
}));

export function UserDetails() {
    const dispatch = useDispatch();

    const databaseUser = useSelector(selectDatabaseUser);
    const user = useSelector(selectUser);
    const gyms = useSelector(selectGyms);

    const passDifferences = databaseUser === null ? {} : differentiateUserPasses(databaseUser, user);

    const getTextStyle = (gym) => {
        if (passDifferences[gym] !== undefined) {
            return { color: blue[600], fontWeight: 'bold', fontSize: '14px' };
        }
        return { fontSize: '14px' };
    }

    const classes = useStyles();
    var counter = 0;
    console.log('otan', user.passes.size)

    return (
        user !== null ?
            <div className={classes.root}>
                <List>
                    <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper className={classes.paper} elevation={2}>
                            {user['firstName'] + ' ' + user['lastName'] + ' ('}<i>{user['username']}</i>{')'}
                        </Paper>
                    </ListItem>
                    {   
                        user !== null && user['passes'] !== null ?
                            Object.keys(user['passes']).length !== 0 ?
                                Object.keys(user['passes'])
                                    .sort()
                                    .map(gym => {
                                        counter += 1;
                                        return <div key={gym}>
                                            {counter !== 1 ? <Divider variant="middle" /> : null}
                                            <ListItem style={{ height: '60px' }}>
                                                <Grid container>
                                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Avatar className={classes.avatar}>
                                                            {gym}
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: '12px' }}>{gyms.find(g => g.id === gym)['name']}</span>
                                                    </Grid>
                                                    <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <IconButton aria-label="decrementPass" onClick={() => dispatch(decrementPass(gym))}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={getTextStyle(gym)}>{user['passes'][gym]}</span>
                                                    </Grid>
                                                    <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <IconButton aria-label="incrementPass" onClick={() => dispatch(incrementPass(gym))}>
                                                            <AddIcon />
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