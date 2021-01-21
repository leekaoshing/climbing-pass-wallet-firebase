import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import dialogReducer from '../reducers/dialogSlice'
import userReducer from '../reducers/userSlice'

export const makeStore = (initialState) => {
  return configureStore({ 
    reducer: {
      user: userReducer,
      dialog: dialogReducer
    },
    preloadedState: initialState
   })
}

const wrapComponent = (Component, store, props = {}) => {
  return (
    <Provider store={store}>
        <Component {...props} />
    </Provider>
  )
}

export default wrapComponent