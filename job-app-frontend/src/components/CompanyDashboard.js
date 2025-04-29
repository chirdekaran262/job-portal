import React, { useEffect, useState } from 'react';
import { getCompanyJobs, deleteJob } from '../services/jobService';
import { useNavigate, useLocation } from 'react-router-dom'; // added useLocation
import './CompanyDashboard.css';
import CompanyApplications from './CompanyApplications';

const CompanyDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // watch for route changes

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
    }, [location]); // trigger fetch when navigating back

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await deleteJob(jobId);
                setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
                alert('Job deleted successfully.');
            } catch (error) {
                console.error('Failed to delete job:', error);
                alert('Failed to delete job. Please try again.');
            }
        }
    };

    const handleUpdate = (jobId) => {
        navigate(`/edit/${jobId}`); // Go to edit page
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="company-dashboard">
            <h2 className="dashboard-title">My Posted Jobs</h2>
            {jobs.length === 0 ? (
                <p className="no-jobs-message">No jobs posted yet.</p>
            ) : (
                <div className="job-cards-container">
                    {jobs.map((job) => (
                        <div key={job.id} className="job-card">
                            <h3 className="job-title">{job.title}</h3>
                            <p className="job-description">{job.description}</p>
                            <p className="job-location"><strong>Location:</strong> {job.location}</p>
                            <p className="job-salary">
                                <strong>Salary:</strong> ${job.minSalary} - ${job.maxSalary}
                            </p>
                            <div className="job-actions">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleUpdate(job.id)}
                                >
                                    Update Job
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(job.id)}
                                >
                                    Delete Job
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <CompanyApplications />
        </div>
    );
};

export default CompanyDashboard;
