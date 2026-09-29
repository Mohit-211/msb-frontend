import { BlogDetailAPI } from '@/Constants/Api/Api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchblogs = createAsyncThunk(
  'comments/fetchblogs',
  async (id, thunkAPI) => {
    try {
      const response = await BlogDetailAPI(id); 
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchblogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchblogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchblogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
