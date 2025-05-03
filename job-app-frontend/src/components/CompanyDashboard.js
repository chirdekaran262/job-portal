// CompanyDashboard.jsx
import React, { useEffect, useState } from 'react';
import { getCompanyJobs, deleteJob } from '../services/jobService';
import { useNavigate, useLocation } from 'react-router-dom';
import CompanyApplications from './CompanyApplications';
import '../styles/FarmTheme.css'; // We'll create this custom CSS file

const CompanyDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        navigate('/post-job');
    }

    if (loading) {
        return <div className="farm-loading">
            <div className="tractor-loader"></div>
            <p>Plowing through data...</p>
        </div>;
    }

    if (error) {
        return <div className="farm-error">
            <div className="error-icon"></div>
            <p>{error}</p>
        </div>;
    }

    return (
        <div className="farm-dashboard">
            <div className="farm-header">
                <div className="farm-header-content">
                    <h1>Farm Jobs Dashboard</h1>
                    <button className="seed-button" onClick={handleAddJob}>
                        <span className="seed-icon"></span>
                        Plant New Job
                    </button>
                </div>
            </div>

            <div className="farm-content">
                <div className="field-section">
                    <h2 className="section-title">
                        <span className="field-icon"></span>
                        Your Job Field
                    </h2>

                    {jobs.length === 0 ? (
                        <div className="empty-field">
                            <div className="empty-field-icon"></div>
                            <p>Your field is currently fallow. Plant some job opportunities!</p>
                            <button className="seed-button" onClick={handleAddJob}>
                                <span className="seed-icon"></span>
                                Sow First Job
                            </button>
                        </div>
                    ) : (
                        <div className="crop-container">
                            {jobs.map((job) => (
                                <div key={job.id} className="crop-card">
                                    <div className="crop-content">
                                        <h3 className="crop-title">{job.title}</h3>
                                        <p className="crop-description">{job.description}</p>
                                        <div className="crop-details">
                                            <p className="crop-location">
                                                <span className="location-icon"></span>
                                                {job.location}
                                            </p>
                                            <p className="crop-salary">
                                                <span className="salary-icon"></span>
                                                ${job.minSalary} - ${job.maxSalary}
                                            </p>
                                        </div>
                                        <div className="crop-actions">
                                            <button
                                                className="tend-button"
                                                onClick={() => handleUpdate(job.id)}
                                            >
                                                Tend Job
                                            </button>
                                            <button
                                                className="remove-button"
                                                onClick={() => handleDelete(job.id)}
                                            >
                                                Uproot Job
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="harvest-section">
                    <div className="harvest-header">
                        <h2 className="section-title">
                            <span className="harvest-icon"></span>
                            Harvest Season: Applications
                        </h2>
                        <p>Review and select the best hands for your farm</p>
                    </div>
                    <CompanyApplications />
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;