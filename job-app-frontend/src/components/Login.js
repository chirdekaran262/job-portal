// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import '../styles/farm-theme.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useContext(AuthContext);

    // Get the page user was trying to access before redirecting to login
    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userData = await loginUser(credentials);
            login(userData);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container farm-background">
            <div className="form-container">
                <h2>Welcome Back to FarmConnect</h2>
                <p className="form-subtitle">Log in to find farm jobs or hire agricultural workers</p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="farm-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-icon-wrapper">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-icon-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="remember-me">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>

                    <div className="button-group">
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login to FarmConnect'}
                        </button>
                    </div>
                </form>

                <div className="form-footer">
                    <p>
                        Don't have an account? <Link to="/register">Register as a Farm Worker or Farm Owner</Link>
                    </p>
                </div>

                <div className="farm-theme-footer">
                    <div className="farm-icon tractor"></div>
                    <div className="farm-icon wheat"></div>
                    <div className="farm-icon sun"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;