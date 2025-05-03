import axios from 'axios';

export const updateUserProfile = async (formData) => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const response = await axios.put(
        'http://localhost:8081/api/user/profile',
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};