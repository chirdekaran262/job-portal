import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const OpenToWorkList = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = getToken('token');

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('http://localhost:8081/opentowork/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfiles(data);
                } else {
                    throw new Error('Failed to fetch profiles');
                }
            } catch (err) {
                setError('Could not load OpenToWork profiles');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [token]);

    if (loading) {
        return <div className="loading">Loading profiles...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="openwork-list-container">
            <div className="list-header">
                <h1>Available Job Seekers</h1>
                <p>Find qualified workers for your farm</p>
            </div>

            <div className="profiles-grid">
                {profiles.map(profile => (
                    <div key={profile.id} className="profile-card">
                        <div className="profile-header">
                            <h2>{profile.name}</h2>
                            <span className="status-badge active">Open To Work</span>
                        </div>

                        <div className="profile-body">
                            <p className="description">{profile.description}</p>

                            {profile.location && (
                                <div className="profile-detail">
                                    <span className="detail-icon">📍</span>
                                    <span>{profile.location}</span>
                                </div>
                            )}

                            {profile.jobtypes && (
                                <div className="profile-detail">
                                    <span className="detail-icon">💼</span>
                                    <span>{profile.jobtypes}</span>
                                </div>
                            )}
                        </div>

                        <div className="profile-actions">
                            <button className="btn-primary">
                                Contact Worker
                            </button>
                            <button className="btn-secondary">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpenToWorkList;