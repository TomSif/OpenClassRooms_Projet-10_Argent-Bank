/**
 * @module features/auth/authSlice
 * @description Gère l'authentification, le profil utilisateur, les mises à jour du userName et la persistance de session ("Remember me").
 *              Utilise Redux Toolkit pour les états asynchrones et la persistance côté client.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** @constant {string} */
const API_BASE_URL = "http://localhost:3001/api/v1";

/**
 * Thunk asynchrone pour authentifier un utilisateur.
 * Prépare l'envoi du paramètre rememberMe pour une future intégration backend.
 * @async
 * @function loginUser
 * @memberof module:features/auth/authSlice
 * @param {Object} credentials - Les identifiants de l'utilisateur.
 * @param {string} credentials.email - L'adresse email de l'utilisateur.
 * @param {string} credentials.password - Le mot de passe de l'utilisateur.
 * @param {boolean} [credentials.rememberMe=false] - Si vrai, la session sera persistée après fermeture du navigateur.
 * @param {Object} thunkAPI - L'API Redux Thunk.
 * @param {Function} thunkAPI.rejectWithValue - Permet de rejeter la promesse avec une valeur personnalisée.
 * @returns {Promise<{token: string, rememberMe: boolean}>} Le token JWT et l'état de rememberMe en cas de succès.
 * @throws {string} Message d'erreur en cas d'échec (échec de connexion, erreur réseau).
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe = false }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        // TODO: Envoyer rememberMe au backend quand l'API sera prête
        // body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }
      return { token: data.body.token, rememberMe };
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

/**
 * Thunk asynchrone pour récupérer le profil de l'utilisateur authentifié.
 * Utilise le token JWT stocké dans le state Redux.
 * @async
 * @function fetchUserProfile
 * @memberof module:features/auth/authSlice
 * @param {void} _ - Paramètre non utilisé (convention Redux Toolkit).
 * @param {Object} thunkAPI - L'API Redux Thunk.
 * @param {Function} thunkAPI.getState - Permet d'accéder au state global Redux.
 * @param {Function} thunkAPI.rejectWithValue - Permet de rejeter la promesse avec une valeur personnalisée.
 * @returns {Promise<Object>} Les données du profil utilisateur (firstName, lastName, email, etc.).
 * @throws {Object} Objet contenant un message d'erreur et un code de statut en cas d'échec.
 */
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        return rejectWithValue("No token available");
      }
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue({
          message: "Failed to fetch profile",
          status: response.status,
        });
      }
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

/**
 * Thunk asynchrone pour mettre à jour le userName de l'utilisateur.
 * NOTE: Cette fonction simule un appel API car le backend n'est pas implémenté.
 * Le userName est stocké côté client dans localStorage.
 * @async
 * @function updateUserName
 * @memberof module:features/auth/authSlice
 * @param {string} userName - Le nouveau nom d'utilisateur.
 * @returns {Promise<Object>} Objet contenant le nouveau userName.
 */
export const updateUserName = createAsyncThunk(
  "auth/updateUserName",
  async (userName) => {
    // Simulation d'un délai réseau pour une meilleure UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { userName };
  }
);

/**
 * @typedef {Object} AuthState
 * @property {string|null} token - Le token JWT pour l'authentification API.
 * @property {Object|null} user - Les données du profil utilisateur (firstName, lastName, email, etc.).
 * @property {string|null} userName - Le nom d'utilisateur personnalisé (stocké côté client uniquement).
 * @property {boolean} isLoading - Indicateur de chargement pour les requêtes asynchrones.
 * @property {string|null} error - Message d'erreur de la dernière requête échouée.
 * @property {boolean} isAuthenticated - État d'authentification de l'utilisateur.
 * @property {boolean} rememberMe - État de la persistance de session.
 */
const initialState = {
  /**
   * Token JWT pour l'authentification.
   * @type {string|null}
   */
  token: localStorage.getItem("token") || null,
  /**
   * Données du profil utilisateur.
   * @type {Object|null}
   */
  user: null,
  /**
   * Nom d'utilisateur personnalisé.
   * @type {string|null}
   */
  userName: localStorage.getItem("userName") || null,
  /**
   * Indicateur de chargement pour les requêtes asynchrones.
   * @type {boolean}
   */
  isLoading: false,
  /**
   * Message d'erreur de la dernière requête échouée.
   * @type {string|null}
   */
  error: null,
  /**
   * État d'authentification de l'utilisateur.
   * @type {boolean}
   */
  isAuthenticated: !!localStorage.getItem("token"),
  /**
   * État de la checkbox "Remember me".
   * @type {boolean}
   */
  rememberMe: localStorage.getItem("rememberMe") === "true" || false,
};

/**
 * Slice Redux pour la gestion de l'authentification.
 * Gère le login, le logout, le profil utilisateur, les mises à jour du userName et la persistance de session.
 * @namespace authSlice
 */
const authSlice = createSlice({
  /** @type {string} */
  name: "auth",
  /** @type {AuthState} */
  initialState,
  /**
   * Réducteurs synchrones pour les actions d'authentification.
   */
  reducers: {
    /**
     * Déconnecte l'utilisateur en supprimant le token et les données utilisateur.
     * Nettoie également le localStorage.
     * @function logout
     * @memberof module:features/auth/authSlice.authSlice
     * @returns {AuthState} Nouveau state avec l'utilisateur déconnecté.
     */
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("rememberMe");
      return {
        token: null,
        user: null,
        userName: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
        rememberMe: false,
      };
    },
    /**
     * Efface les messages d'erreur du state.
     * @function clearError
     * @memberof module:features/auth/authSlice.authSlice
     * @param {AuthState} state - Le state actuel.
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Met à jour le userName dans le state et le localStorage.
     * @function setUserName
     * @memberof module:features/auth/authSlice.authSlice
     * @param {AuthState} state - Le state actuel.
     * @param {Object} action - L'action Redux.
     * @param {string} action.payload - Le nouveau userName.
     */
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", action.payload);
    },
  },
  /**
   * Réducteurs supplémentaires pour gérer les actions asynchrones.
   * @param {Object} builder - Le builder pour ajouter des cas de réducteurs.
   */
  extraReducers: (builder) => {
    builder
      // Cas pour loginUser.pending
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Cas pour loginUser.fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.rememberMe = action.payload.rememberMe;
        localStorage.setItem("token", action.payload.token);
        if (action.payload.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }
      })
      // Cas pour loginUser.rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Cas pour fetchUserProfile.pending
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Cas pour fetchUserProfile.fulfilled
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      // Cas pour fetchUserProfile.rejected
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        // Si le token est expiré ou invalide (401), déconnecter l'utilisateur
        if (action.payload?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          localStorage.removeItem("rememberMe");
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          state.rememberMe = false;
          state.error = "Your session has expired. Please log in again.";
        } else {
          state.error = action.payload;
        }
      })
      // Cas pour updateUserName.fulfilled
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        localStorage.setItem("userName", action.payload.userName);
      });
  },
});

/**
 * Actions exportées du slice.
 * @namespace actions
 * @memberof module:features/auth/authSlice
 */
export const { logout, clearError, setUserName } = authSlice.actions;

/**
 * Réducteur du slice auth.
 * @type {import('@reduxjs/toolkit').SliceCaseReducers<AuthState>}
 */
export default authSlice.reducer;
