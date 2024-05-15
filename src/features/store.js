import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiSlice } from './api/apiSlice';
import venuesReducer from './venues/venuesSlice';
import userReducer from './user/userSlice';
import profileReducer from './profile/profileSlice';
import bookingsReducer from './booking/bookingSlice';

/**
 * Redux Store Configuration
 *
 * Combines all feature reducers into a single reducing function.
 * @param {Object} reducers - An object mapping from slice names to reducers
 *
 * Configuration object for redux-persist to setup persistence features.
 *
 * @param {string} key - The key used for storing the persistor's state in the storage.
 * @param {Object} storage - The storage adapter, typically local storage for web.
 * @param {Array<string>} whitelist - List of reducer names to store persistently.
 *
 * Creates a persistable reducer that auto-rehydrates the state from storage.
 *
 * @param {Object} persistConfig - Configuration for persistence.
 * @param {Function} rootReducer - The combined reducer for the entire application.
 *
 * Configures the Redux store.
 *
 * @param {Object} configuration - Configuration object for the store.
 * @param {Function} reducer - The root reducer or combined reducer that includes all slice reducers.
 * @param {Function} middleware - Middleware function enhanced with `getDefaultMiddleware` and
 * custom middleware like `apiSlice.middleware`.
 * @param {boolean} devTools - Flag to toggle Redux DevTools.
 *
 * Creates a persistor instance for an existing Redux store to handle rehydration from persisted
 * storage.
 *
 * @param {Object} store - The Redux store object created by `configureStore`.
 * These parameters and their descriptions provide a clear understanding of how the Redux store and
 * persistence layer are configured, detailing the interaction between middleware, reducers, and
 * persistence setup.
 */

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
