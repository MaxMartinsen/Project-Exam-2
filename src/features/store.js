// src/features/store.js

import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api/apiSlice';

import venuesReducer from './venues/venuesSlice';
import userReducer from './user/userSlice';
import profileReducer from './profile/profileSlice';
import bookingsReducer from './booking/bookingSlice';

export const store = configureStore({
  reducer: {
    venues: venuesReducer,
    user: userReducer,
    profile: profileReducer,
    bookings: bookingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
