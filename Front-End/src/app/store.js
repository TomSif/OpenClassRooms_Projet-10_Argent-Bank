import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // vous pourrez ajouter d'autres reducers ici (ex: user: userReducer)
    },
});