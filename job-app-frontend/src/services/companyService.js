import { getToken } from './authService';

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
export const getCompanyDashboard = async (companyId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`/company/${companyId}/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch company dashboard data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching company dashboard:', error);
        throw error;
    }
};


// export const  = async () => {
//     const token = getToken();
//     if (!token) {
//         throw new Error('Authentication required');
//     }
//     const response = await fetch(`/company`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     console.log('Response from getAllCompanies:', response);
//     return response.data;
// };
export const getAllCompanies = async () => {
    try {
        const response = await fetch('/company', { headers: buildHeaders() });
        if (!response.ok) throw new Error('Failed to fetch companies');
        const data = await response.json(); // <-- Fix: extract JSON body
        // console.log('Response from getAllCompanies:', data);
        console.log('Description:', data.description); // Debugging line
        return data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
};

export const getCompanyById = async (id) => {
    try {
        const response = await fetch(`/company/${id}`, { headers: buildHeaders() });
        if (!response.ok) throw new Error('Failed to fetch company details');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching company details:', error);
        throw error;
    }
};