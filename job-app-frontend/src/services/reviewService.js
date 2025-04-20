const API_URL = 'http://localhost:8081';

export const getAllReviews = async (companyId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}/reviews`);
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
        const response = await fetch(`${API_URL}/company/${companyId}/reviews/${reviewId}`);
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
        const response = await fetch(`${API_URL}/company/${companyId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) {
            throw new Error('Failed to create review');
        }
        return await response.text();  // since your controller returns a String
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

export const updateReview = async (companyId, reviewId, reviewData) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) {
            throw new Error('Failed to update review');
        }
        return await response.text();
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};

export const deleteReview = async (companyId, reviewId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}/reviews/${reviewId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete review');
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
        const response = await fetch(`${API_URL}/company/${companyId}/reviews`);
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
        const response = await fetch(`${API_URL}/company/${companyId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) {
            throw new Error('Failed to create review');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding review:', error);
        throw error;
    }
};
