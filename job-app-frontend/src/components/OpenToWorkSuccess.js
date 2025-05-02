import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/opentowork.css';

const OpenToWorkSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get message from location state, or use default message
    const message = location.state?.message || 'Your OpenToWork profile has been successfully saved!';
    const isNew = location.state?.isNew !== false; // Default to true if not specified

    return (
        <div className="opentowork-container">
            <div className="success-message">
                <div className="success-icon">
                    {/* <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
                    <circle cx="12" cy="12" r="10" fill="#4caf50" />
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {/* </svg> */}
                </div>

                <h2>{isNew ? 'Profile Created!' : 'Profile Updated!'}</h2>
                <p>{message}</p>

                <div className="farm-card">
                    <h3>What happens next?</h3>
                    <p>
                        Local farms can now see your profile when they search for workers.
                        They may contact you directly if your skills match their needs.
                    </p>
                </div>

                <div className="success-actions">
                    <button className="btn-primary" onClick={() => navigate('/')}>
                        Go to Job List
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={() => navigate('/opentowork/update')}
                        style={{ marginTop: '12px' }}
                    >
                        Update My Profile
                    </button>
                </div>

                <div className="farm-section">
                    <h3>Ready to find work faster?</h3>
                    <p>
                        Browse available farm jobs and apply directly to positions that match your skills!
                    </p>
                    <button
                        className="btn-secondary"
                        onClick={() => navigate('/jobs')}
                        style={{ marginTop: '10px' }}
                    >
                        View Farm Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OpenToWorkSuccess;