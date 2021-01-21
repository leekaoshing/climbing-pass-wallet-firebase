import { createSlice } from '@reduxjs/toolkit';

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    showAboutDialog: false,
    showAddGymDialog: false,
    showConfirmationDialog: false,
    showCreateUserDialog: false,
    showPasswordResetDialog: false,
    showUpdateResultDialog: false,
  },
  reducers: {
    setShowAboutDialog: (state, action) => {
      state.showAboutDialog = action.payload;
    },
    setShowAddGymDialog: (state, action) => {
      state.showAddGymDialog = action.payload;
    },
    setShowConfirmationDialog: (state, action) => {
      state.showConfirmationDialog = action.payload;
    },
    setShowCreateUserDialog: (state, action) => {
      state.showCreateUserDialog = action.payload;
    },
    setShowPasswordResetDialog: (state, action) => {
      state.showPasswordResetDialog = action.payload;
    },
    setShowUpdateResultDialog: (state, action) => {
      state.showUpdateResultDialog = action.payload;
    }
  }
});

export const {
  setShowAboutDialog,
  setShowAddGymDialog,
  setShowConfirmationDialog,
  setShowCreateUserDialog,
  setShowPasswordResetDialog,
  setShowUpdateResultDialog,
} = dialogSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectShowAboutDialog = state => {
  return state.dialog.showAboutDialog;
}

export const selectShowAddGymDialog = state => {
  return state.dialog.showAddGymDialog;
}

export const selectShowConfirmationDialog = state => {
  return state.dialog.showConfirmationDialog;
}

export const selectShowCreateUserDialog = state => {
  return state.dialog.showCreateUserDialog;
}

export const selectShowPasswordResetDialog = state => {
  return state.dialog.showPasswordResetDialog;
}

export const selectShowUpdateResultDialog = state => {
  return state.dialog.showUpdateResultDialog;
}

export default dialogSlice.reducer;
