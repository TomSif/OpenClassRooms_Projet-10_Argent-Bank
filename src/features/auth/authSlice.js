// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// URL de base de l'API
const API_BASE_URL = 'http://localhost:3001/api/v1'

// Thunk pour le login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed')
      }

      return data.body.token
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

// Thunk pour récupérer le profil
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const token = auth.token

      if (!token) {
        return rejectWithValue('No token available')
      }

      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch profile')
      }

      return data.body
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

// Thunk pour modifier le userName
export const updateUserName = createAsyncThunk(
  'auth/updateUserName',
  async (userName, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState()
      const token = auth.token

      if (!token) {
        return rejectWithValue('No token available')
      }

      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to update username')
      }

      return data.body
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

// State initial
const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
}

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('token')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload
        state.isAuthenticated = true
        state.error = null
        localStorage.setItem('token', action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      
      // Fetch profile cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Update username cases
      .addCase(updateUserName.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = { ...state.user, ...action.payload }
        state.error = null
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer