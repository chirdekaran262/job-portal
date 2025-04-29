import React, { useState, useEffect } from 'react';
import { getCompanyApplications, updateApplicationStatus } from '../services/jobApplicationService';
import { useAuth } from '../context/AuthContext'; // make sure correct path

const CompanyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // assuming user object contains company info

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getCompanyApplications();
                setApplications(data);
                console.log('Fetched applications:', data); // Debugging line
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError('Failed to load applications. Please try again later.');
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
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update application status.');
        }
    };

    if (loading) {
        return <div className="text-center py-6">Loading applications...</div>;
    }

    if (error) {
        return <div className="text-center py-6 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

            {applications.length === 0 ? (
                <p className="text-gray-500">No applications received yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 border-b text-left">Applicant</th>
                                <th className="py-3 px-4 border-b text-left">Email</th>
                                <th className="py-3 px-4 border-b text-left">Phone</th>
                                <th className="py-3 px-4 border-b text-left">Job Title</th>
                                <th className="py-3 px-4 border-b text-left">Applied On</th>
                                <th className="py-3 px-4 border-b text-left">Status</th>
                                <th className="py-3 px-4 border-b text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(application => (
                                <tr key={application.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">
                                        {application.user?.fullName || 'N/A'}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {application.user?.email || 'N/A'}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {application.user?.phoneNumber || 'N/A'}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {application.job?.title || 'N/A'}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <span className={`px-2 py-1 rounded text-sm ${application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            application.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {application.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {application.status === 'PENDING' ? (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(application.id, 'CONFIRMED')}
                                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500">Processed</span>
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
