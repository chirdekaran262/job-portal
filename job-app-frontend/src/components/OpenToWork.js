import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import OpenToWorkPost from './OpenToWorkPost';
import OpenToWorkSuccess from './OpenToWorkSuccess';
import OpenToWorkStatus from './OpenToWorkStatus';
import { getToken } from '../services/authService';
import '../styles/opentowork.css';

const OpenToWork = () => {
    const [hasProfile, setHasProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
    const token = getToken('token');

    useEffect(() => {
        const checkProfile = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

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
                    console.log('Profile data:', data); // Debug log
                    if (data && data.id) {
                        setProfileData(data);
                        setHasProfile(true);
                    } else {
                        setProfileData(null);
                        setHasProfile(false);
                    }
                } else if (response.status === 404) {
                    setHasProfile(false);
                    setProfileData(null);
                }
            } catch (error) {
                console.error('Error checking profile:', error);
                setHasProfile(false);
            } finally {
                setLoading(false);
            }
        };

        checkProfile();
    }, [token]);

    const handleStatusChange = (newStatus) => {
        setHasProfile(newStatus);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <Routes>
            <Route path="/" element={
                <div className="opentowork-container">
                    <div className="opentowork-banner">
                        <h1 className="banner-title">Open To Work Status</h1>
                        <p className="banner-desc">Let local farms know you're available for work</p>
                    </div>

                    <OpenToWorkStatus
                        hasProfile={hasProfile}
                        profileData={profileData}
                        onStatusChange={handleStatusChange}
                    />

                    {!hasProfile && (
                        <div className="farm-section">
                            <h3>Why create an OpenToWork profile?</h3>
                            <p>When you're "Open To Work," local farms can find you when they need help. This gives you:</p>

                            <div className="farm-card">
                                <strong>More opportunities</strong>
                                <p>Farms can contact you directly about work, even before posting jobs publicly</p>
                            </div>

                            <div className="farm-card">
                                <strong>Better matches</strong>
                                <p>Farms can find workers with specific skills they need</p>
                            </div>

                            <div className="farm-card">
                                <strong>Faster hiring</strong>
                                <p>Skip the application process when farms contact you first</p>
                            </div>

                            <button
                                className="btn-primary create-profile-btn"
                                onClick={() => navigate('/opentowork/create')}
                            >
                                Create OpenToWork Profile
                            </button>
                        </div>
                    )}
                </div>
            } />

            <Route path="/create" element={
                hasProfile ? <Navigate to="/opentowork" replace /> : <OpenToWorkPost />
            } />

            <Route path="/update" element={
                !hasProfile ? <Navigate to="/opentowork" replace /> : <OpenToWorkPost isEditing={true} profileData={profileData} />
            } />

            <Route path="/success" element={<OpenToWorkSuccess />} />

            <Route path="*" element={<Navigate to="/opentowork" replace />} />
        </Routes>
    );
};

export default OpenToWork;