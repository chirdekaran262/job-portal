import React, { useState, useEffect } from 'react';
import { getAllCompanies } from '../services/companyService';
import { Link } from 'react-router-dom';
import '../styles/components.css'; // You can reuse the styles

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const data = await getAllCompanies();
            console.log('Fetched companies:', data); // Debugging line
            setCompanies(data);
            setError(null);
        } catch (err) {
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
                <div className="job-grid">
                    {companies.map((company) => (
                        <div key={company.id} className="job-card">
                            <h3>{company.name}</h3>
                            <p className="job-location">{company.location}</p>
                            <p className="job-salary">{company.email}</p>
                            <div className="job-actions">
                                <Link to={`/companies/${company.id}`} className="btn btn-info">
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
