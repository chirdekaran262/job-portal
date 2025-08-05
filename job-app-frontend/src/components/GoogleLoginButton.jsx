// src/components/GoogleLoginButton.js
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/googleButton.css'; // Create this file for styling

const GoogleLoginButton = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Get the ID token
                const idToken = tokenResponse.access_token;

                // Call our backend with the token
                const userData = await loginWithGoogle(idToken);

                // Update auth context with the user data
                login(userData);

                // Navigate to the home page or the page the user was trying to access
                navigate(from, { replace: true });
            } catch (error) {
                console.error('Google login failed:', error);
            }
        },
        onError: () => console.log('Google Login Failed')
    });

    return (
        <button
            className="google-login-button"
            onClick={() => handleGoogleLogin()}
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="google-icon"
            />
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;