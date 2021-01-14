import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import store, { rrfConfig } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from 'firebase/app';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';


export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};


ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <App />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
