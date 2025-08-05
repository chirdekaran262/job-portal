import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/authService';
import '../styles/opentowork.css';

const OpenToWorkWidget = () => {
    const [loading, setLoading] = useState(true);
    const [hasOpenToWork, setHasOpenToWork] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = getToken('token');

    useEffect(() => {
        // Check if the user has an OpenToWork profile
        const checkOpenToWorkStatus = async () => {
            try {
                const response = await fetch('/opentowork/status', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setHasOpenToWork(data.exists || false);
                } else if (response.status !== 404) {
                    // 404 means no profile, which is a valid state
                    throw new Error('Failed to check OpenToWork status');
                }
            } catch (err) {
                setError('Could not check your OpenToWork status');
                console.error('Error checking OpenToWork status:', err);
            } finally {
                setLoading(false);
            }
        };

        checkOpenToWorkStatus();
    }, [token]);

    if (loading) {
        return <div className="opentowork-widget loading">Loading...</div>;
    }

    if (error) {
        return null; // Hide widget if there's an error
    }

    return (
        <div className="opentowork-widget">
            {hasOpenToWork ? (
                <>
                    <div className="widget-content active">
                        <div className="widget-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="widget-info">
                            <span className="widget-status">Open To Work</span>
                            <p className="widget-text">Farms can see your profile</p>
                        </div>
                    </div>
                    <button
                        className="widget-button"
                        onClick={() => navigate('/opentowork/update')}
                    >
                        Manage
                    </button>
                </>
            ) : (
                <>
                    <div className="widget-content inactive">
                        <div className="widget-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="#9e9e9e" strokeWidth="2" />
                                <path d="M12 8V16" stroke="#9e9e9e" strokeWidth="2" strokeLinecap="round" />
                                <path d="M8 12H16" stroke="#9e9e9e" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="widget-info">
                            <span className="widget-status inactive">Not Open To Work</span>
                            <p className="widget-text">Let farms find you</p>
                        </div>
                    </div>
                    <button
                        className="widget-button create"
                        onClick={() => navigate('/opentowork/create')}
                    >
                        Create
                    </button>
                </>
            )}
        </div>
    );
};

export default OpenToWorkWidget;