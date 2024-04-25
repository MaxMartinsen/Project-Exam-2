// src/features/venues/venuesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_VENUE_URL } from '../../utils/constans';

// Fetch all venues with fetch
export const fetchVenues = createAsyncThunk(
  'venues/fetchVenues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_VENUE_URL);
      if (!response.ok) {
        throw new Error(`Error fetching venues: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch a single venue by ID with fetch
export const fetchVenueById = createAsyncThunk(
  'venues/fetchVenueById',
  async (venueId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_VENUE_URL}/${venueId}?_owner=true&_bookings=true`
      );
      if (!response.ok) {
        throw new Error(`Error fetching venue: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const venuesSlice = createSlice({
  name: 'venues',
  initialState: {
    venues: [],
    status: 'idle',
    selectedVenue: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const venues = action.payload.data || action.payload;
        state.venues = venues.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchVenueById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedVenue = action.payload.data || action.payload;
      })
      .addCase(fetchVenueById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default venuesSlice.reducer;
