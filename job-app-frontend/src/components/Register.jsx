import React, { useState } from 'react';
import { User, Mail, Lock, Building, Users, Sprout, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        role: 'ROLE_USER'
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleRoleChange = (e) => {
        setUserData({
            ...userData,
            role: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check if passwords match
        if (userData.password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            // Simulate API call
            const response = await registerUser(userData);
            if (!response || !response.token) {
                throw new Error('Registration failed. Please try again.');
            }
            // Navigate to login would happen here
            console.log('Registration successful!', userData);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            <div className="relative max-w-md mx-auto">
                {/* Header with Farm Logo */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Sprout className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">AgriConnect</h1>
                    <p className="text-gray-600">Join our agricultural community</p>
                </div>

                {/* Registration Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
                    <div className="px-8 py-6">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Create Account</h2>

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <span className="text-red-700 text-sm">{error}</span>
                            </div>
                        )}

                        <div onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={userData.fullName}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </div>

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
                                        value={userData.username}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Choose a username"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Enter your email"
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
                                        value={userData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Create a password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Account Type
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${userData.role === 'ROLE_USER'
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-200 bg-white/50 hover:border-green-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="ROLE_USER"
                                            checked={userData.role === 'ROLE_USER'}
                                            onChange={handleRoleChange}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center space-x-3">
                                            <Users className="w-5 h-5 text-green-600" />
                                            <div>
                                                <div className="font-medium text-gray-900">Farm Worker</div>
                                                <div className="text-sm text-gray-500">Looking for work</div>
                                            </div>
                                        </div>
                                        {userData.role === 'ROLE_USER' && (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 absolute top-2 right-2" />
                                        )}
                                    </label>

                                    <label className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${userData.role === 'ROLE_COMPANY'
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-200 bg-white/50 hover:border-green-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="ROLE_COMPANY"
                                            checked={userData.role === 'ROLE_COMPANY'}
                                            onChange={handleRoleChange}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center space-x-3">
                                            <Building className="w-5 h-5 text-green-600" />
                                            <div>
                                                <div className="font-medium text-gray-900">Farm Owner</div>
                                                <div className="text-sm text-gray-500">Hiring workers</div>
                                            </div>
                                        </div>
                                        {userData.role === 'ROLE_COMPANY' && (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 absolute top-2 right-2" />
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100">
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200 ">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;