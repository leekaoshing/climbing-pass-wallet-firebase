import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/passes/userSlice';
import gymReducer from '../features/passes/gymSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    gym: gymReducer
  },
});
