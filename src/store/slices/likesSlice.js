import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LikeCountApi } from "@/lib/api";

// { total_likes, is_like } for one story
export const fetchLike = createAsyncThunk("like/fetchlike", async (id, thunkAPI) => {
  try {
    const response = await LikeCountApi(id);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const likeSlice = createSlice({
  name: "like",
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
