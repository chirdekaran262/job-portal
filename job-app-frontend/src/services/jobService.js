import { getToken } from './authService';
import axios from 'axios';
// Common function to build headers
const buildHeaders = () => {
    const token = getToken();
    console.log('Token in job service:', token);  // Debugging log
    const headers = new Headers({ 'Content-Type': 'application/json' });

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    } else {
        console.warn('No token found in localStorage or getToken() returned undefined');
    }

    return headers;
};

// Get all jobs
const API_URL = 'http://localhost:8081';

export const getAllJobs = async () => {
    try {
        const response = await fetch('/jobs', { headers: buildHeaders() });
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return await response.json();
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// Get job by ID
export const getJobById = async (id) => {
    try {
        const response = await fetch(`/jobs/${id}`, { headers: buildHeaders() });
        if (!response.ok) throw new Error('Failed to fetch job details');
        return await response.json();
    } catch (error) {
        console.error('Error fetching job details:', error);
        throw error;
    }
};

// Create a new job
export const createJob = async (jobData) => {
    try {
        const response = await fetch('/jobs', {
            method: 'POST',
            headers: buildHeaders(),
            body: JSON.stringify(jobData),
        });

        const responseText = await response.text();
        let responseData;

        try {
            responseData = JSON.parse(responseText);
        } catch {
            responseData = responseText;
        }

        if (!response.ok) {
            const message = typeof responseData === 'object' && responseData.message
                ? responseData.message
                : 'Failed to create job';
            throw new Error(message);
        }

        return responseData;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

// Update an existing job
export const updateJob = async (id, jobData) => {
    try {
        const response = await fetch(`/jobs/${id}`, {
            method: 'PUT',
            headers: buildHeaders(),
            body: JSON.stringify(jobData),
        });

        const responseText = await response.text();
        let responseData;

        try {
            responseData = JSON.parse(responseText);
        } catch {
            responseData = responseText;
        }

        if (!response.ok) {
            const message = typeof responseData === 'object' && responseData.message
                ? responseData.message
                : 'Failed to update job';
            throw new Error(message);
        }

        return responseData;
    } catch (error) {
        console.error('Error updating job:', error);
        throw error;
    }
};

// Delete a job
export const deleteJob = async (id) => {
    try {
        const response = await fetch(`/jobs/${id}`, {
            method: 'DELETE',
            headers: buildHeaders(),
        });

        if (!response.ok) {
            const responseText = await response.text();
            throw new Error(responseText || 'Failed to delete job');
        }

        return true;
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
};

export const getCompanyJobs = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.get(`${API_URL}/jobs/company`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching company jobs:', error);
        throw error;
    }
};