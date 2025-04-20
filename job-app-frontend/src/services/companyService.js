const API_URL = 'http://localhost:8081/company';

export const getAllCompanies = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch companies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
};

export const getCompanyById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch company');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching company:', error);
        throw error;
    }
};

export const createCompany = async (companyData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyData),
        });
        if (!response.ok) {
            throw new Error('Failed to create company');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

export const updateCompany = async (id, companyData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyData),
        });
        if (!response.ok) {
            throw new Error('Failed to update company');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating company:', error);
        throw error;
    }
};

export const deleteCompany = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete company');
        }
        return await response.text(); // since controller returns a message string
    } catch (error) {
        console.error('Error deleting company:', error);
        throw error;
    }
};
