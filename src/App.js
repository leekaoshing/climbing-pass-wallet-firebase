import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { default as React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useCheckMobileScreen } from './actions/actions';
import './App.css';
import { AboutDialog } from './components/AboutDialog';
import { Login } from './components/Login';
import { NavBar } from './components/NavBar';
import { Passes } from './components/Passes';
import { SignUpDialog } from './components/SignUpDialog';
import { selectGyms, selectLoggedInUser, selectUsers } from './selectors/firebase';

const getScreenSize = isMobile => {
  if (isMobile) {
    return 'xs';
  } else {
    return 'sm';
  }
}

function App() {
  const auth = useSelector((state) => state.firebase.auth);

  const isScreenSizeMobile = useCheckMobileScreen();

  const [loading, setLoading] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const users = useSelector(selectUsers);

  useFirestoreConnect([
    {
      collection: 'users'
    },
    {
      collection: 'gyms'
    }
  ])
  const gyms = useSelector(selectGyms);

  const loggedInUser = useSelector(selectLoggedInUser);
  useEffect(() => {
    setLoading(!isLoaded(auth) || (!isEmpty(auth) && (!users || !Object.keys(users).includes(auth.uid))));
    setShowUser(loggedInUser);
  }, [auth, users, loggedInUser])

  return (
    <div className="App" style={{ backgroundColor: 'white', height: '100vh', minHeight: '100vh' }}>
      <NavBar />
      <Container maxWidth={getScreenSize(isScreenSizeMobile)}>

        <AboutDialog />
        <SignUpDialog />
        {/* {
          users && users[auth.uid] ?
            <Passes />
            :
            <Login />
        } */}

        {
          loading ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <br /><br /><br /><br /><br />
              <CircularProgress />
            </div>
            :
            showUser ?
              <Passes />
              :
              <Login />
        }
        <br />
        <br />
      </Container>
    </div>
  );
}

export default App;