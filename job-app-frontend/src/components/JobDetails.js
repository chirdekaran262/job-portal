import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import '../styles/components.css';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setLoading(true);
                const data = await getJobById(id);
                setJob(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch job details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading job details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!job) {
        return <div className="no-data">Job not found</div>;
    }

    return (
        <div className="container">
            <div className="detail-card">
                <h2>{job.title}</h2>

                <div className="detail-item">
                    <span className="label">Location:</span> {job.location}
                </div>

                <div className="detail-item">
                    <span className="label">Salary Range:</span> ${job.minSalary} - ${job.maxSalary}
                </div>

                <div className="detail-item">
                    <h3>Description:</h3>
                    <p>{job.description}</p>
                </div>

                <div className="button-group">
                    <Link to="/" className="btn btn-secondary">
                        Back to Jobs
                    </Link>
                    <Link to={`/edit/${job.id}`} className="btn btn-primary">
                        Edit Job
                    </Link>
                    {job.company && (
                        <Link to={`/company/${job.company.id}`} className="btn btn-info">
                            View Company Details
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
};

export default JobDetails;