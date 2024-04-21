import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_VENUE_URL } from '../../utils/constans';

export const fetchVenues = createAsyncThunk(
  'venues/fetchVenues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_VENUE_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchVenueById = createAsyncThunk(
  'venues/fetchVenueById',
  async (venueId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_VENUE_URL}/${venueId}`, {
        params: { _owner: true, _bookings: true },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
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
