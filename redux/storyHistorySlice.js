import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/Constants/host';

// Create an async thunk for fetching data from the API
export const fetchStoryHistory = createAsyncThunk(
  'storyHistory/fetchStoryHistory',
  async (token) => {
    const response = await axios.get(`${API_URL}/story`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response.data; // Returning the response data
  }
);

// Create the slice
const storyHistorySlice = createSlice({
  name: 'storyHistory',
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoryHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoryHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.data || [];
      })
      .addCase(fetchStoryHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default storyHistorySlice.reducer;
