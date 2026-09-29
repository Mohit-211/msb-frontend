// clientProfileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetProfile } from "@/Constants/Api/Api";
export const getClinetProfile = createAsyncThunk(
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

const getclientProfileSlice = createSlice({
  name: "clientProfile",
  initialState: {
    clientProfile: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClinetProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClinetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProfile = action.payload;
      })
      .addCase(getClinetProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getclientProfileSlice.reducer;
