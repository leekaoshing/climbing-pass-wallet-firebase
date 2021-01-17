import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    editableUser: null,
    loadingUpdateUser: false,
    showAboutDialog: false,
    showAddGymDialog: false,
    showConfirmationDialog: false,
    showCreateUserDialog: false,
    showLoginDialog: false,
    showPasswordResetDialog: false,
    showUpdateResultDialog: false,
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
    setPassDifferences: (state, action) => {
      state.passDifferences = action.payload;
    },
    setShowAboutDialog: (state, action) => {
      state.showAboutDialog = action.payload;
    },
    setShowAddGymDialog: (state, action) => {
      state.showAddGymDialog = action.payload;
    },
    setShowConfirmationDialog: (state, action) => {
      state.showConfirmationDialog = action.payload;
    },
    setShowLoginDialog: (state, action) => {
      state.showLoginDialog = action.payload;
    },
    setShowPasswordResetDialog: (state, action) => {
      state.showPasswordResetDialog = action.payload;
    },
    setShowUpdateResultDialog: (state, action) => {
      state.showUpdateResultDialog = action.payload;
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
  setPassDifferences,
  setShowAboutDialog,
  setShowAddGymDialog,
  setShowConfirmationDialog,
  setShowCreateUserDialog,
  setShowPasswordResetDialog,
  setShowUpdateResultDialog,
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

export const selectPassDifferences = state => {
  return state.user.passDifferences;
}

export const selectShowAboutDialog = state => {
  return state.user.showAboutDialog;
}

export const selectShowAddGymDialog = state => {
  return state.user.showAddGymDialog;
}

export const selectShowConfirmationDialog = state => {
  return state.user.showConfirmationDialog;
}

export const selectShowCreateUserDialog = state => {
  return state.user.showCreateUserDialog;
}

export const selectShowPasswordResetDialog = state => {
  return state.user.showPasswordResetDialog;
}

export const selectShowUpdateResultDialog = state => {
  return state.user.showUpdateResultDialog;
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
