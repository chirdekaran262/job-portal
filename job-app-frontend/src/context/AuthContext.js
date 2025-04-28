import React, { createContext, useState, useContext, useEffect } from 'react';

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
        // Check for user in localStorage on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (userData, token) => {
        // Save user to state
        setUser(userData);

        // Save user and token to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    // Logout function
    const logout = () => {
        // Clear user from state
        setUser(null);

        // Remove user and token from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!user;
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
            {children}
        </AuthContext.Provider>
    );
};