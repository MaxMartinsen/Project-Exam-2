// src/features/profile/profileSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/constans';

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
        `${API_URL}/holidaze/profiles/${username}/bookings?_customer=true&_venue=true`, // Ensure this endpoint is correct
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Ensure the token is valid
            'X-Noroff-API-Key': apiKey, // Ensure the API key is valid
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Log error data if response is not ok
        throw new Error(`Failed to fetch bookings: ${errorData.message}`);
      }

      const data = await response.json(); // Log if data is as expected
      return data?.data || [];
    } catch (err) {
      console.error('Error fetching bookings:', err.message); // Log the error
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
      });
  },
});

export default profileSlice.reducer;
