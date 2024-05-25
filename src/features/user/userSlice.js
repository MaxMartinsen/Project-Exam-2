import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_AUTH_URL } from '../../utils/constans';
import { clearProfile } from '../profile/profileSlice';

/**
 * User slice for managing user authentication and session.
 * Handles user registration, login, logout, and API key generation.
 * Stores user data in localStorage to persist session state across reloads.
 *
 * Exports:
 * - createUser: Async thunk for user registration.
 * - loginUser: Async thunk for user authentication and API key generation.
 * - logoutUser: Async thunk for user logout and session cleanup.
 * - userSlice.reducer: Reducer function for user state.
 * - clearCurrentUser: Action to clear the current user state.
 * - updateUser: Action to update the user's information in the state and localStorage.
 *
 * @module userSlice
 */

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        // Assuming the server response contains an array of errors
        throw new Error(
          data.errors.map((err) => err.message).join(', ') ||
            'Could not register user'
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        // Extract error message from JSON response and use rejectWithValue to handle it
        const errorMessages = data.errors
          ? data.errors.map((err) => err.message).join(', ')
          : data.message || 'Login failed';
        throw new Error(errorMessages);
      }
      localStorage.setItem('user', JSON.stringify(data.data));

      const accessToken = data.data.accessToken;
      const apiKeyResponse = await fetch(`${API_AUTH_URL}/create-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: 'API Key' }),
      });

      if (!apiKeyResponse.ok) {
        const apiKeyData = await apiKeyResponse.json();
        const apiKeyErrorMsg = apiKeyData.message || 'API Key creation failed';
        throw new Error(apiKeyErrorMsg);
      }
      const apiKeyData = await apiKeyResponse.json();

      const user = {
        user: data.data,
        apiKey: apiKeyData.data.key,
      };

      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    localStorage.removeItem('user');
    dispatch(clearProfile());
    dispatch(clearCurrentUser());
  }
);

const saveToLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    name: null,
    email: null,
    token: null,
    apiKey: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.apiKey = null;
      localStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      saveToLocalStorage(state.currentUser);
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
        state.status = 'failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const userData = action.payload.user;
        state.currentUser = userData;
        state.token = userData.accessToken;
        state.apiKey = action.payload.apiKey;
        state.isLoading = false;
        saveToLocalStorage(userData);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        userSlice.caseReducers.clearCurrentUser(state);
      });
  },
});
export const { clearCurrentUser, updateUser, clearErrors } = userSlice.actions;
export default userSlice.reducer;
