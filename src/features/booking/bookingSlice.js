import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BOOKINGS_URL } from '../../utils/constans';

// Asynchronous thunk to fetch all bookings
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BOOKINGS_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ bookingData, token, apiKey }, { rejectWithValue }) => {
    try {
      console.log('Creating booking with data:', bookingData);
      console.log('Authorization token:', token);
      console.log('API Key:', apiKey);

      const response = await fetch(API_BOOKINGS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': apiKey,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create booking: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Booking created successfully:', data);

      return data;
    } catch (error) {
      console.error(
        'Error creating booking:',
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload.data || action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bookingsSlice.reducer;
