"use client"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Wheat } from "lucide-react"
const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const [scrolled, setScrolled] = useState(false)
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

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
        <header className={`sticky top-0 z-50 transition-all duration-500 ease-out ${scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-emerald-100/50'
            : 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 shadow-md'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* LEFT SIDE - Logo & Brand */}
                    <Link
                        to="/"
                        className="flex items-center gap-4 group transition-all duration-300 hover:scale-105"
                        aria-label="FarmConnect Home"
                    >

                        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-300 to-amber-500 p-2 rounded-lg shadow-lg">
                            <div className="bg-gradient-to-r from-green-700 to-green-600 p-2 rounded-lg shadow-lg border border-green-200">
                                <Wheat className="h-6 w-6 text-white-500 bg-clip-padding" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-green-800">AgriConnect</h1>
                                <p className="text-green-900 text-sm font-medium">Connecting Farmers & Workers</p>
                            </div>
                        </div>
                    </Link>

                    {/* RIGHT SIDE - All Navigation & Actions */}
                    <div className="flex items-center gap-6">

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center">
                            <div className={`flex items-center space-x-1 rounded-2xl p-2 transition-all duration-300 ${scrolled
                                ? 'bg-emerald-50/80 backdrop-blur-sm border border-emerald-100'
                                : 'bg-white/10 backdrop-blur-sm border border-white/20'
                                }`}>
                                <Link
                                    to="/"
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${isActive('/')
                                        ? scrolled
                                            ? 'bg-emerald-200 text-emerald-900 shadow-sm'
                                            : 'bg-white/25 text-white shadow-sm'
                                        : scrolled
                                            ? 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-800'
                                            : 'text-white/80 hover:text-white hover:bg-white/15'
                                        }`}
                                >
                                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                        <line x1="8" y1="21" x2="16" y2="21" />
                                        <line x1="12" y1="17" x2="12" y2="21" />
                                    </svg>
                                    Jobs
                                </Link>

                                {user && user.role === "ROLE_USER" && (
                                    <>
                                        <Link
                                            to="/companies"
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${isActive('/companies')
                                                ? scrolled
                                                    ? 'bg-emerald-200 text-emerald-900 shadow-sm'
                                                    : 'bg-white/25 text-white shadow-sm'
                                                : scrolled
                                                    ? 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-800'
                                                    : 'text-white/80 hover:text-white hover:bg-white/15'
                                                }`}
                                        >
                                            <svg className="w-4 h-4 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 21h18" />
                                                <path d="M5 21V7l8-4v18" />
                                                <path d="M19 21V9l-6-2" />
                                                <circle cx="9" cy="12" r="1" />
                                                <circle cx="9" cy="15" r="1" />
                                            </svg>
                                            Farms
                                        </Link>

                                        <Link
                                            to="/applications"
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${isActive('/applications')
                                                ? scrolled
                                                    ? 'bg-emerald-200 text-emerald-900 shadow-sm'
                                                    : 'bg-white/25 text-white shadow-sm'
                                                : scrolled
                                                    ? 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-800'
                                                    : 'text-white/80 hover:text-white hover:bg-white/15'
                                                }`}
                                        >
                                            <svg className="w-4 h-4 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14,2 14,8 20,8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                            </svg>
                                            Applications
                                        </Link>

                                        <Link
                                            to="/opentowork"
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group border ${isActive('/opentowork')
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg border-transparent'
                                                : scrolled
                                                    ? 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200 hover:border-green-300'
                                                    : 'bg-green-500/20 text-white hover:bg-green-500/30 border-green-400/30 hover:border-green-400/50'
                                                }`}
                                        >
                                            <svg className="w-4 h-4 transition-transform group-hover:rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M8 12h8" />
                                                <path d="M12 8v8" />
                                            </svg>
                                            Open to Work
                                        </Link>
                                    </>
                                )}

                                {user && user.role === "ROLE_COMPANY" && (
                                    <>
                                        <Link
                                            to="/company/dashboard"
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${isActive('/company/dashboard')
                                                ? scrolled
                                                    ? 'bg-emerald-200 text-emerald-900 shadow-sm'
                                                    : 'bg-white/25 text-white shadow-sm'
                                                : scrolled
                                                    ? 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-800'
                                                    : 'text-white/80 hover:text-white hover:bg-white/15'
                                                }`}
                                        >
                                            <svg className="w-4 h-4 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="7" height="7" />
                                                <rect x="14" y="3" width="7" height="7" />
                                                <rect x="14" y="14" width="7" height="7" />
                                                <rect x="3" y="14" width="7" height="7" />
                                            </svg>
                                            Dashboard
                                        </Link>

                                        <Link
                                            to="/company/jobseekers"
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${isActive('/company/jobseekers')
                                                ? scrolled
                                                    ? 'bg-emerald-200 text-emerald-900 shadow-sm'
                                                    : 'bg-white/25 text-white shadow-sm'
                                                : scrolled
                                                    ? 'text-gray-700 hover:bg-emerald-100 hover:text-emerald-800'
                                                    : 'text-white/80 hover:text-white hover:bg-white/15'
                                                }`}
                                        >
                                            <svg className="w-4 h-4 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                            Find Workers
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>

                        {/* CTA & User Actions */}
                        <div className="hidden lg:flex items-center gap-4">
                            {/* Post Job CTA for Companies */}
                            {user && user.role === "ROLE_COMPANY" && (
                                <Link
                                    to="/add"
                                    className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-emerald-900 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 group overflow-hidden"
                                >
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                                    <svg className="w-5 h-5 transition-transform group-hover:rotate-90 relative z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M8 12h8" />
                                        <path d="M12 8v8" />
                                    </svg>
                                    <span className="relative z-10">Post Job</span>
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse relative z-10"></div>
                                </Link>
                            )}

                            {/* User Profile or Auth Buttons */}
                            {user ? (
                                <div className="relative" ref={navRef}>
                                    <button
                                        onClick={() => toggleDropdown('user')}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${scrolled
                                            ? 'hover:bg-emerald-50 hover:shadow-md border border-emerald-100'
                                            : 'hover:bg-white/15 backdrop-blur-sm border border-white/20'
                                            }`}
                                        aria-expanded={activeDropdown === 'user'}
                                    >
                                        {/* Enhanced User Avatar */}
                                        <div className={`relative w-11 h-11 rounded-xl flex items-center justify-content font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105 ${scrolled
                                            ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-200/50'
                                            : 'bg-gradient-to-br from-emerald-800 to-green-800 shadow-black/20'
                                            }`}>
                                            <span className="text-lg mx-auto">
                                                {user.username?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                            {/* Online indicator */}
                                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm">
                                                <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                                            </div>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex flex-col items-start">
                                            <span className={`font-semibold text-sm leading-tight ${scrolled ? 'text-gray-900' : 'text-white'
                                                }`}>
                                                {user.username}
                                            </span>
                                            <span className={`text-xs leading-tight ${scrolled ? 'text-emerald-600' : 'text-emerald-200'
                                                }`}>
                                                {user.role === 'ROLE_COMPANY' ? 'Farm Owner' : 'Worker'}
                                            </span>
                                        </div>

                                        {/* Dropdown Arrow */}
                                        <svg
                                            className={`w-4 h-4 transition-all duration-300 ${activeDropdown === 'user' ? 'rotate-180' : ''
                                                } ${scrolled ? 'text-gray-600' : 'text-white/80'}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>

                                    {/* Enhanced Dropdown Menu */}
                                    {activeDropdown === 'user' && (
                                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-sm">
                                            {/* User Info Header */}
                                            <div className="px-6 py-4 border-b border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg">
                                                        {user.username?.charAt(0)?.toUpperCase() || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-lg">{user.username}</p>
                                                        <p className="text-sm text-emerald-600 font-medium">
                                                            {user.role === 'ROLE_COMPANY' ? '🌾 Farm Owner Account' : '👨‍🌾 Worker Account'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
                                                >
                                                    <div className="p-2.5 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                                                        <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                            <circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold">My Profile</span>
                                                        <p className="text-xs text-gray-500">Manage account settings</p>
                                                    </div>
                                                </Link>

                                                <hr className="my-2 border-gray-100" />

                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-4 px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left group"
                                                >
                                                    <div className="p-2.5 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                                                        <svg className="w-5 h-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                                            <polyline points="16 17 21 12 16 7" />
                                                            <line x1="21" y1="12" x2="9" y2="12" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold">Sign Out</span>
                                                        <p className="text-xs text-gray-500">End your session</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 border ${scrolled
                                            ? 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border-gray-200 hover:border-emerald-300'
                                            : 'text-white/90 hover:text-white hover:bg-white/15 border-white/20 hover:border-white/40'
                                            }`}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="relative px-6 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-emerald-900 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 transform hover:-translate-y-1 transition-all duration-300 border border-yellow-300 group overflow-hidden"
                                    >
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                        <span className="relative z-10">Get Started</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${scrolled
                                ? 'text-gray-700 hover:bg-emerald-50 border border-emerald-100'
                                : 'text-white hover:bg-white/15 border border-white/20'
                                }`}
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`} />
                                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                                    }`} />
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-xl border-t border-emerald-100 shadow-2xl z-40 rounded-b-2xl mx-4 mb-4">
                        <div className="px-6 py-6 space-y-3">
                            <Link
                                to="/"
                                className={`flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-300 ${isActive('/') ? 'bg-emerald-100 text-emerald-800 shadow-sm' : 'text-gray-700 hover:bg-emerald-50'
                                    }`}
                            >
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                        <line x1="8" y1="21" x2="16" y2="21" />
                                        <line x1="12" y1="17" x2="12" y2="21" />
                                    </svg>
                                </div>
                                <span>Browse Jobs</span>
                            </Link>

                            {user ? (
                                <>
                                    {user.role === "ROLE_USER" && (
                                        <>
                                            <Link
                                                to="/companies"
                                                className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-emerald-50 transition-all duration-300"
                                            >
                                                <div className="p-2 bg-emerald-100 rounded-lg">
                                                    <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M3 21h18" />
                                                        <path d="M5 21V7l8-4v18" />
                                                        <path d="M19 21V9l-6-2" />
                                                        <circle cx="9" cy="12" r="1" />
                                                    </svg>
                                                </div>
                                                <span>Farms</span>
                                            </Link>
                                            <Link
                                                to="/applications"
                                                className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-emerald-50 transition-all duration-300"
                                            >
                                                <div className="p-2 bg-emerald-100 rounded-lg">
                                                    <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <polyline points="14,2 14,8 20,8" />
                                                        <line x1="16" y1="13" x2="8" y2="13" />
                                                    </svg>
                                                </div>
                                                <span>My Applications</span>
                                            </Link>
                                            <Link
                                                to="/opentowork"
                                                className="flex items-center gap-4 px-4 py-4 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-900 font-semibold hover:from-green-200 hover:to-emerald-200 transition-all duration-300"
                                            >
                                                <div className="p-2 bg-green-200 rounded-lg">
                                                    <svg className="w-5 h-5 text-emerald-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <path d="M8 12h8" />
                                                        <path d="M12 8v8" />
                                                    </svg>
                                                </div>
                                                <span>Open to Work</span>
                                            </Link>
                                        </>
                                    )}

                                    {user.role === "ROLE_COMPANY" && (
                                        <>
                                            <Link
                                                to="/company/dashboard"
                                                className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-emerald-50 transition-all duration-300"
                                            >
                                                <div className="p-2 bg-emerald-100 rounded-lg">
                                                    <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="3" width="7" height="7" />
                                                        <rect x="14" y="3" width="7" height="7" />
                                                        <rect x="14" y="14" width="7" height="7" />
                                                        <rect x="3" y="14" width="7" height="7" />
                                                    </svg>
                                                </div>
                                                <span>Dashboard</span>
                                            </Link>
                                            <Link
                                                to="/company/jobseekers"
                                                className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-emerald-50 transition-all duration-300"
                                            >
                                                <div className="p-2 bg-emerald-100 rounded-lg">
                                                    <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                        <circle cx="9" cy="7" r="4" />
                                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                    </svg>
                                                </div>
                                                <span>Find Workers</span>
                                            </Link>
                                            <Link
                                                to="/add"
                                                className="flex items-center gap-4 px-4 py-4 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100 text-emerald-900 font-bold hover:from-amber-200 hover:to-yellow-200 transition-all duration-300 shadow-md"
                                            >
                                                <div className="p-2 bg-amber-200 rounded-lg">
                                                    <svg className="w-5 h-5 text-emerald-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <path d="M8 12h8" />
                                                        <path d="M12 8v8" />
                                                    </svg>
                                                </div>
                                                <span>Post New Job</span>
                                                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse ml-auto"></div>
                                            </Link>
                                        </>
                                    )}

                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-emerald-50 transition-all duration-300"
                                        >
                                            <div className="p-2 bg-emerald-100 rounded-lg">
                                                <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </div>
                                            <span>My Profile</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-4 px-4 py-4 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 w-full text-left"
                                        >
                                            <div className="p-2 bg-red-100 rounded-lg">
                                                <svg className="w-5 h-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                                    <polyline points="16 17 21 12 16 7" />
                                                    <line x1="21" y1="12" x2="9" y2="12" />
                                                </svg>
                                            </div>
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                                    <Link
                                        to="/login"
                                        className="flex items-center justify-center gap-3 px-6 py-4 text-center rounded-xl border-2 border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line x1="15" y1="12" x2="3" y2="12" />
                                        </svg>
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="flex items-center justify-center gap-3 px-6 py-4 text-center rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-emerald-900 font-bold shadow-lg hover:from-amber-500 hover:to-yellow-500 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <line x1="20" y1="8" x2="20" y2="14" />
                                            <line x1="23" y1="11" x2="17" y2="11" />
                                        </svg>
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header