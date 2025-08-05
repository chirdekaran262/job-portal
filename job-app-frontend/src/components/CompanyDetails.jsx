import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyById } from '../services/companyService';
import '../styles/jobdetails.css';

const CompanyDetails = () => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getCompanyById(id);
                setCompany(data);
            } catch (err) {
                console.error('Error fetching company details:', err);
                setError('Failed to load company details. The farm might be out of range, please try again later!');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [id]);

    const StarRating = ({ rating }) => (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-green-700 text-lg font-medium">Loading farm details...</p>
                    <p className="text-green-600 text-sm mt-2">Gathering fresh information from the fields</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-red-100">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
                        <p className="text-red-600 font-medium mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Farm Not Found</h3>
                        <p className="text-gray-600 font-medium">This company is not in our fields yet.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{company.name}</h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                            {company.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Company Information Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                Farm Information
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-blue-600 mb-1">Location</p>
                                        <p className="text-gray-800 font-semibold">{company.location || 'Location not specified'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-purple-600 mb-1">Industry</p>
                                        <p className="text-gray-800 font-semibold">{company.industry || 'Industry not specified'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 rounded-xl bg-green-50 border border-green-100">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-green-600 mb-1">Website</p>
                                        {company.website ? (
                                            <a
                                                href={company.website.startsWith('http') ? company.website : `//${company.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors inline-flex items-center"
                                            >
                                                {company.website}
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <p className="text-gray-500 font-medium">Website not available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white flex items-center">
                                            <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                            Farmer Reviews
                                        </h2>
                                        <p className="text-green-100 mt-2">What fellow farmers are saying about this company</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-white">{company.reviews?.length || 0}</div>
                                        <div className="text-green-100 text-sm">Reviews</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {company.reviews && company.reviews.length > 0 ? (
                                    <div className="space-y-6">
                                        {company.reviews.map((review) => (
                                            <div key={review.id} className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-green-200">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{review.title}</h3>
                                                        <StarRating rating={review.rating} />
                                                    </div>
                                                    <div className="ml-4 text-right">
                                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                            <span className="text-green-600 font-bold text-lg">{review.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-gray-700 leading-relaxed mb-4 text-base">{review.content}</p>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{review.authorName || 'Anonymous Farmer'}</p>
                                                            <p className="text-sm text-gray-500">Verified Farm Worker</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-100 to-green-100 rounded-full flex items-center justify-center mb-6">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">No Reviews Yet</h3>
                                        <p className="text-gray-600 text-lg mb-2">No reviews have been harvested for this farm yet.</p>
                                        <p className="text-gray-500">Be the first farmer to share your experience working here!</p>
                                        <div className="mt-6">
                                            <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg">
                                                Write a Review
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;