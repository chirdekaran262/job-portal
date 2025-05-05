// src/components/Login.js
import React, { useState, useContext, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { loginUser, loginWithGoogle } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useContext(AuthContext);
    const from = location.state?.from?.pathname || '/';

    // Show success message if coming from registration
    const successMessage = location.state?.message;

    const validateInputs = useCallback(() => {
        if (!credentials.username.trim()) {
            setError('Username is required');
            return false;
        }
        if (!credentials.password) {
            setError('Password is required');
            return false;
        }
        return true;
    }, [credentials]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        setError(null); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            setLoading(true);
            setError(null);
            const userData = await loginUser(credentials);

            if (!userData || !userData.token || !userData.user) {
                throw new Error('Invalid response from server');
            }

            login(userData);
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Login error:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Login failed. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        if (!credentialResponse?.credential) {
            setError('Google login failed: No credentials received');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const userData = await loginWithGoogle(credentialResponse.credential);

            if (!userData || !userData.token) {
                throw new Error('Invalid response from server');
            }

            login(userData);
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Google login error:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to login with Google'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>

                {successMessage && <div className="success-message">{successMessage}</div>}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="button-group">
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="google-login-container">
                    <p>Or continue with</p>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError('Google login failed')}
                        useOneTap
                        theme="filled_black"
                        shape="pill"
                        locale="en"
                        text="continue_with"
                        disabled={loading}
                    />
                </div>

                <div className="form-footer">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;