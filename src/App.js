import React from 'react';
import './App.css';
import { Application } from './components/Application';
import UserProvider from './components/UserProvider';

function App() {
  return (
    <div className='App'>
      {/* <UserProvider> */}
        <Application />
      {/* </UserProvider> */}
    </div>
  );
}

export default App;
