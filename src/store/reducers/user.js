import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  passes: null,
  updateResult: null,
  userSearchList: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // addGymToUser: (state, action) => {
    //   state.passes[action.payload] = 0
    // },
    addUserToSearchList: (state, action) => {
      const user = action.payload
      state.userSearchList[user.email] = user
    },
    removeUserFromSearchList: (state, action) => {
      delete state.userSearchList[action.payload]
    },
    setPassesForGym: (state, action) => {
      const gymId = action.payload.gymId
      const numberOfPasses = action.payload.numberOfPasses
      state.passes[gymId] = numberOfPasses
    },
    updateUserPassesInSearchList: (state, action) => {
      const user = action.payload
      state.userSearchList[user.email] = user
    },
    setUpdateResult: (state, action) => {
      state.updateResult = action.payload
    },
    resetState: () => initialState,
  }
})

export const {
  // addGymToUser,
  addUserToSearchList,
  removeUserFromSearchList,
  resetState,
  setPassesForGym,
  updateUserPassesInSearchList,
  setUpdateResult
} = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectUserPasses = state => {
  return state.user.passes
}

export const selectUpdateResult = state => {
  return state.user.updateResult
}

export const selectUserSearchList = state => {
  return state.user.userSearchList
}

export default userSlice.reducer
