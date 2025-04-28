import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserApplications } from '../services/jobApplicationService';

const UserApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                if (user?.id) {
                    const data = await getUserApplications(user.id);
                    setApplications(data);
                } else {
                    setError('User ID is missing. Please log in again.');
                }
            } catch (err) {
                setError('Failed to load your applications. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user]);

    if (loading) {
        return <div className="container mt-5 text-center">Loading your applications...</div>;
    }

    if (error) {
        return <div className="container mt-5 text-center text-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">My Job Applications</h1>

            {applications.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted">You haven't applied to any jobs yet.</p>
                    <Link to="/" className="btn btn-primary mt-3">
                        Browse Jobs
                    </Link>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Applied On</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(application => (
                                <tr key={application.id}>
                                    <td>{application.job?.title || 'N/A'}</td>
                                    <td>{application.job?.company?.name || 'N/A'}</td>
                                    <td>
                                        {application.appliedDate
                                            ? new Date(application.appliedDate).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${application.status === 'PENDING'
                                                    ? 'bg-warning'
                                                    : application.status === 'CONFIRMED'
                                                        ? 'bg-success'
                                                        : 'bg-danger'
                                                }`}
                                        >
                                            {application.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/jobs/${application.job?.id}`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            View Job
                                        </Link>
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

export default UserApplications;