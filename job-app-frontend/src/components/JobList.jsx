import React, { useState, useEffect } from 'react';
import {
    Search,
    MapPin,
    DollarSign,
    Building2,
    Filter,
    ChevronDown,
    Briefcase,
    Users,
    Clock,
    Sprout,
    Tractor,
    Shield,
    BookOpen,
    Calendar
} from 'lucide-react';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        jobType: '',
        location: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            let url = '/jobs'; // Base URL for jobs

            // Check if location filter is applied
            if (filters.location) {
                url = `/jobs/location?location=${encodeURIComponent(filters.location)}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
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
    }, [filters.location]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const jobTypes = [
        'All Jobs',
        'Field Worker',
        'Equipment Operator',
        'Farm Manager',
        'Livestock Handler',
        'Crop Specialist',
        'Seasonal Worker'
    ];

    const filteredJobs = jobs.filter(job => {
        const matchesType = !filters.jobType || filters.jobType === 'All Jobs' || job.title?.toLowerCase().includes(filters.jobType.toLowerCase());
        const matchesLocation = !filters.location || job.location?.toLowerCase().includes(filters.location.toLowerCase());
        return matchesType && matchesLocation;
    });

    // Helper function to format date
    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Recently posted';

        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
        return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} ago`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading farm opportunities...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
                    <div className="text-red-500 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                        <p className="text-gray-600">{error}</p>
                        <button
                            onClick={fetchJobs}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="in-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Find Your Dream
                            <span className="block text-green-200">Farm Career</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                            Discover rewarding opportunities in agriculture. Join the future of farming with top employers across the country.
                        </p>
                        <div className="flex items-center justify-center space-x-8 text-green-200">
                            <div className="flex items-center space-x-2">
                                <Briefcase className="w-5 h-5" />
                                <span>{jobs.length}+ Jobs</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Building2 className="w-5 h-5" />
                                <span>100+ Farms</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5" />
                                <span>5000+ Workers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search and Filters */}
                <div className="bg-gradient-to-br from-white via-white-100 to-yellow-300 rounded-2xl shadow-xl p-6 mb-12 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Location Search */}
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                Location
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter city, state, or region..."
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                />
                                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Job Type Filter */}
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Filter className="w-4 h-4 inline mr-1" />
                                Job Type
                            </label>
                            <div className="relative">
                                <select
                                    name="jobType"
                                    value={filters.jobType}
                                    onChange={handleFilterChange}
                                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
                                >
                                    {jobTypes.map(type => (
                                        <option key={type} value={type === 'All Jobs' ? '' : type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end">
                            <button
                                onClick={fetchJobs}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Search Jobs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
                        </h2>
                        <p className="text-gray-600">
                            {filters.location && `in ${filters.location} • `}
                            {filters.jobType && `${filters.jobType} positions`}
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Updated 5 minutes ago</span>
                    </div>
                </div>

                {/* Job Cards */}
                {filteredJobs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Sprout className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your search criteria or check back later for new opportunities.
                        </p>
                        <button
                            onClick={() => setFilters({ jobType: '', location: '' })}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
                        {filteredJobs.map((job) => (
                            <div key={job.id} className="bg-gradient-to-br from-green-200 via-yellow-100 to-yellow-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                                {/* You can add urgent badge logic based on your backend data */}
                                {job.urgent && (
                                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-4 py-2">
                                        🔥 URGENT HIRING
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                {job.title}
                                            </h3>
                                            <div className="flex items-center text-gray-600 mb-1">
                                                <Building2 className="w-4 h-4 mr-2" />
                                                <span className="font-medium">
                                                    {job.company?.name || 'Farm name not available'}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-500 mb-3">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>{job.location}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <Tractor className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center text-green-600 font-semibold">
                                            <DollarSign className="w-4 h-4 mr-1" />
                                            <span>
                                                {job.minSalary?.toLocaleString()} - {job.maxSalary?.toLocaleString()}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {getTimeAgo(job.createdAt || job.datePosted)}
                                        </span>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                // You can integrate with your routing here
                                                window.location.href = `/jobs/${job.id}`;
                                                // Or if using React Router: navigate(`/jobs/${job.id}`);
                                            }}
                                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            View Details
                                        </button>
                                        <button className="px-4 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors">
                                            💚
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Resources Section */}
                <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl shadow-xl p-8 text-white">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl text-white font-bold mb-2">Farm Worker Resources</h3>
                        <p className="text-blue-100">Everything you need to succeed in your agricultural career</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <a href="#" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200 group">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <h4 className="font-semibold mb-2">Seasonal Calendar</h4>
                                <p className="text-sm text-blue-100">Plan your year with our comprehensive seasonal work guide</p>
                            </div>
                        </a>

                        <a href="#" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200 group">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h4 className="font-semibold mb-2">Skills Guide</h4>
                                <p className="text-sm text-blue-100">Master essential agricultural skills and techniques</p>
                            </div>
                        </a>

                        <a href="#" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200 group">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h4 className="font-semibold mb-2">Safety Tips</h4>
                                <p className="text-sm text-blue-100">Stay safe with our comprehensive safety guidelines</p>
                            </div>
                        </a>

                        <a href="#" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200 group">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h4 className="font-semibold mb-2">Worker Rights</h4>
                                <p className="text-sm text-blue-100">Know your rights and protections as a farm worker</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobList;