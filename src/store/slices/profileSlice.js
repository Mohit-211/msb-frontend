import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetProfile } from "@/lib/api";

// The signed-in user's profile, including access: { plan, trial_ends_at, can_read_paid_stories,
// can_save_stories }. The header loads it whenever the token changes.
export const fetchProfile = createAsyncThunk("profile/getprofile", async () => {
  const response = await GetProfile();
  return response.data;
});

const profileSlice = createSlice({
  name: "clientProfile",
  initialState: {
    clientProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Signing out forgets the previous user's profile.
    profileCleared(state) {
      state.clientProfile = null;
      state.error = null;
    },
  },
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

export const { profileCleared } = profileSlice.actions;
export const selectProfile = (state) => state.rootReducer.clientProfile.clientProfile;
// null until the profile has loaded
export const selectAccess = (state) => selectProfile(state)?.access ?? null;

export default profileSlice.reducer;
