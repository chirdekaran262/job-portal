import React, { useState, useEffect } from 'react';
import { getAllCompanies } from '../services/companyService';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const data = await getAllCompanies();
            // Convert object with numeric keys to array
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

    if (loading) {
        return <div className="loading">Loading companies...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <div className="page-header">
                <h2>Featured Companies</h2>
            </div>

            {companies.length === 0 ? (
                <p className="no-data">No companies available at the moment.</p>
            ) : (
                <div className="company-grid">
                    {companies.map((company) => (
                        <div key={company.id} className="company-card">
                            <h3 className="company-name">{company.name}</h3>
                            <p className="company-description">
                                {company.description || 'No description available'}
                            </p>
                            <div className="company-stats">
                                <span className="reviews-count">
                                    Reviews: {company.reviews?.length || 0}
                                </span>
                            </div>
                            <div className="company-actions">
                                <Link to={`/companies/${company.id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompanyList;
