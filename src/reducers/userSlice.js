import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../selectors/firebase';
const axios = require('axios');

export const fetchUserByDisplayName = createAsyncThunk(
  'users/fetchByDisplayNameStatus',
  async (displayName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://192.168.1.19:8081/api/user/${encodeURIComponent(displayName.toLowerCase())}`);
      return response.data;
    } catch (err) {
      if (err.response === undefined) {
        return rejectWithValue(err.toJSON().message);
      }
      // TODO Handle page not found (err.response.data isn't a string, is object)
      return rejectWithValue(err.response.data);
    }
  }
)

export const createUser = createAsyncThunk(
  'users/createUserStatus',
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://192.168.1.19:8081/api/user/${encodeURIComponent(newUser.displayName.toLowerCase())}`, newUser);
      return response.data;
    } catch (err) {
      if (err.response === undefined) {
        return rejectWithValue(err.toJSON().message);
      }
      // TODO Handle page not found (err.response.data isn't a string, is object)
      return rejectWithValue(err.response.data);
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUserStatus',
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://192.168.1.19:8081/api/user/${encodeURIComponent(updatedUser.displayName.toLowerCase())}`, updatedUser);
      return response.data;
    } catch (err) {
      if (err.response === undefined) {
        return rejectWithValue(err.toJSON().message);
      }
      // TODO Handle page not found (err.response.data isn't a string, is object)
      return rejectWithValue(err.response.data);
    }
  }
)

export const differentiateUserPasses = (oldUser, newUser) => {
  const changedPasses = {};
  Object.keys(newUser.passes).forEach(key => {
    const oldPassQuantity = oldUser.passes[key];
    const newPassQuantity = newUser.passes[key];
    if (oldPassQuantity !== null && oldPassQuantity !== newPassQuantity) {
      changedPasses[key] = newPassQuantity;
    }
  })
  return changedPasses;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingUpdateUser: false,
    loadingCreateUser: false,
    loadingUser: false,
    fetchUserError: null,
    createUserError: null,
    databaseUser: null,
    currentUser: null,
    showAddGymDialog: false,

    passwordResetEmail: '',

    showCreateUserDialog: false,
    showLoginDialog: false,
    showAboutDialog: false,
    showPasswordResetDialog: false,
    editableUser: null,
    passDifferences: {},
    showConfirmationDialog: false,
    updateResult: {},
    showUpdateResultDialog: false,

    showConfirmation: false,
    showUpdateResult: false,
    successfullyCreatedUser: false,
    updateResult: ''
  },
  reducers: {
    incrementPass: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentUser.passes[action.payload] += 1
    },
    decrementPass: (state, action) => {
      state.currentUser.passes[action.payload] -= 1
    },
    requestConfirmation: (state) => {
      state.showConfirmation = true;
    },
    closeConfirmation: (state) => {
      state.showConfirmation = false;
    },
    showUpdateResultModal: (state) => {
      state.showUpdateResult = true;
    },
    closeUpdateResultModal: (state) => {
      state.showUpdateResult = false;
    },
    setShowCreateUserDialog: (state, action) => {
      state.showCreateUserDialog = action.payload;
    },
    setSuccessfullyCreatedUser: (state, action) => {
      state.successfullyCreatedUser = action.payload;
    },


    setShowAddGymDialog: (state, action) => {
      state.showAddGymDialog = action.payload;
    },
    setShowLoginDialog: (state, action) => {
      state.showLoginDialog = action.payload;
    },
    setShowAboutDialog: (state, action) => {
      state.showAboutDialog = action.payload;
    },
    setShowPasswordResetDialog: (state, action) => {
      state.showPasswordResetDialog = action.payload;
    },
    setPasswordResetEmail: (state, action) => {
      state.passwordResetEmail = action.payload;
    },
    setEditableUser: (state, action) => {
      state.editableUser = action.payload;
    },
    addGymToEditableUser: (state, action) => {
      state.editableUser.passes[action.payload] = 0
    },
    setPassDifferences: (state, action) => {
      state.passDifferences = action.payload;
    },
    setShowConfirmationDialog: (state, action) => {
      state.showConfirmationDialog = action.payload;
    },
    setUpdateResult: (state, action) => {
      state.updateResult = action.payload;
    },
    setShowUpdateResultDialog: (state, action) => {
      state.showUpdateResultDialog = action.payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUserByDisplayName.pending]: (state, action) => {
      state.fetchUserError = null;
      if (state.loadingUser === false) {
        state.loadingUser = true
      }
    },
    [fetchUserByDisplayName.fulfilled]: (state, action) => {
      const user = action.payload;
      if (user.passes === undefined) {
        user.passes = {};
      }
      state.fetchUserError = null;
      state.loadingUser = false;
      state.databaseUser = user;
      state.currentUser = user;
    },
    [fetchUserByDisplayName.rejected]: (state, action) => {
      if (state.loadingUser === true) {
        state.loadingUser = false
        state.fetchUserError = action.payload
        state.databaseUser = null;
        state.currentUser = null;
      }
    },

    [updateUser.pending]: (state, action) => {
      if (state.loadingUpdateUser === false) {
        state.loadingUpdateUser = true
      }
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loadingUpdateUser = false;
      state.databaseUser = state.currentUser;
      state.showUpdateResult = true;
      state.updateResult = 'Successfully updated!'
    },
    [updateUser.rejected]: (state, action) => {
      if (state.loadingUpdateUser === true) {
        state.loadingUpdateUser = false
        state.showUpdateResult = true;
        state.updateResult = 'ERROR: ' + action.payload
      }
    },

    [createUser.pending]: (state, action) => {
      if (state.loadingCreateUser === false) {
        state.loadingCreateUser = true
      }
    },
    [createUser.fulfilled]: (state, action) => {
      state.createUserError = null;
      state.loadingCreateUser = false;
      state.successfullyCreatedUser = true; // TODO Show user once it is created
    },
    [createUser.rejected]: (state, action) => {
      if (state.loadingCreateUser === true) {
        state.loadingCreateUser = false
        state.createUserError = action.payload
      }
    }
  }
});

