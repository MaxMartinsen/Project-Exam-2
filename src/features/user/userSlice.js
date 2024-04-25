//src/features/user/userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/constans';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Could not register user');
      const data = await response.json();
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
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!loginResponse.ok) throw new Error('Login failed');
      const loginData = await loginResponse.json();
      localStorage.setItem('user', JSON.stringify(loginData.data));

      const accessToken = loginData.data.accessToken;

      const apiKeyResponse = await fetch(`${API_URL}/auth/create-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: 'API Key' }),
      });

      if (!apiKeyResponse.ok) throw new Error('API Key creation failed');
      const apiKeyData = await apiKeyResponse.json();

      console.log('API Key created:', apiKeyData);

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(loginData.data));

      return {
        user: loginData.data,
        apiKey: apiKeyData.data.key,
      };
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    localStorage.removeItem('user');
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
    token: null,
    apiKey: null,
    bookings: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      saveToLocalStorage(state.currentUser);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const newUser = action.payload.data;
        state.currentUser = newUser;
        state.isLoading = false;
        saveToLocalStorage(newUser);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const userData = action.payload.user;
        state.currentUser = userData;
        state.token = userData.accessToken;
        state.apiKey = action.payload.apiKey;
        state.isLoading = false;
        saveToLocalStorage(userData);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearCurrentUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
