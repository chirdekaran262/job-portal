import React, { useState, useEffect } from 'react';
import { getAllCompanies } from '../services/companyService';
import { Link } from 'react-router-dom';
// import '../styles/components.css';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const data = await getAllCompanies();
            console.log('Fetched companies:', data);
            const companiesArray = Object.values(data).filter(item => typeof item === 'object');
            setCompanies(companiesArray);
            setError(null);
        } catch (err) {
            console.error('Error fetching companies:', err);
            setError('Failed to fetch companies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Filter and sort companies
    const filteredAndSortedCompanies = companies
        .filter(company =>
            company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.location?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return (a.name || '').localeCompare(b.name || '');
                case 'reviews':
                    return (b.reviews?.length || 0) - (a.reviews?.length || 0);
                case 'location':
                    return (a.location || '').localeCompare(b.location || '');
                default:
                    return 0;
            }
        });

    const getReviewsAverage = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
        return (sum / reviews.length).toFixed(1);
    };

    const StarRating = ({ rating, size = 'small' }) => {
        const starSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
        return (
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`${starSize} ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="text-sm text-gray-600 ml-1">{rating}</span>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-green-700 text-lg font-medium">Loading farm companies...</p>
                        <p className="text-green-600 text-sm mt-2">Discovering agricultural opportunities</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-red-100">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to Load Companies</h3>
                            <p className="text-red-600 font-medium mb-4">{error}</p>
                            <button
                                onClick={fetchCompanies}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

                <div className="relative container mx-auto px-4 py-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Farm Companies</h1>
                        <p className="text-xl text-green-100">Discover leading agricultural employers and farming opportunities</p>
                        <div className="mt-6 flex justify-center">
                            <div className="bg-white bg-opacity-20 rounded-full px-6 py-2">
                                <span className="text-green-100 font-medium">{companies.length} Companies Available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search companies by name, description, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="reviews">Sort by Reviews</option>
                                <option value="location">Sort by Location</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    {searchTerm && (
                        <div className="mt-4 text-sm text-gray-600">
                            Found {filteredAndSortedCompanies.length} companies matching "{searchTerm}"
                        </div>
                    )}
                </div>

                {/* Companies Grid */}
                {filteredAndSortedCompanies.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-green-100">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-100 to-green-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            {searchTerm ? 'No companies found' : 'No companies available'}
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            {searchTerm
                                ? `We couldn't find any companies matching "${searchTerm}". Try adjusting your search terms.`
                                : "No farm companies are available at the moment. Please check back later."
                            }
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAndSortedCompanies.map((company) => {
                            const avgRating = getReviewsAverage(company.reviews);
                            const reviewCount = company.reviews?.length || 0;

                            return (
                                <div
                                    key={company.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden group hover:scale-105"
                                >
                                    {/* Company Header */}
                                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-4 border-b border-green-200">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-2">
                                                    {company.name}
                                                </h3>
                                                {company.location && (
                                                    <div className="flex items-center text-gray-600">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span className="text-sm">{company.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Content */}
                                    <div className="p-6">
                                        <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3">
                                            {company.description || 'This farm company is focused on sustainable agriculture and providing quality farming opportunities.'}
                                        </p>

                                        {/* Stats Section */}
                                        <div className="space-y-4 mb-6">
                                            {/* Reviews */}
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="font-medium text-gray-700">Reviews</span>
                                                </div>
                                                <div className="text-right">
                                                    {reviewCount > 0 ? (
                                                        <div className="flex items-center space-x-2">
                                                            <StarRating rating={parseFloat(avgRating)} />
                                                            <span className="text-sm text-gray-600">({reviewCount})</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-500">No reviews yet</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Industry */}
                                            {company.industry && (
                                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                                                        </svg>
                                                        <span className="font-medium text-gray-700">Industry</span>
                                                    </div>
                                                    <span className="text-sm text-gray-600 font-medium">{company.industry}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <Link
                                            to={`/companies/${company.id}`}
                                            className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors text-center block group-hover:bg-green-700"
                                        >
                                            View Company Details
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyList;