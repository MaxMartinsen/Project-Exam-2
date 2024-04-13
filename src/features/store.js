import { configureStore } from '@reduxjs/toolkit';
import venuesReducer from '../features/venues/venuesSlice';

export const store = configureStore({
  reducer: {
    venues: venuesReducer,
  },
});
