import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/opentowork.css';

const OpenToWorkSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { message, isNew, profileData } = location.state || {};

    return (
        <div className="success-message">
            <div className="status-badge">
                <span className="status-icon">✓</span>
                <span className="status-text">{message || 'OpenToWork Profile Active'}</span>
            </div>

            {profileData && (
                <div className="profile-details">
                    <h3>{profileData.name}</h3>
                    <p className="description">{profileData.description}</p>
                    {profileData.location && (
                        <p className="location">Location: {profileData.location}</p>
                    )}
                    {profileData.jobtypes && (
                        <p className="job-types">Looking for: {profileData.jobtypes}</p>
                    )}
                </div>
            )}

            <div className="action-buttons">
                <button
                    className="btn-secondary"
                    onClick={() => navigate('/opentowork/update')}
                >
                    Update Profile
                </button>
                <button
                    className="btn-primary"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default OpenToWorkSuccess;