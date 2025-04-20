import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">Job Portal</h1>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add" className="nav-link">Add Job</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;