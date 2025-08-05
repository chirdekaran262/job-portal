// CompanyDashboard.jsx
import React, { useEffect, useState } from 'react';
import { getCompanyJobs, deleteJob } from '../services/jobService';
import { useNavigate, useLocation } from 'react-router-dom';
import CompanyApplications from './CompanyApplications';

const CompanyDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('jobs');
    const navigate = useNavigate();
    const location = useLocation();

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const companyJobs = await getCompanyJobs();
            setJobs(companyJobs);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            setError('Failed to load jobs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [location]);

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to remove this job from the field?')) {
            try {
                await deleteJob(jobId);
                setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
                alert('Job removed successfully from your field.');
            } catch (error) {
                console.error('Failed to delete job:', error);
                alert('Failed to remove job. Please try again.');
            }
        }
    };

    const handleUpdate = (jobId) => {
        navigate(`/edit/${jobId}`);
    };

    const handleAddJob = () => {
        navigate('/add');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative mb-8">
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl">🚜</div>
                    </div>
                    <p className="text-green-700 text-xl font-semibold">Preparing your farm dashboard...</p>
                    <p className="text-green-600 text-sm mt-2">Gathering crops and workers</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md">
                    <div className="text-6xl mb-4">🚫</div>
                    <h3 className="text-xl font-bold text-red-700 mb-2">Farm Error</h3>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchJobs}
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <div className="text-4xl">🌾</div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white">Farm Dashboard</h1>
                            </div>
                            <p className="text-green-100 text-lg">Manage your farm jobs and worker applications</p>
                        </div>
                        <button
                            onClick={handleAddJob}
                            className="bg-white hover:bg-green-50 text-green-700 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                        >
                            <span className="text-2xl">🌱</span>
                            Plant New Job
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('jobs')}
                            className={`py-4 px-6 font-semibold border-b-4 transition-colors duration-200 flex items-center gap-2 ${activeTab === 'jobs'
                                ? 'border-green-600 text-green-700 bg-green-50'
                                : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300'
                                }`}
                        >
                            <span className="text-xl">🌾</span>
                            Job Fields ({jobs.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`py-4 px-6 font-semibold border-b-4 transition-colors duration-200 flex items-center gap-2 ${activeTab === 'applications'
                                ? 'border-amber-600 text-amber-700 bg-amber-50'
                                : 'border-transparent text-gray-600 hover:text-amber-600 hover:border-amber-300'
                                }`}
                        >
                            <span className="text-xl">👥</span>
                            Applications
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Jobs Tab */}
                {activeTab === 'jobs' && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-green-800 mb-2 flex items-center gap-3">
                                <div className="text-3xl">🚜</div>
                                Your Job Fields
                            </h2>
                            <p className="text-green-600">Manage and monitor your active job postings</p>
                        </div>

                        {jobs.length === 0 ? (
                            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                                <div className="text-8xl mb-6">🌱</div>
                                <h3 className="text-2xl font-bold text-green-800 mb-4">Field Ready for Planting</h3>
                                <p className="text-green-600 text-lg mb-8 max-w-md mx-auto">
                                    Your job field is currently empty. Start by planting your first job opportunity to attract skilled farm workers!
                                </p>
                                <button
                                    onClick={handleAddJob}
                                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto text-lg"
                                >
                                    <span className="text-2xl">🌾</span>
                                    Plant Your First Job
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100 overflow-hidden"
                                    >
                                        {/* Job Card Header */}
                                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                                            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                                            <p className="text-green-100 line-clamp-2">{job.description}</p>
                                        </div>

                                        {/* Job Card Body */}
                                        <div className="p-6 space-y-4">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                                                    <div className="text-xl">📍</div>
                                                    <div>
                                                        <span className="text-sm font-medium text-green-700">Location:</span>
                                                        <p className="text-green-900 font-semibold">{job.location}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                                                    <div className="text-xl">💰</div>
                                                    <div>
                                                        <span className="text-sm font-medium text-amber-700">Salary Range:</span>
                                                        <p className="text-amber-900 font-semibold">${job.minSalary?.toLocaleString()} - ${job.maxSalary?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Additional Job Details */}
                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                                <div className="text-center">
                                                    <div className="text-2xl mb-1">📅</div>
                                                    <p className="text-xs text-gray-500">Posted</p>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl mb-1">👥</div>
                                                    <p className="text-xs text-gray-500">Applications</p>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        {job.applicationCount || 0}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4">
                                                <button
                                                    onClick={() => handleUpdate(job.id)}
                                                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 border border-blue-200"
                                                >
                                                    <span className="text-lg">✏️</span>
                                                    Edit Job
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job.id)}
                                                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 border border-red-200"
                                                >
                                                    <span className="text-lg">🗑️</span>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Job Status Indicator */}
                                        <div className="bg-green-600 px-6 py-3">
                                            <div className="flex items-center justify-between text-white">
                                                <span className="text-sm font-medium">Status: Active</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                                                    <span className="text-sm">Live</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Applications Tab */}
                {activeTab === 'applications' && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-amber-800 mb-2 flex items-center gap-3">
                                <div className="text-3xl">👥</div>
                                Worker Applications
                            </h2>
                            <p className="text-amber-600">Review and manage applications from potential farm workers</p>
                        </div>
                        <CompanyApplications />
                    </div>
                )}
            </div>

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 md:hidden">
                <button
                    onClick={handleAddJob}
                    className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CompanyDashboard;