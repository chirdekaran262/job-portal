const API_URL = 'http://localhost:8081';

export const getAllJobs = async () => {
    try {
        const response = await fetch(`${API_URL}/jobs`);
        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

export const getJobById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/jobs/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch job details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching job details:', error);
        throw error;
    }
};

export const createJob = async (jobData) => {
    try {
        const response = await fetch(`${API_URL}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });
        if (!response.ok) {
            throw new Error('Failed to create job');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

export const updateJob = async (id, jobData) => {
    try {
        const response = await fetch(`${API_URL}/jobs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });
        if (!response.ok) {
            throw new Error('Failed to update job');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating job:', error);
        throw error;
    }
};

export const deleteJob = async (id) => {
    try {
        const response = await fetch(`${API_URL}/jobs/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete job');
        }
        return true;
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
};