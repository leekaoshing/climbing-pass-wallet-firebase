import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    editableUser: null,
    loadingUpdateUser: false,
    updateResult: null,
  },
  reducers: {
    addGymToEditableUser: (state, action) => {
      state.editableUser.passes[action.payload] = 0
    },
    setEditableUser: (state, action) => {
      state.editableUser = action.payload;
    },
    setLoadingUpdateUser: (state, action) => {
      state.loadingUpdateUser = action.payload;
    },
    setUpdateResult: (state, action) => {
      state.updateResult = action.payload;
    }
  }
});

export const {
  addGymToEditableUser,
  setEditableUser,
  setLoadingUpdateUser,
  setUpdateResult
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectEditableUser = state => {
  return state.user.editableUser;
}

export const selectLoadingUpdateUser = state => {
  return state.user.loadingUpdateUser;
}

export const selectUpdateResult = state => {
  return state.user.updateResult;
}

export const getPassDifferences = state => {
  const auth = state.firebase.auth;
  const oldPasses = state.firestore.data.users[auth.uid].passes;
  const newPasses = state.user.editableUser ? state.user.editableUser.passes : {};

  const differenceInPasses = {};
  Object.keys(newPasses).forEach(key => {
    const oldPassQuantity = oldPasses[key] === undefined ? 0 : oldPasses[key];
    const newPassQuantity = newPasses[key];
    const change = newPassQuantity - oldPassQuantity;
    if (change !== 0) differenceInPasses[key] = newPassQuantity - oldPassQuantity;
  })
  return differenceInPasses;
}

export default userSlice.reducer;
