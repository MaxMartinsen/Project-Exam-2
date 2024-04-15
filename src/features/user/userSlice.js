import { createSlice } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

export const registerUser = async (userData) => {
  console.log('Registering user with data:', userData);
  try {
    const response = await axiosClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error(
      'Error during registration:',
      error.response ? error.response.data : error
    );
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axiosClient.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createApiKey = async (accessToken) => {
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
    throw error.response.data;
  }
};

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
      });
  },
});

export default userSlice.reducer;
