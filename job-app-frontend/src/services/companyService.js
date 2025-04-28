import { getToken } from './authService';

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