import { configureStore, createSlice } from '@reduxjs/toolkit';
import { screen } from '@testing-library/dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { firebaseReducer, isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import '../index.css';


// Your app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD3WTY0d0oHdZSxnAghqg-F7hKJ74jrtyA',
    authDomain: 'climbing-pass-wallet.firebaseapp.com',
    projectId: 'climbing-pass-wallet',
    storageBucket: 'climbing-pass-wallet.appspot.com',
    messagingSenderId: '287194549775',
    appId: '1:287194549775:web:b4792b4fd172931caf9d7a',
    measurementId: 'G-ZLTF129GET'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
if (window.location.hostname === "localhost") {  // Emulator
    firestore.useEmulator("localhost", 9091);
    auth.useEmulator('http://localhost:9099/');
}


const fullSlice = createSlice({
    name: 'full',
    initialState: {
        loggedIn: false,
        savedUser: null,
        loading: true,
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setSavedUser: (state, action) => {
            state.setSavedUser = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = false;
        }
    }
});

const selectLoggedIn = state => {
    return state.full.loggedIn;
}

const selectSavedUser = state => {
    return state.full.savedUser;
}

const selectLoading = state => {
    return state.full.loading;
}

const selectFirebaseAuth = state => {
    return state.firebase.auth;
}

const fullStore = configureStore({
    reducer: {
        full: fullSlice.reducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer
    }
})

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    onAuthStateChanged: (authData, firebase, dispatch) => {
        // Clear redux-firestore state if auth does not exist (i.e logout)
        if (!authData) {
            dispatch(setLoading(false));
            dispatch({ type: actionTypes.CLEAR_DATA })
        } else {
            dispatch(setSavedUser(authData));
        }
    }
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: fullStore.dispatch,
    createFirestoreInstance
};

const FullApp = () => {
    // const firebaseInRedux = useFirebase();
    // const firestore = useFirestore();

    // const authInRedux = useSelector(selectFirebaseAuth);
    // const loggedIn = useSelector(selectLoggedIn);
    // const savedUser = useSelector(selectSavedUser);

    const handleSubmit = async () => {
        // const auth = await firebaseInRedux.auth().signInWithEmailAndPassword('rban@mail.com', '123456');
        // setLoggedIn(true);
        // const user = await firestore.collection('users').doc(auth.uid).get();
        // console.log('FETCHED USER', user.data())
        // dispatch(setSavedUser(user.data()));
        // dispatch(setSavedUser(auth.uid));
    }

    return (
        <div>
            <button onClick={handleSubmit}>
                Submit
            </button>
            <div>
                {/* <p>{loggedIn}</p>
                <p>{savedUser}</p> */}
            </div>

        </div>
    );
}

const AuthIsLoaded = ({ children }) => {

    // const [loaded, setLoaded] = useState(false);
    // useEffect(() => {
    //     // simulate a fetch
    //     setTimeout(() => {
    //       setLoaded(true);
    //     }, 3000);
    //   }, []);
    const loading = useSelector(selectLoading);

    
    const authInRedux = useSelector(state => state.firebase.auth)
    if (!isLoaded(authInRedux)) return <div>splash screen...</div>;
    // if (!loaded) return <div>splash screen...</div>;
    // if (loading) return <div>splash screen...</div>
    return children
    // const [isChecked, setChecked] = useState(false);


    // function handleCheck() {
    //     // simulate a delay in state change
    //     setTimeout(() => {
    //         setChecked((prevChecked) => !prevChecked);
    //     }, 2000);
    // }
    // if (!isChecked) return <div><button onClick={handleCheck}>check me</button></div>;
    // return children;
}


jest.setTimeout(30000);
jest.disableAutomock()

describe.skip('Full end-to-end integration test', () => {
    jest.unmock('react-redux-firebase');

    beforeAll(() => {
        jest.useFakeTimers('modern');
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('Should login correctly', async () => {

        const { rerender } = render(
            <Provider store={fullStore}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <AuthIsLoaded>
                        <FullApp />
                    </AuthIsLoaded>
                </ReactReduxFirebaseProvider>
            </Provider>
        );


        // await screen.findAllByText(/Email/i)

        // fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'rban@mail.com' } });
        // fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });
        screen.debug()
        await screen.findByText(/splash/i);
        jest.advanceTimersByTime(3000);
        console.log('advanced time')
        await waitFor(() => expect(fullStore.getState().firebase.auth.isLoaded).toBe(true), {timeout:20000})
        
        screen.debug();
        await screen.findAllByText('Submit');
        fireEvent.click(screen.getByText(/Submit/i));
        // rerender(<FullApp store={importedStore} />, container);

        console.log('STATE', fullStore.getState())
        const username = await screen.findByLabelText(/Ray Ban/i);

        // await waitForElementToBeRemoved(() => screen.queryByLabelText('Email')).then(() => {
        //     console.log(importedStore.getState());
        //     // console.log('DONE HERE');
        //     screen.findByText(/Ray Ban/i).then(username => {
        //         expect(username).toBeInTheDocument();
        //     }).catch(err => {
        //         console.log('FAILED', err)
        //     })

        //     expect(appRender.asFragment()).toMatchSnapshot();
        // }).catch(err => {
        //     console.log('FAILED', err)
        // })
        // await screen.findAllByText(/Ray Ban/i)
        // const username = await screen.findByText(/Ray Ban/i)
        // expect(username).toBeInTheDocument();
        // appRender.update();
        // expect(appRender.asFragment()).toMatchSnapshot();
    })


});