import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetProfile } from "@/lib/api";
export const fetchProfile = createAsyncThunk(
  "profile/getprofile",
  async (value) => {
    try {
      if(value){

        const response = await GetProfile(value);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

const profileSlice = createSlice({
  name: "clientProfile",
  initialState: {
    clientProfile: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProfile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