export const {
  addGymToEditableUser,
  incrementPass,
  decrementPass,
  requestConfirmation,
  closeConfirmation,
  showUpdateResultModal,
  closeUpdateResultModal,

  setPasswordResetEmail,
  setShowAddGymDialog,
  setShowCreateUserDialog,
  setShowAboutDialog,
  setShowPasswordResetDialog,
  setEditableUser,
  setPassDifferences,
  setShowConfirmationDialog,
  setUpdateResult,
  setShowUpdateResultDialog,

  setSuccessfullyCreatedUser
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => {
  return state.user.currentUser;
}

export const selectDatabaseUser = state => {
  return state.user.databaseUser;
}

export const selectFetchUserError = state => {
  return state.user.fetchUserError;
}

export const selectCreateUserError = state => {
  return state.user.createUserError;
}

export const selectIsLoadingUser = state => {
  return state.user.loading;
}

export const selectIsLoadingUpdateUser = state => {
  return state.user.loadingUpdateUser;
}

export const selectIsLoadingCreateUser = state => {
  return state.user.loadingCreateUser;
}

export const selectShowConfirmation = state => {
  return state.user.showConfirmation;
}

export const selectShowUpdateResult = state => {
  return state.user.showUpdateResult;
}

export const selectShowAddGymDialog = state => {
  return state.user.showAddGymDialog;
}

export const selectShowCreateUserDialog = state => {
  return state.user.showCreateUserDialog;
}

export const selectShowLoginDialog = state => {
  return state.user.showLoginDialog;
}

export const selectSuccessfullyCreatedUser = state => {
  return state.user.successfullyCreatedUser;
}

export const selectShowAboutDialog = state => {
  return state.user.showAboutDialog;
}

export const selectShowPasswordResetDialog = state => {
  return state.user.showPasswordResetDialog;
}

export const selectPasswordResetEmail = state => {
  return state.user.passwordResetEmail;
}

export const selectEditableUser = state => {
  return state.user.editableUser;
}

export const selectPassDifferences = state => {
  return state.user.passDifferences;
}

export const selectShowConfirmationDialog = state => {
  return state.user.showConfirmationDialog;
}

export const selectUpdateResult = state => {
  return state.user.updateResult;
}

export const selectShowUpdateResultDialog = state => {
  return state.user.showUpdateResultDialog;
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
