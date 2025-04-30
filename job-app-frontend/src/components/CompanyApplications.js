// CompanyApplications.jsx
import React, { useState, useEffect } from 'react';
import { getCompanyApplications, updateApplicationStatus, getApplicationDetails } from '../services/jobApplicationService';
import { useAuth } from '../context/AuthContext';
import '../styles/jobApplication.css'; // We'll create this custom CSS file

const CompanyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
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

    const handleViewDetails = async (applicationId) => {
        try {
            // If we already have all the data in the applications array, we can just use that
            const application = applications.find(app => app.id === applicationId);
            setSelectedApplication(application);
            setShowDetailsModal(true);
        } catch (err) {
            console.error('Error fetching application details:', err);
            setError('Failed to fetch application details.');
        }
    };

    const closeDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedApplication(null);
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
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => handleViewDetails(application.id)}
                                                className="view-details-button"
                                            >
                                                View Details
                                            </button>

                                            {application.status === 'PENDING' && (
                                                <>
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
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Application Details Modal */}
            {showDetailsModal && selectedApplication && (
                <div className="modal-overlay" onClick={closeDetailsModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Application Details</h2>
                            <button onClick={closeDetailsModal} className="close-button">Close</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-section">
                                <h3>Applicant Information</h3>
                                <p><span className="detail-label">Name:</span> {selectedApplication.user?.fullName || 'N/A'}</p>
                                <p><span className="detail-label">Email:</span> {selectedApplication.user?.email || 'N/A'}</p>
                                <p><span className="detail-label">Phone:</span> {selectedApplication.user?.phoneNumber || 'N/A'}</p>
                            </div>
                            <div className="detail-section">
                                <h3>Job Information</h3>
                                <p><span className="detail-label">Position:</span> {selectedApplication.job?.title || 'N/A'}</p>
                                <p><span className="detail-label">Applied On:</span> {selectedApplication.appliedDate ? new Date(selectedApplication.appliedDate).toLocaleDateString() : '-'}</p>
                                <p><span className="detail-label">Status:</span> {selectedApplication.status}</p>
                            </div>
                            {selectedApplication.coverLetter && (
                                <div className="cover-letter">
                                    <h3>Cover Letter</h3>
                                    <p>{selectedApplication.coverLetter}</p>
                                </div>
                            )}
                            {selectedApplication.resumeUrl && (
                                <div className="resume-section">
                                    <h3>Resume</h3>
                                    <a href={selectedApplication.resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-link">
                                        View Resume
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            {selectedApplication.status === 'PENDING' && (
                                <>
                                    <button
                                        onClick={() => {
                                            handleStatusUpdate(selectedApplication.id, 'CONFIRMED');
                                            closeDetailsModal();
                                        }}
                                        className="hire-button"
                                    >
                                        Hire This Hand
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleStatusUpdate(selectedApplication.id, 'REJECTED');
                                            closeDetailsModal();
                                        }}
                                        className="pass-button"
                                    >
                                        Pass on This Applicant
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyApplications;