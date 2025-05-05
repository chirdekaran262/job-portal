// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserInfo, getToken, clearAuth, isTokenValid } from '../services/authService';

// Create the context
export const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for user in cookies on component mount
        const storedUser = getUserInfo();
        const token = getToken();

        if (storedUser && token && isTokenValid()) {
            setUser(storedUser);
        } else if (token || storedUser) {
            // If token is invalid but we have some stale data, clear it
            clearAuth();
        }

        setLoading(false);
    }, []);

    // Login function to be used after successful authentication
    const login = (userData) => {
        // The token and user info are already set in cookies by the authService
        // Just update the state
        setUser(userData.user);
    };

    // Logout function
    const logout = () => {
        // Clear user from state
        setUser(null);

        // Clear cookies
        clearAuth();
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!user && isTokenValid();
    };

    // Context value
    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};