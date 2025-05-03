import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OpenToWorkPost from './OpenToWorkPost';
import OpenToWorkSuccess from './OpenToWorkSuccess';
import OpenToWorkStatus from './OpenToWorkStatus';
import '../styles/opentowork.css';

const OpenToWork = () => {
    return (
        <Routes>
            {/* Main OpenToWork page - shows status and options */}
            <Route path="/" element={
                <div className="opentowork-container">
                    <div className="opentowork-banner">
                        {/* <img src="/farm-banner.png" alt="Farm Banner" className="banner-img" /> */}
                        <h1 className="banner-title">Open To Work Status</h1>
                        <p className="banner-desc">Let local farms know you're available for work</p>
                    </div>
                    <OpenToWorkStatus />

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
                    </div>
                </div>
            } />

            {/* Create new OpenToWork profile */}
            <Route path="/create" element={<OpenToWorkPost />} />

            {/* Update existing OpenToWork profile */}
            <Route path="/update" element={<OpenToWorkPost />} />

            {/* Success page after creating/updating */}
            <Route path="/success" element={<OpenToWorkSuccess />} />

            {/* Redirect any other paths to the main OpenToWork page */}
            <Route path="*" element={<Navigate to="/opentowork" replace />} />
        </Routes>
    );
};

export default OpenToWork;