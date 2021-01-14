import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Passes } from './features/passes/Passes';
import { CreateUserForm } from './features/passes/CreateUserForm';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className="App">
      <Container maxWidth="xs">
        
      <header style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
        Welcome to your climbing pass wallet
        
        &nbsp; &nbsp;
        <CreateUserForm />
      </header>
      
        <Passes />
      </Container>
    </div>
  );
}

export default App;
