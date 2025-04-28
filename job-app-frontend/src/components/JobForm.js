import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createJob, getJobById, updateJob } from '../services/jobService';
import '../styles/components.css';

const JobForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        minSalary: '',
        maxSalary: '',
    });

    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            if (isEditMode) {
                try {
                    const job = await getJobById(id);
                    setFormData({
                        title: job.title,
                        description: job.description,
                        location: job.location,
                        minSalary: job.minSalary,
                        maxSalary: job.maxSalary,
                    });
                } catch {
                    setError('Failed to load job data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchJob();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const jobData = {
            ...formData,
            minSalary: formData.minSalary ? Number(formData.minSalary) : 0,
            maxSalary: formData.maxSalary ? Number(formData.maxSalary) : 0,
        };

        try {
            if (isEditMode) {
                await updateJob(id, jobData);
            } else {
                await createJob(jobData);
            }
            navigate('/');
        } catch (err) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} job: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading job data...</div>;
    }

    return (
        <div className="container">
            <div className="form-container">
                <h2>{isEditMode ? 'Edit Job' : 'Add New Job'}</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Job Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="minSalary">Minimum Salary</label>
                            <input
                                type="number"
                                id="minSalary"
                                name="minSalary"
                                value={formData.minSalary}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="maxSalary">Maximum Salary</label>
                            <input
                                type="number"
                                id="maxSalary"
                                name="maxSalary"
                                value={formData.maxSalary}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn" disabled={submitting}>
                        {submitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Job' : 'Create Job')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
