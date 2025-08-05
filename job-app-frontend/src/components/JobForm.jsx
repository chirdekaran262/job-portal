import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createJob, getJobById, updateJob } from '../services/jobService';
import { Wheat, MapPin, DollarSign, Briefcase, Users, Sprout } from 'lucide-react';

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
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <span className="text-green-800 font-medium">Loading job data...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            {/* Header */}


            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-gradient-to-br from-green-200 via-amber-100 to-yellow-100 rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-green-600 via-amber-300 to-yellow-300 px-8 py-6">
                        <div className="flex items-center space-x-3 bg-white/20 p-3 rounded-lg backdrop-blur-sm ">
                            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                {isEditMode ? <Briefcase className="h-6 w-6 text-white" /> : <Users className="h-6 w-6 text-white" />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-black-300">
                                    {isEditMode ? 'Edit Farm Job' : 'Post New Farm Job'}
                                </h2>
                                <p className="text-black-300 mt-1 font-medium">
                                    {isEditMode ? 'Update job details for farm workers' : 'Find skilled farm workers for your agricultural needs'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 mb-6 flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-red-700 font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Job Title */}
                            <div className="form-group">
                                <label htmlFor="title" className="flex items-center space-x-2 text-gray-800 font-semibold mb-3">
                                    <Briefcase className="h-5 w-5 text-orange-600" />
                                    <span>Job Title</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Seasonal Farm Worker, Crop Harvester, Livestock Handler"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label htmlFor="description" className="flex items-center space-x-2 text-gray-800 font-semibold mb-3">
                                    <Sprout className="h-5 w-5 text-orange-600" />
                                    <span>Job Description</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Describe the farm work, responsibilities, required skills, working conditions, and any special requirements..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div className="form-group">
                                <label htmlFor="location" className="flex items-center space-x-2 text-gray-800 font-semibold mb-3">
                                    <MapPin className="h-5 w-5 text-orange-600" />
                                    <span>Farm Location</span>
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g., Rural Maharashtra, Nashik District"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    required
                                />
                            </div>

                            {/* Salary Range */}
                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
                                <div className="flex items-center space-x-2 mb-4">
                                    <DollarSign className="h-5 w-5 text-orange-600" />
                                    <h3 className="text-lg font-semibold text-orange-800">Salary Range (₹)</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label htmlFor="minSalary" className="block text-gray-700 font-medium mb-2">
                                            Minimum Salary (per month)
                                        </label>
                                        <input
                                            type="number"
                                            id="minSalary"
                                            name="minSalary"
                                            value={formData.minSalary}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder="15000"
                                            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="maxSalary" className="block text-gray-700 font-medium mb-2">
                                            Maximum Salary (per month)
                                        </label>
                                        <input
                                            type="number"
                                            id="maxSalary"
                                            name="maxSalary"
                                            value={formData.maxSalary}
                                            onChange={handleChange}
                                            min="0"
                                            placeholder="25000"
                                            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white px-8 py-3 rounded-xl hover:from-orange-700 hover:via-amber-700 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center space-x-2 shadow-lg"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>{isEditMode ? 'Updating...' : 'Creating...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Wheat className="h-4 w-4" />
                                            <span>{isEditMode ? 'Update Job' : 'Post Job'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Additional Info Card */}
                <div className="mt-8 bg-white rounded-xl shadow-lg border border-green-100 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-800">Tips for Better Job Postings</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-2">
                            <p>• Be specific about the type of farm work</p>
                            <p>• Mention working hours and seasonal requirements</p>
                            <p>• Include any provided accommodation or meals</p>
                        </div>
                        <div className="space-y-2">
                            <p>• Specify required experience level</p>
                            <p>• Mention physical demands of the job</p>
                            <p>• Include contact information for applications</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobForm;