import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsByCompanyId, addReview } from '../services/reviewService';
import './CompanyDetails.css'; // Import CSS

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        title: '',
        description: '',
        rating: 0,
    });

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8081/company/${id}`);
                const companyData = await response.json();
                if (companyData) setCompany(companyData);
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        };

        fetchCompanyDetails();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const companyReviews = await getReviewsByCompanyId(id);
                setReviews(companyReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [id]);

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleAddReview = async () => {
        try {
            const reviewData = {
                title: newReview.title,
                description: newReview.description,
                rating: parseFloat(newReview.rating),
            };
            const addedReview = await addReview(id, reviewData);
            setReviews([...reviews, addedReview]);
            setNewReview({ title: '', description: '', rating: 0 });
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <div className="company-details-container">
            {company && (
                <div className="company-header">
                    <h1>{company.title}</h1>
                    <p>{company.description}</p>
                    <p className="rating">⭐ {company.rating}</p>
                </div>
            )}

            <div className="reviews-section">
                <h2>Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first!</p>
                ) : (
                    <div className="review-list">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <h3>{review.title}</h3>
                                <p>{review.description}</p>
                                <p className="review-rating">Rating: {review.rating}⭐</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="add-review-form">
                <h3>Add a Review</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Review Title"
                    value={newReview.title}
                    onChange={handleReviewChange}
                />
                <textarea
                    name="description"
                    placeholder="Review Description"
                    value={newReview.description}
                    onChange={handleReviewChange}
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (0–5)"
                    value={newReview.rating}
                    onChange={handleReviewChange}
                    min="0"
                    max="5"
                    step="0.1"
                />
                <button onClick={handleAddReview}>Submit Review</button>
            </div>
        </div>
    );
};

export default CompanyDetails;
