// CompanyApplications.jsx
import React, { useState, useEffect } from 'react';
import { getCompanyApplications, updateApplicationStatus, getApplicationDetails } from '../services/jobApplicationService';
import { useAuth } from '../context/AuthContext';

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

            if (newStatus === 'CONFIRMED') {
                alert('Worker hired successfully! They\'ve been notified.');
            } else if (newStatus === 'REJECTED') {
                alert('Applicant notified that position has been filled.');
            }
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update worker status.');
        }
    };

    const handleDeleteApplication = async (applicationId) => {
        try {
            await updateApplicationStatus(applicationId, 'REJECTED');
            setApplications(prevApps => prevApps.filter(app => app.id !== applicationId));
            alert('Application deleted successfully.');
        }
        catch (err) {
            console.error('Error deleting application:', err);
            setError('Failed to delete application.');
        }
    };

    const handleViewDetails = async (applicationId) => {
        try {
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
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
                    <p className="text-green-700 text-lg font-semibold">Loading applications...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
                    <div className="text-6xl mb-4">⚠️</div>
                    <p className="text-red-600 text-lg font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="text-5xl">🌾</div>
                        <h1 className="text-4xl font-bold text-green-800">Farm Worker Applications</h1>
                    </div>
                    <p className="text-green-600 text-lg">Manage your farm worker applications with ease</p>
                </div>

                {applications.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-2xl mx-auto">
                        <div className="text-8xl mb-6">🏡</div>
                        <h3 className="text-2xl font-bold text-green-800 mb-4">No Applications Yet</h3>
                        <p className="text-green-600 text-lg">No workers have applied to your farm positions yet. Keep your job postings active!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {applications.map(application => (
                            <div key={application.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100 overflow-hidden">
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl font-bold">
                                                {application.user?.fullName?.charAt(0) || '👤'}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">
                                                    {application.user?.fullName || 'Unknown Worker'}
                                                </h3>
                                                <p className="text-green-100 text-sm">
                                                    {application.job?.title || 'Position N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${application.status === 'PENDING' ? 'bg-yellow-400 text-yellow-900' :
                                                application.status === 'CONFIRMED' ? 'bg-green-400 text-green-900' :
                                                    'bg-red-400 text-red-900'
                                            }`}>
                                            {application.status === 'PENDING' ? '⏳ Pending' :
                                                application.status === 'CONFIRMED' ? '✅ Hired' :
                                                    '❌ Rejected'}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                                            <span className="text-green-700 font-medium text-sm">Applied:</span>
                                            <span className="text-green-800 text-sm">
                                                {application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 px-3 bg-amber-50 rounded-lg">
                                            <span className="text-amber-700 font-medium text-sm">Email:</span>
                                            <span className="text-amber-800 text-sm truncate ml-2">
                                                {application.user?.email || 'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => handleViewDetails(application.id)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            📋 View Details
                                        </button>

                                        {application.status === 'PENDING' && (
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={() => handleStatusUpdate(application.id, 'CONFIRMED')}
                                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1 text-sm"
                                                >
                                                    ✅ Hire
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1 text-sm"
                                                >
                                                    ❌ Reject
                                                </button>
                                            </div>
                                        )}

                                        {application.status === 'CONFIRMED' && (
                                            <button
                                                onClick={() => handleDeleteApplication(application.id)}
                                                className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 border border-red-200"
                                            >
                                                🗑️ Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Application Details Modal */}
                {showDetailsModal && selectedApplication && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeDetailsModal}>
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white rounded-t-3xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">👤</div>
                                        <h2 className="text-2xl font-bold">Application Details</h2>
                                    </div>
                                    <button
                                        onClick={closeDetailsModal}
                                        className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Worker Information */}
                                <div className="bg-green-50 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                                        <span className="text-xl">👨‍🌾</span>
                                        Worker Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-sm font-medium text-green-700 mb-1">Name:</span>
                                            <span className="block text-green-900 font-semibold">{selectedApplication.user?.fullName || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-green-700 mb-1">Email:</span>
                                            <span className="block text-green-900 break-all">{selectedApplication.user?.email || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-green-700 mb-1">Phone:</span>
                                            <span className="block text-green-900">{selectedApplication.user?.phoneNumber || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Position Details */}
                                <div className="bg-amber-50 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                                        <span className="text-xl">🌾</span>
                                        Position Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-sm font-medium text-amber-700 mb-1">Position:</span>
                                            <span className="block text-amber-900 font-semibold">{selectedApplication.job?.title || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-amber-700 mb-1">Applied On:</span>
                                            <span className="block text-amber-900">
                                                {selectedApplication.appliedDate ? new Date(selectedApplication.appliedDate).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-amber-700 mb-1">Status:</span>
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${selectedApplication.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
                                                    selectedApplication.status === 'CONFIRMED' ? 'bg-green-200 text-green-800' :
                                                        'bg-red-200 text-red-800'
                                                }`}>
                                                {selectedApplication.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Cover Letter */}
                                {selectedApplication.coverLetter && (
                                    <div className="bg-blue-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                                            <span className="text-xl">📝</span>
                                            Cover Letter
                                        </h3>
                                        <div className="bg-white rounded-xl p-4 text-gray-700 leading-relaxed">
                                            <p>{selectedApplication.coverLetter}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Resume */}
                                {selectedApplication.resumeUrl && (
                                    <div className="bg-purple-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
                                            <span className="text-xl">📄</span>
                                            Resume
                                        </h3>
                                        <a
                                            href={selectedApplication.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                                        >
                                            📎 View Resume
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            {selectedApplication.status === 'PENDING' && (
                                <div className="p-6 bg-gray-50 rounded-b-3xl">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                handleStatusUpdate(selectedApplication.id, 'CONFIRMED');
                                                closeDetailsModal();
                                            }}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            ✅ Hire This Worker
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleStatusUpdate(selectedApplication.id, 'REJECTED');
                                                closeDetailsModal();
                                            }}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            ❌ Reject Application
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyApplications;