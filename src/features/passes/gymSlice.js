import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

export const fetchGyms = createAsyncThunk(
  'gyms/fetchGymsStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://192.168.1.19:8081/api/gym`);
      return response.data;
    } catch (err) {
      // TODO Handle page not found (err.response.data isn't a string, is object)
      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchGymById = createAsyncThunk(
  'gyms/fetchGymByIdStatus',
  async (gymId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://192.168.1.19:8081/api/gym/${gymId}`);
      return response.data;
    } catch (err) {
      // TODO Handle page not found (err.response.data isn't a string, is object)
      return rejectWithValue(err.response.data)
    }
  }
)

export const gymSlice = createSlice({
  name: 'gym',
  initialState: {
    showGymLegend: false,
    gyms: [],
    newGymOnUserError: null
  },
  reducers: {
    toggleGymLegend: (state) => {
      state.showGymLegend = !state.showGymLegend;
    },
  },
  extraReducers: {
    [fetchGyms.fulfilled]: (state, action) => {
      state.gyms = action.payload.slice().sort((a,b) => a.name > b.name ? 1 : -1);
    },

    [fetchGymById.fulfilled]: (state, action) => {
      state.newGymOnUserError = null;
    },
    [fetchGymById.rejected]: (state, action) => {
      state.newGymOnUserError = action.payload;
    },
  }
});

export const { toggleGymLegend } = gymSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectGyms = state => {
  return state.gym.gyms;
}

export const selectGymNameForId = (state, gymId) => {
  return state.gym.gyms[gymId];
}

export const selectShowGymLegend = state => {
  return state.gym.showGymLegend;
}

export const selectNewGymOnUserError = state => {
  return state.gym.newGymOnUserError;
}

export default gymSlice.reducer;
