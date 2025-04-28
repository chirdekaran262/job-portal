import React, { useState, useEffect } from 'react';
import { getAllJobs } from '../services/jobService';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const data = await getAllJobs();
            setJobs(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch jobs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    if (loading) {
        return <div className="loading">Loading jobs...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <div className="page-header">
                <h2>Available Jobs</h2>
            </div>

            {jobs.length === 0 ? (
                <p className="no-data">No jobs available at the moment.</p>
            ) : (
                <div className="job-grid">
                    {jobs.map((job) => (
                        <div key={job.id} className="job-card">
                            <h3>{job.title}</h3>
                            <p className="job-location">{job.location}</p>
                            <p className="job-salary">
                                ${job.minSalary} - ${job.maxSalary}
                            </p>
                            <div className="job-actions">
                                <Link to={`/jobs/${job.id}`} className="btn btn-info">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobList;