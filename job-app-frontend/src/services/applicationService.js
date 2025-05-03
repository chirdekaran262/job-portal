import axios from 'axios';

export const applyForJob = async (jobId, userId, coverLetter = '', resumeUrl = '') => {
    try {
        const params = new URLSearchParams();
        params.append('jobId', jobId);
        params.append('userId', userId);
        params.append('coverLetter', coverLetter);
        params.append('resumeUrl', resumeUrl);
        
        const response = await axios.post(
            'http://localhost:8081/applications/apply',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
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
