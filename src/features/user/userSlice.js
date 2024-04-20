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

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  token: null,
  apiKey: null,
  bookings: [],
  isLoading: false,
  formType: 'signup',
  showForm: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.user.accessToken;
        state.apiKey = action.payload.apiKey;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
