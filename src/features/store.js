import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiSlice } from './api/apiSlice';
import venuesReducer from './venues/venuesSlice';
import userReducer from './user/userSlice';
import profileReducer from './profile/profileSlice';
import bookingsReducer from './booking/bookingSlice';

const rootReducer = combineReducers({
  venues: venuesReducer,
  user: userReducer,
  profile: profileReducer,
  bookings: bookingsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
