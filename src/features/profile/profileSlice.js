// src/features/profile/profileSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/constans';

// Asynchronous thunk to fetch profile details
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async ({ username, token, apiKey }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/holidaze/profiles/${username}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': apiKey,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch profile: ${errorData.message}`);
      }
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error('Error fetching profile:', err.message);
      return rejectWithValue(err.message);
    }
  }
);

// Asynchronous thunk for updating profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ username, token, apiKey, avatarUrl }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/holidaze/profiles/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify({
          avatar: { url: avatarUrl, alt: 'User avatar' },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update avatar.');
      }

      const data = await response.json();
      return data?.data || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Asynchronous thunk to fetch bookings by profile
export const fetchBookingsByProfile = createAsyncThunk(
  'profile/fetchBookingsByProfile',
  async ({ username, token, apiKey }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/holidaze/profiles/${username}/bookings?_customer=true&_venue=true`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-Key': apiKey,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch bookings: ${errorData.message}`);
      }

      const data = await response.json();
      return data?.data || [];
    } catch (err) {
      console.error('Error fetching bookings:', err.message);
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  bookings: [],
  isLoading: false,
  error: null,
};

// Create the profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingsByProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingsByProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookingsByProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
