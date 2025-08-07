// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// URL de base de l'API
const API_BASE_URL = 'http://localhost:3001/api/v1'

/**
 * Thunk pour authentifier un utilisateur avec email et mot de passe
 * @async
 * @function loginUser
 * @param {Object} credentials - Les identifiants de connexion
 * @param {string} credentials.email - L'adresse email de l'utilisateur
 * @param {string} credentials.password - Le mot de passe de l'utilisateur
 * @returns {Promise<string>} Le token JWT en cas de succès
 * @throws {string} Message d'erreur en cas d'échec (login failed, network error)
 */
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

/**
 * Thunk pour récupérer le profil de l'utilisateur authentifié
 * Utilise le token stocké dans le state Redux pour l'authentification
 * @async
 * @function fetchUserProfile
 * @param {void} _ - Paramètre non utilisé (convention Redux Toolkit)
 * @param {Object} thunkAPI - API Redux Toolkit
 * @param {Function} thunkAPI.getState - Fonction pour accéder au state global
 * @param {Function} thunkAPI.rejectWithValue - Fonction pour rejeter avec une valeur custom
 * @returns {Promise<Object>} Les données du profil utilisateur (firstName, lastName, email, etc.)
 * @throws {string} Message d'erreur si pas de token ou échec de récupération
 */
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

/**
 * Thunk pour mettre à jour le userName de l'utilisateur
 * IMPORTANT: Cette fonction ne fait PAS d'appel API car le backend ne supporte pas cette fonctionnalité.
 * Le userName est stocké uniquement côté client dans localStorage.
 * @async
 * @function updateUserName
 * @param {string} userName - Le nouveau nom d'utilisateur à sauvegarder
 * @param {Object} thunkAPI - API Redux Toolkit
 * @param {Function} thunkAPI.getState - Fonction pour accéder au state global
 * @param {Function} thunkAPI.rejectWithValue - Fonction pour rejeter avec une valeur custom
 * @returns {Promise<Object>} Objet contenant le nouveau userName
 * @throws {string} Message d'erreur si pas de données utilisateur disponibles
 */
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

/**
 * State initial de l'authentification
 * @typedef {Object} AuthState
 * @property {string|null} token - Token JWT pour l'authentification API
 * @property {Object|null} user - Données du profil utilisateur (firstName, lastName, email)
 * @property {string|null} userName - Nom d'utilisateur personnalisé (stocké côté client uniquement)
 * @property {boolean} isLoading - Indicateur de chargement pour les requêtes async
 * @property {string|null} error - Message d'erreur de la dernière requête échouée
 * @property {boolean} isAuthenticated - Statut d'authentification de l'utilisateur
 */
const initialState = {
  token: localStorage.getItem('token') || null, // ← ICI : lecture au démarrage 
  // Note: userName est stocké côté client uniquement, pas dans le backend
  user: null,
  userName: localStorage.getItem('userName') || null, // Ajout du userName côté client
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
}

/**
 * Slice Redux pour la gestion de l'authentification
 * Gère le login, logout, profil utilisateur et userName personnalisé
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action pour déconnecter l'utilisateur
     * Supprime le token de sécurité mais préserve le userName pour la prochaine session
     * @param {AuthState} state - State actuel (non utilisé car on retourne un nouvel objet)
     * @returns {AuthState} Nouveau state avec utilisateur déconnecté
     */
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
    
    /**
     * Action pour effacer les messages d'erreur
     * @param {AuthState} state - State actuel (modifié par Immer)
     */
    clearError: (state) => {
      state.error = null
    },
    
    /**
     * Action pour définir un nouveau userName
     * Met à jour le state et localStorage simultanément
     * @param {AuthState} state - State actuel (modifié par Immer)
     * @param {Object} action - Action Redux
     * @param {string} action.payload - Le nouveau userName
     */
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