// Updated src/services/authService.js
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// Add this function after your existing imports
export const buildHeaders = () => {
    const token = getToken();
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
};

// User authentication API functions
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`http://localhost:8081/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();

        // Create a user object from the response data
        const user = {
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role
        };

        // Store token and user info
        setToken(data.token);
        console.log('User info:', data.token);
        setUserInfo(user);

        return {
            token: data.token,
            user
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const loginWithGoogle = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8081'}/api/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Google login failed');
        }

        const data = await response.json();

        // Create a user object from the response data
        const user = {
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role
        };

        // Store token and user info
        setToken(data.token);
        setUserInfo(user);
        return {
            token: data.token,
            user
        };
    } catch (error) {
        console.error('Google login error:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`http://localhost:8081/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Registration failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Token management functions
export const setToken = (token) => {
    try {
        if (token) {
            // Set cookie with secure flag and expiry of 7 days
            Cookies.set('token', token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: 7
            });
        } else {
            Cookies.remove('token');
        }
    } catch (error) {
        console.error('Error setting token:', error);
    }
};

export const setUserInfo = (user) => {
    try {
        if (user) {
            // Set cookie with secure flag and expiry of 7 days
            Cookies.set('user', JSON.stringify(user), {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: 7
            });
        } else {
            Cookies.remove('user');
        }
    } catch (error) {
        console.error('Error setting user info:', error);
    }
};

export const getToken = () => {
    try {
        return Cookies.get('token') || null;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

export const getUserInfo = () => {
    try {
        const userStr = Cookies.get('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Error parsing user info:', error);
        return null;
    }
};

export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        // Check if the token is expired
        return decoded.exp * 1000 > Date.now();
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
};

export const clearAuth = () => {
    try {
        Cookies.remove('token');
        Cookies.remove('user');
    } catch (error) {
        console.error('Error clearing auth:', error);
    }
};

export const logoutUser = () => {
    clearAuth();
};