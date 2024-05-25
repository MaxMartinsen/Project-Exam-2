import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BOOKINGS_URL } from '../../utils/constans';

/**
 * Booking slice that handles fetching and creating bookings through asynchronous thunks.
 *
 * Utilizes Redux Toolkit's createSlice and createAsyncThunk to manage state related to bookings. This includes
 * fetching all bookings related to a specific venue and creating new bookings. Both thunks handle API interactions
 * with proper authorization and error management. The slice also handles state updates based on the results of these
 * actions, including loading states and errors.
 *
 * Exports:
 * - fetchBookings: Async thunk for fetching bookings by venue ID.
 * - createBooking: Async thunk for submitting a new booking to the server.
 * - bookingsSlice.reducer: Reducer function for the bookings slice.
 *
 * @module bookingSlice
 */

// Helper function to recursively fetch all pages
const fetchAllPages = async (
  url,
  token,
  apiKey,
  venueId,
  currentPage = 1,
  accumulatedData = []
) => {
  const response = await fetch(
    `${url}?venueId=${venueId}&page=${currentPage}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching bookings: ${response.statusText}`);
  }

  const data = await response.json();
  const newData = accumulatedData.concat(data.data);

  if (data.meta.currentPage < data.meta.pageCount) {
    return fetchAllPages(url, token, apiKey, venueId, currentPage + 1, newData);
  } else {
    return newData;
  }
};

// Async thunk for fetching bookings
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async ({ token, apiKey, venueId }, { rejectWithValue }) => {
    try {
      const bookingsData = await fetchAllPages(
        API_BOOKINGS_URL,
        token,
        apiKey,
        venueId
      );
      return bookingsData;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ bookingData, token, apiKey }, { rejectWithValue }) => {
    try {
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
        throw new Error(`Failed to create booking ${response.statusText}`);
      }

      const data = await response.json();

      return data.data || data;
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
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload.data || action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        console.error('Error fetching bookings:', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        if (Array.isArray(state.bookings)) {
          state.bookings.push(action.payload);
        }
        state.status = 'succeeded';
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bookingsSlice.reducer;
