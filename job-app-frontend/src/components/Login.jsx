import React, { useState } from 'react';
import { User, Lock, Sprout, AlertCircle, CheckCircle2, Chrome } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken, setUserInfo, loginUser } from '../services/authService'; // Adjust path if needed

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('Registration successful! Please login.');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.username.trim()) {
            setError('Username is required');
            return;
        }
        if (!credentials.password) {
            setError('Password is required');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await loginUser(credentials); // response: { token, user }

            if (response && response.token && response.user) {
                setToken(response.token);
                setUserInfo(response.user);
                console.log('Login successful!', response);
                navigate('/'); // ✅ Redirect to home after login
                window.location.reload();

            } else {
                throw new Error('Invalid response from server');
            }

        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log('Google login clicked');
        // Add Google OAuth logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Sprout className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">AgriConnect</h1>
                    <p className="text-gray-600">Welcome back to our community</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
                    <div className="px-8 py-6">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Sign In</h2>

                        {successMessage && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-green-700 text-sm">{successMessage}</span>
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <span className="text-red-700 text-sm">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember Me + Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <button type="button" className="text-sm text-green-600 hover:text-green-500 transition-colors duration-200">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">or</span>
                                </div>
                            </div>

                            {/* Google Login */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                            >
                                <Chrome className="w-5 h-5 mr-2 text-blue-500" />
                                Continue with Google
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100">
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-100">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <User className="w-4 h-4 text-green-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">Find Workers</h3>
                        <p className="text-xs text-gray-600 mt-1">Connect with skilled farm workers</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-green-100">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Sprout className="w-4 h-4 text-green-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">Find Work</h3>
                        <p className="text-xs text-gray-600 mt-1">Discover farming opportunities</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
