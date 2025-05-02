import Cookies from 'js-cookie';  // Import js-cookie

const API_URL = 'http://localhost:8081/api/auth';

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        console.log('Login API Response:', data);

        // Save token and user info in cookies
        if (data.token) {
            // Set the token in a cookie
            Cookies.set('token', data.token, { expires: 7, secure: true, sameSite: 'Strict' });

            // Set user info in a cookie
            Cookies.set('user', JSON.stringify({
                id: data.id,
                username: data.username,
                email: data.email,
                role: data.role,
            }), { expires: 7, secure: true, sameSite: 'Strict' });

            console.log('Token saved to cookies:', data.token);
        } else {
            console.warn('Token missing in response!');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Get token from cookies
export const getToken = () => {
    const token = Cookies.get('token');
    if (!token) {
        console.warn('No token found in cookies!');
    }
    return token;
};

// Logout user (remove cookies)
export const logoutUser = () => {
    Cookies.remove('token');
    Cookies.remove('user');
};

// Get user info from cookies
export const getUserInfo = () => {
    const userJson = Cookies.get('user');
    return userJson ? JSON.parse(userJson) : null;
};

// Set token manually in cookies
export const setToken = (token) => {
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
};

// Set user info manually in cookies
export const setUserInfo = (user) => {
    Cookies.set('user', JSON.stringify(user), { expires: 7, secure: true, sameSite: 'Strict' });
};
