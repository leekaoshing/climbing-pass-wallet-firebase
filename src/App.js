import React from 'react';
import UserProvider from './components/UserProvider'
import { Application } from './components/Application'
import './App.css';


function App() {
  return (
    <div className='App'>
      <UserProvider>
        <Application />
      </UserProvider>
    </div>
  );
}

export default App;
