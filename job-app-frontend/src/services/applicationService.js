import axios from 'axios';
import { getToken } from './authService';

export const applyForJob = async (jobId, userId, coverLetter = '', resumeUrl = '') => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.post(
            'http://localhost:8081/applications/apply',
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
        if (error.response) {
            console.error('Backend error:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to apply for the job');
        } else {
            console.error('Error applying for the job:', error.message);
            throw error;
        }
    }
};
