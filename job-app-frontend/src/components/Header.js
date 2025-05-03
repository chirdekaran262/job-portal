"use client"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
// Import the new CSS file
import "../styles/header.css"

const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const navRef = useRef(null)

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const toggleDropdown = (index) => {
        if (activeDropdown === index) {
            setActiveDropdown(null)
        } else {
            setActiveDropdown(index)
        }
    }

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target) && !event.target.classList.contains('mobile-menu-toggle')) {
                setMobileMenuOpen(false)
                setActiveDropdown(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false)
        setActiveDropdown(null)
    }, [location])

    // Check if a link is active
    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo with farm icon */}
                <Link to="/" className="logo" aria-label="FarmConnect Home">
                    <div className="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path d="M9 22V12h6v10" />
                        </svg>
                    </div>
                    <span className="logo-text">FarmConnect</span>
                </Link>

                {/* Mobile menu button */}
                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span className="toggle-icon">
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                    </span>
                </button>

                {/* Navigation */}
                <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`} ref={navRef} aria-label="Main Navigation">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                                <span className="link-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                Jobs
                            </Link>
                        </li>
                        {user && user.role === "ROLE_USER" && (
                            <li className="nav-item">
                                <Link to="/companies" className={`nav-link ${isActive('/companies') ? 'active' : ''}`}>
                                    <span className="link-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </span>
                                    Farms
                                </Link>
                            </li>
                        )}

                        {/* Links for ROLE_COMPANY */}

                        {user ? (
                            <>
                                {user.role === "ROLE_USER" && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/applications" className={`nav-link ${isActive('/applications') ? 'active' : ''}`}>
                                                <span className="link-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                </span>
                                                Applications
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/opentowork/create" className={`nav-link ${isActive('/opentowork/create') ? 'active' : ''}`}>
                                                <span className="link-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <line x1="12" y1="8" x2="12" y2="16" />
                                                        <line x1="8" y1="12" x2="16" y2="12" />
                                                    </svg>
                                                </span>
                                                Post OpenToWork
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {/* Links for ROLE_COMPANY */}
                                {user.role === "ROLE_COMPANY" && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/company/dashboard" className={`nav-link ${isActive('/company/dashboard') ? 'active' : ''}`}>
                                                <span className="link-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="3" width="7" height="7" />
                                                        <rect x="14" y="3" width="7" height="7" />
                                                        <rect x="14" y="14" width="7" height="7" />
                                                        <rect x="3" y="14" width="7" height="7" />
                                                    </svg>
                                                </span>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/company/applications" className={`nav-link ${isActive('/company/applications') ? 'active' : ''}`}>
                                                <span className="link-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                                                        <path d="M9 14l2 2 4-4" />
                                                    </svg>
                                                </span>
                                                JobSeeker
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/add" className={`nav-link add-job ${isActive('/add') ? 'active' : ''}`}>
                                                <span className="link-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <line x1="12" y1="8" x2="12" y2="16" />
                                                        <line x1="8" y1="12" x2="16" y2="12" />
                                                    </svg>
                                                </span>
                                                Post Job
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {/* User dropdown - simplified */}
                                <li className={`nav-item user-dropdown ${activeDropdown === 'user' ? 'active' : ''}`}>
                                    <button
                                        className="dropdown-button"
                                        onClick={() => toggleDropdown('user')}
                                        aria-expanded={activeDropdown === 'user'}
                                        aria-haspopup="true"
                                    >
                                        <span className="user-avatar">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </span>
                                        <span className="user-name">{user.username}</span>
                                        <span className="dropdown-arrow">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </span>
                                    </button>

                                    <div className={`dropdown-menu ${activeDropdown === 'user' ? 'show' : ''}`} role="menu">
                                        <Link to="/profile" className="dropdown-link" role="menuitem">
                                            <span className="dropdown-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            Profile
                                        </Link>
                                        <button onClick={handleLogout} className="dropdown-link logout" role="menuitem">
                                            <span className="dropdown-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                                    <polyline points="16 17 21 12 16 7" />
                                                    <line x1="21" y1="12" x2="9" y2="12" />
                                                </svg>
                                            </span>
                                            Logout
                                        </button>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Links for unauthenticated users - simplified */}
                                <li className="nav-item">
                                    <Link to="/login" className={`nav-link login-link ${isActive('/login') ? 'active' : ''}`}>
                                        <span className="link-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                                                <polyline points="10 17 15 12 10 7" />
                                                <line x1="15" y1="12" x2="3" y2="12" />
                                            </svg>
                                        </span>
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link register-button">
                                        <span className="link-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <line x1="20" y1="8" x2="20" y2="14" />
                                                <line x1="23" y1="11" x2="17" y2="11" />
                                            </svg>
                                        </span>
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header