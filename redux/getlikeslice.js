import {LikeCountApi, getLocalStorageItem } from '@/Constants/Api/Api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const storedValue = getLocalStorageItem("UserLoginToken");

export const fetchLike = createAsyncThunk(
  'like/fetchlike',
  async (id, thunkAPI) => {
    try {
      if(id &&storedValue){

        const response = await LikeCountApi(id,storedValue); 
        // Replace GetComment with your actual API call
        return response.data; // Assuming the response has a 'data' property containing comments
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const likeSlice = createSlice({
  name: 'like',
  initialState: {
    like: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLike.fulfilled, (state, action) => {
        state.loading = false;
        state.like = action.payload;
      })
      .addCase(fetchLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likeSlice.reducer;
