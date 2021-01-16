import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import {
    resetUser, showAddGymDialog
} from '../reducers/userSlice';
import { selectFirestoreAuth } from '../selectors/firebase';
import { firestore, getUser } from '../services/firebase';
// import { AddGymDialog } from './AddGymDialog';
import { UserDetails } from './UserDetails';



export function Test() {


    const [user, setUser] = useState({});

    const auth = useSelector((state) => state.firebase.auth);

    useFirestoreConnect(['users']);
    

    // const firestore = useFirestore();
    // firestore.collection("users").doc(auth.uid).get().then(u => {
    //     console.log('direct firestore get', u.data());
    // })

    // const user4 = getUser(auth).then(user3 => {
    //     console.log('user3', user3);
    //     return user3
    // })


    const data = useSelector((state) => state.firestore.data);
    console.log('data', data.users);

    // const user = useSelector((state) => state.firestore.data.users[auth.uid]);
    // console.log('user', user);

    return (
        <div>{JSON.stringify(data)}</div>
    );
}
