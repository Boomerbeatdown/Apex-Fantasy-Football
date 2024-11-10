// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem('accessToken', action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
