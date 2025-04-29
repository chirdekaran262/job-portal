// src/components/JobList.js
import React, { useState, useEffect } from 'react';
import { getAllJobs } from '../services/jobService';
import { Link } from 'react-router-dom';
import '../styles/farm-theme.css';
import '../styles/job-list.css'; // Import the isolated CSS

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        jobType: '',
        location: ''
    });

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const data = await getAllJobs();
            setJobs(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch farm jobs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Job types specific to farming
    const jobTypes = [
        'All Jobs',
        'Field Worker',
        'Equipment Operator',
        'Farm Manager',
        'Livestock Handler',
        'Crop Specialist',
        'Seasonal Worker'
    ];

    if (loading) {
        return <div className="farm-loading">Loading farm jobs...</div>;
    }

    if (error) {
        return <div className="farm-error">{error}</div>;
    }

    return (
        <div className="farm-joblist-container">
            <div className="farm-joblist-header">
                <h2>Available Farm Jobs</h2>
                <p>Find your perfect role in agriculture</p>
            </div>

            {/* Filter section */}
            <div className="farm-filter-section">
                <div className="farm-filter-container">
                    <div className="farm-filter-group">
                        <label htmlFor="jobType">Job Type</label>
                        <select
                            id="jobType"
                            name="jobType"
                            value={filters.jobType}
                            onChange={handleFilterChange}
                            className="farm-filter-select"
                        >
                            {jobTypes.map(type => (
                                <option key={type} value={type === 'All Jobs' ? '' : type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="farm-filter-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter location..."
                            value={filters.location}
                            onChange={handleFilterChange}
                            className="farm-filter-input"
                        />
                    </div>
                </div>
            </div>

            {jobs.length === 0 ? (
                <p className="farm-no-data">No farm jobs available at the moment. Check back soon for new opportunities.</p>
            ) : (
                <div className="farm-job-grid">
                    {jobs.map((job) => (
                        <div key={job.id} className="farm-job-card">
                            <h3>{job.title}</h3>
                            <p className="farm-job-location">{job.location}</p>
                            <p className="farm-job-salary">
                                ${job.minSalary} - ${job.maxSalary}
                            </p>
                            <p className="farm-job-company">
                                {job.company?.name || 'Farm name not available'}
                            </p>
                            <div className="farm-job-actions">
                                <Link to={`/jobs/${job.id}`} className="farm-btn farm-btn-info">
                                    View Farm Job
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick links section */}
            <div className="farm-resources-section">
                <h3>Farm Worker Resources</h3>
                <div className="farm-resource-links">
                    <a href="#" className="farm-resource-link">Seasonal Work Calendar</a>
                    <a href="#" className="farm-resource-link">Agricultural Skills Guide</a>
                    <a href="#" className="farm-resource-link">Farm Safety Tips</a>
                    <a href="#" className="farm-resource-link">Worker Rights</a>
                </div>
            </div>
        </div>
    );
};

export default JobList;