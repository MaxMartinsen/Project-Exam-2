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

// Asynchronous thunk to fetch venues by profile
export const fetchVenuesByProfile = createAsyncThunk(
  'profile/fetchVenuesByProfile',
  async ({ username, token, apiKey }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/holidaze/profiles/${username}/venues?_customer=true&_venue=true`,
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
        throw new Error(`Failed to fetch venues: ${errorData.message}`);
      }

      const data = await response.json();
      return data?.data || [];
    } catch (err) {
      console.error('Error fetching venues:', err.message);
      return rejectWithValue(err.message);
    }
  }
);

// Asynchronous thunk to delete a venue
export const deleteVenue = createAsyncThunk(
  'profile/deleteVenue',
  async ({ venueId, token, apiKey }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/holidaze/venues/${venueId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': apiKey,
        },
      });
      if (!response.ok) throw new Error('Failed to delete venue');
      return venueId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  venues: [],
  bookings: [],
  profile: {
    name: null,
    email: null,
    bio: null,
    avatar: {
      url: '',
      alt: '',
    },
    banner: {
      url: '',
      alt: '',
    },
    venueManager: false,
    _count: {
      venues: 0,
      bookings: 0,
    },
  },
  isLoading: false,
  error: null,
};

// Create the profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.bookings = [];
      state.venues = [];
      state.profile = {
        name: null,
        email: null,
        bio: null,
        avatar: { url: '', alt: '' },
        banner: { url: '', alt: '' },
        venueManager: false,
        _count: { venues: 0, bookings: 0 },
      };
    },
  },
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
      .addCase(fetchVenuesByProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenuesByProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues = action.payload;
      })
      .addCase(fetchVenuesByProfile.rejected, (state, action) => {
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
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.venues = state.venues.filter(
          (venue) => venue.id !== action.payload
        );
      })
      .addCase(deleteVenue.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
