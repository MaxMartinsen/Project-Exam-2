// src/features/store.js
import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api/apiSlice';

import venuesReducer from './venues/venuesSlice';

export const store = configureStore({
  reducer: {
    venues: venuesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
