// src/features/store.js
import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api/apiSlice';

import venuesReducer from './venues/venuesSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    venues: venuesReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
