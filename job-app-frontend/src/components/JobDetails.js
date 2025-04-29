import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import { applyForJob } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
    const { id } = useParams(); // Extract the job ID from the URL
    const navigate = useNavigate(); // For navigation
    const { user } = useAuth(); // Get the logged-in user
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applyStatus, setApplyStatus] = useState(null); // To show application status

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const data = await getJobById(id); // Fetch job details by ID
                setJob(data);
            } catch (err) {
                setError('Failed to load job details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        } else {
            setError('Invalid job ID');
            setLoading(false);
        }
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            alert('You must be logged in to apply for a job.');
            navigate('/login');
            return;
        }

        try {
            const coverLetter = prompt('Enter your cover letter (optional):', '');
            const resumeUrl = prompt('Enter your resume URL (optional):', '');
            console.log("Application ", id, user.id, coverLetter, resumeUrl)
            await applyForJob(id, user.id, coverLetter, resumeUrl);
            setApplyStatus('Application submitted successfully!');
        } catch (err) {
            console.error('Error applying for the job:', err);
            setApplyStatus(err.message || 'Failed to submit application. Please try again.');
        }
    };

    if (loading) {
        return <div className="loading">Loading job details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!job) {
        return <div className="error">Job not found</div>;
    }

    return (
        <div className="job-details-container">
            <div className="job-details-card">
                <h1 className="job-title">{job.title}</h1>
                <p className="job-description">{job.description}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> ${job.minSalary} - ${job.maxSalary}</p>
                <p><strong>Posted By:</strong> {job.company?.name || 'N/A'}</p>
            </div>

            <div className="job-details-actions">
                <button className="btn btn-primary" onClick={handleApply}>
                    Apply Now
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    Back to Jobs
                </button>
            </div>

            {applyStatus && <p className="apply-status">{applyStatus}</p>}
        </div>
    );
};

export default JobDetails;