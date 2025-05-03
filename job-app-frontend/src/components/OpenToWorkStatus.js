import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const OpenToWorkStatus = () => {
    const [loading, setLoading] = useState(true);
    const [hasOpenToWork, setHasOpenToWork] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = getToken('token');

    useEffect(() => {
        const checkOpenToWorkStatus = async () => {
            try {
                const response = await fetch('http://localhost:8081/opentowork/status', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Status response:', data);
                    // Check if we have valid profile data with an ID
                    if (data && data.id) {
                        setProfileData(data);
                        setHasOpenToWork(true);
                    } else {
                        setProfileData(null);
                        setHasOpenToWork(false);
                    }
                } else if (response.status === 404) {
                    setHasOpenToWork(false);
                    setProfileData(null);
                } else {
                    throw new Error('Failed to check OpenToWork status');
                }
            } catch (err) {
                setError('Could not check your OpenToWork status');
                console.error('Error checking OpenToWork status:', err);
                setHasOpenToWork(false);
                setProfileData(null);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            checkOpenToWorkStatus();
        }
    }, [token]);

    const handleDeleteOpenToWork = async () => {
        if (window.confirm('Are you sure you want to remove your OpenToWork profile?')) {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8081/opentowork/', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: profileData.id })
                });

                if (!response.ok) {
                    throw new Error('Failed to delete OpenToWork profile');
                }

                setHasOpenToWork(false);
                setProfileData(null);
                alert('Your OpenToWork profile has been removed.');
            } catch (err) {
                setError('Failed to remove your OpenToWork profile.');
                console.error('Error deleting OpenToWork:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <div className="opentowork-status loading">Checking your status...</div>;
    }

    if (error) {
        return <div className="opentowork-status error">{error}</div>;
    }

    return (
        <div className="opentowork-status-container">
            {hasOpenToWork ? (
                <div className="opentowork-active">
                    <div className="status-badge">
                        <span className="status-icon">✓</span>
                        <span className="status-text">You're Open To Work!</span>
                    </div>
                    <p className="status-description">
                        Local farms can now find your profile and contact you for work opportunities.
                    </p>
                    <div className="status-actions">
                        <button
                            className="btn-secondary"
                            onClick={() => navigate('/opentowork/update')}
                        >
                            <img src="/icons/edit.svg" alt="" className="btn-icon" />
                            Update Profile
                        </button>
                        <button
                            className="btn-danger"
                            onClick={handleDeleteOpenToWork}
                        >
                            <img src="/icons/delete.svg" alt="" className="btn-icon" />
                            Remove Profile
                        </button>
                    </div>
                </div>
            ) : (
                <div className="opentowork-inactive">
                    <div className="status-badge inactive">
                        <span className="status-icon">!</span>
                        <span className="status-text">Not Open To Work</span>
                    </div>
                    <p className="status-description">
                        Create an OpenToWork profile to let farms know you're available.
                    </p>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/opentowork/create')}
                    >
                        <img src="/icons/plus.svg" alt="" className="btn-icon" />
                        Create OpenToWork Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default OpenToWorkStatus;