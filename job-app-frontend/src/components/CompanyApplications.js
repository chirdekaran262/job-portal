// CompanyApplications.jsx
import React, { useState, useEffect } from 'react';
import { getCompanyApplications, updateApplicationStatus } from '../services/jobApplicationService';
import { useAuth } from '../context/AuthContext';
// import '../styles/FarmTheme.css'; // We'll create this custom CSS file

const CompanyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getCompanyApplications();
                setApplications(data);
                console.log('Fetched applications:', data);
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError('Failed to gather applications. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user]);

    const handleStatusUpdate = async (applicationId, newStatus) => {
        try {
            await updateApplicationStatus(applicationId, newStatus);
            setApplications(prevApps =>
                prevApps.map(app =>
                    app.id === applicationId ? { ...app, status: newStatus } : app
                )
            );

            // Show farm-themed confirmation
            if (newStatus === 'CONFIRMED') {
                alert('Hand hired for the harvest! They\'ve been notified.');
            } else if (newStatus === 'REJECTED') {
                alert('Applicant notified that position has been filled.');
            }
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update worker status.');
        }
    };

    if (loading) {
        return <div className="harvest-loading">Gathering applications from the field...</div>;
    }

    if (error) {
        return <div className="harvest-error">{error}</div>;
    }

    return (
        <div className="harvest-container">
            {applications.length === 0 ? (
                <div className="empty-harvest">
                    <div className="empty-harvest-icon"></div>
                    <p>No hands have applied yet. The harvest awaits workers!</p>
                </div>
            ) : (
                <div className="harvest-table-container">
                    <table className="harvest-table">
                        <thead>
                            <tr>
                                <th>Farm Hand</th>
                                <th>Contact (Email)</th>
                                <th>Phone</th>
                                <th>Position</th>
                                <th>Applied On</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(application => (
                                <tr key={application.id}>
                                    <td>
                                        <div className="farmhand-name">
                                            <span className="worker-icon"></span>
                                            {application.user?.fullName || 'N/A'}
                                        </div>
                                    </td>
                                    <td>
                                        {application.user?.email || 'N/A'}
                                    </td>
                                    <td>
                                        {application.user?.phoneNumber || 'N/A'}
                                    </td>
                                    <td>
                                        {application.job?.title || 'N/A'}
                                    </td>
                                    <td>
                                        {application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : '-'}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${application.status.toLowerCase()}`}>
                                            {application.status === 'PENDING' ? 'Pending' :
                                                application.status === 'CONFIRMED' ? 'Hired' :
                                                    'Not Selected'}
                                        </span>
                                    </td>
                                    <td>
                                        {application.status === 'PENDING' ? (
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleStatusUpdate(application.id, 'CONFIRMED')}
                                                    className="hire-button"
                                                >
                                                    Hire
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                                                    className="pass-button"
                                                >
                                                    Pass
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="processed-label">Processed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompanyApplications;