import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    CareerConnect
                </Link>

                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/companies" className="nav-link">Companies</Link>
                        </li>

                        {user ? (
                            <>
                                {/* Links for ROLE_USER */}
                                {user.role === 'ROLE_USER' && (
                                    <li className="nav-item">
                                        <Link to="/applications" className="nav-link">My Applications</Link>
                                    </li>
                                )}

                                {/* Links for ROLE_COMPANY */}
                                {user.role === 'ROLE_COMPANY' && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/company/dashboard" className="nav-link">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/company/applications" className="nav-link">Applications</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/add" className="nav-link">Post Job</Link>
                                        </li>
                                    </>
                                )}

                                {/* Dropdown for logged-in user */}
                                <li className="nav-item dropdown">
                                    <button className="dropdown-button">
                                        {user.username}
                                        <span className="dropdown-icon">▼</span>
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link to="/profile" className="dropdown-link">Profile</Link>
                                        <button onClick={handleLogout} className="dropdown-link logout">
                                            Logout
                                        </button>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Links for unauthenticated users */}
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link register-button">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;