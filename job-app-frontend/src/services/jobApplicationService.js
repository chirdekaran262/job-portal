import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8081';

export const applyForJob = async (jobId, userId, coverLetter = '', resumeUrl = '', experience = '') => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.post(
            `${API_URL}/applications/apply`,
            {
                jobId,
                userId,
                coverLetter,
                resumeUrl,
                experience
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error applying for the job:', error);
        throw error;
    }
};

export const getUserApplications = async (userId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.get(`${API_URL}/applications/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user applications:', error);
        throw error;
    }
};

export const getCompanyApplications = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        // Fixed the API URL to use the API_URL constant
        const response = await axios.get(`${API_URL}/applications/company`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }
};

export const getApplicationDetails = async (applicationId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.get(`${API_URL}/applications/${applicationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching application details:', error);
        throw error;
    }
};

export const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.put(
            `${API_URL}/applications/${applicationId}/status`,
            { status: newStatus },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating application status:', error);
        throw error;
    }
};