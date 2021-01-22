import { createSlice } from '@reduxjs/toolkit'

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    showAboutDialog: false,
    showUpdateResultDialog: false,
  },
  reducers: {
    setShowUpdateResultDialog: (state, action) => {
      state.showUpdateResultDialog = action.payload
    }
  }
})

export const {
  setShowUpdateResultDialog,
} = dialogSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectShowUpdateResultDialog = state => {
  return state.dialog.showUpdateResultDialog
}

export default dialogSlice.reducer
