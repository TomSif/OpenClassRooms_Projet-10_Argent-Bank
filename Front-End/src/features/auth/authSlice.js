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

// Thunk pour modifier le userName (stockage côté client uniquement)
export const updateUserName = createAsyncThunk(
  'auth/updateUserName',
  async (userName, { getState, rejectWithValue }) => {
    try {
      // Pas d'appel API car le backend ne supporte pas userName
      // On stocke juste côté client
      const { auth } = getState()
      
      if (!auth.user) {
        return rejectWithValue('No user data available')
      }

      // Simulation d'un délai réseau pour l'UX
      await new Promise(resolve => setTimeout(resolve, 500))

      return { userName }
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

// State initial
const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  userName: localStorage.getItem('userName') || null, // Ajout du userName côté client
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
}

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      // SÉCURITÉ : Supprimer uniquement les données sensibles
      localStorage.removeItem('token')
      // userName reste dans localStorage pour la prochaine session
      
      // State nettoyé mais userName préservé
      return {
        token: null,
        user: null, // Données sensibles supprimées
        userName: localStorage.getItem('userName'), // userName préservé
        isLoading: false,
        error: null,
        isAuthenticated: false,
      }
    },
    clearError: (state) => {
      state.error = null
    },
    setUserName: (state, action) => {
      state.userName = action.payload
      localStorage.setItem('userName', action.payload)
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
      
      // Update username cases (stockage côté client uniquement)
      .addCase(updateUserName.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.isLoading = false
        // Stockage du userName côté client
        state.userName = action.payload.userName
        localStorage.setItem('userName', action.payload.userName)
        state.error = null
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError, setUserName } = authSlice.actions
export default authSlice.reducer