import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    console.log('Sending login request with data:', loginData);
    try {
      const response = await axiosClient.post('/auth/login', loginData);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Login failed with error:',
        error.response ? error.response.data : error
      );
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const createApiKey = createAsyncThunk(
  'user/createApiKey',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        '/auth/create-api-key',
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Reducer slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
      })
      .addCase(createApiKey.fulfilled, (state, action) => {
        state.apiKey = action.payload.key;
      });
  },
});

export default userSlice.reducer;
