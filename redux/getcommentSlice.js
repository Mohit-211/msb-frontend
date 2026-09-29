import { GetComment, getLocalStorageItem } from '@/Constants/Api/Api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const storedValue = getLocalStorageItem("UserLoginToken");
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (id,thunkAPI) => {
    try {
      if(id && storedValue){
        const response = await GetComment(id,storedValue);
        return response.data; 
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default commentSlice.reducer;
