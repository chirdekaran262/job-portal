import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createJob, getJobById, updateJob } from '../services/jobService';
import '../styles/components.css';

const JobForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const initialFormState = {
        title: '',
        description: '',
        location: '',
        minSalary: '',
        maxSalary: '',
        companyId: 1 // Default company ID
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchJobData = async () => {
            if (isEditMode) {
                try {
                    const job = await getJobById(id);
                    setFormData({
                        title: job.title,
                        description: job.description,
                        location: job.location,
                        minSalary: job.minSalary,
                        maxSalary: job.maxSalary,
                        companyId: job.companyId || 1
                    });
                } catch (err) {
                    setError('Failed to load job data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchJobData();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (isEditMode) {
                await updateJob(id, formData);
            } else {
                await createJob(formData);
            }
            navigate('/');
        } catch (err) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} job. Please try again.`);
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
                <h2>
                    {isEditMode ? 'Edit Job' : 'Add New Job'}
                </h2>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">
                            Job Title
                        </label>
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
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">
                            Location
                        </label>
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
                            <label htmlFor="minSalary">
                                Minimum Salary
                            </label>
                            <input
                                type="text"
                                id="minSalary"
                                name="minSalary"
                                value={formData.minSalary}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="maxSalary">
                                Maximum Salary
                            </label>
                            <input
                                type="text"
                                id="maxSalary"
                                name="maxSalary"
                                value={formData.maxSalary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`btn btn-primary ${submitting ? 'btn-disabled' : ''
                                }`}
                        >
                            {submitting
                                ? 'Saving...'
                                : isEditMode
                                    ? 'Update Job'
                                    : 'Create Job'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;