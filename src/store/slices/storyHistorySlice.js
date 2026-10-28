import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetSavedStoriesApi } from "@/lib/api";

// The signed-in user's saved AI stories. Stories saved during the trial stay readable.
export const fetchStoryHistory = createAsyncThunk("storyHistory/fetchStoryHistory", async () =>
  GetSavedStoriesApi(),
);

const storyHistorySlice = createSlice({
  name: "storyHistory",
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
