import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8081';

export const applyForJob = async (jobId, userId, coverLetter = '', resumeUrl = '') => {
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
                resumeUrl
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

        const response = await axios.get(`http://localhost:8081/applications/users/${userId}`, {
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

export const getCompanyApplications = async (companyId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`/company/${companyId}/pending`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch applications');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }
};
export const getPendingApplications = async (companyId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.get(
            `${API_URL}/applications/company/${companyId}/pending`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching pending applications:', error);
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