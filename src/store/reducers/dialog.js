import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showUpdateResultDialog: false,
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setShowUpdateResultDialog: (state, action) => {
      state.showUpdateResultDialog = action.payload
    },
    resetState: () => initialState,
  }
})

export const {
  resetState,
  setShowUpdateResultDialog
} = dialogSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectShowUpdateResultDialog = state => {
  return state.dialog.showUpdateResultDialog
}

export default dialogSlice.reducer
