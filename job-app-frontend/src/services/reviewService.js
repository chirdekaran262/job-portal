// src/services/reviewService.js
import { getToken } from './authService';

const API_URL = 'http://localhost:8081';

export const getAllReviews = async (companyId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}/reviews`, {
            headers: {
                ...(getToken() && { 'Authorization': `Bearer ${getToken()}` })
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const getReviewById = async (companyId, reviewId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}/reviews/${reviewId}`, {
            headers: {
                ...(getToken() && { 'Authorization': `Bearer ${getToken()}` })
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch review');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }
};

export const createReview = async (companyId, reviewData) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_URL}/company/${companyId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to create review');
        }

        return await response.text();
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

export const updateReview = async (companyId, reviewId, reviewData) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_URL}/company/${companyId}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to update review');
        }

        return await response.text();
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};

export const deleteReview = async (companyId, reviewId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_URL}/company/${companyId}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to delete review');
        }

        return await response.text();
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};

// Function to get all reviews for a specific company by companyId
export const getReviewsByCompanyId = async (companyId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}/reviews`, {
            headers: {
                ...(getToken() && { 'Authorization': `Bearer ${getToken()}` })
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching reviews by company:', error);
        throw error;
    }
};

// Function to add a new review for a specific company
export const addReview = async (companyId, reviewData) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_URL}/company/${companyId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to add review');
        }

        // Handle both JSON and text responses
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};