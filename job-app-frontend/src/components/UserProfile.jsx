import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/userService';
import '../styles/user-profile.css'; // Import the CSS file for styling

const UserProfile = () => {
    const { user, setUser } = useAuth(); // Assuming `useAuth` provides user and a way to update it
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                role: user.role || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const updatedUser = await updateUserProfile(formData);
            setUser(updatedUser); // Update the user in the context
            setSuccessMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-profile-container">
            <div className="user-profile-form">
                <h2>My Profile</h2>

                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role === 'ROLE_USER' ? 'Job Seeker' : 'Company'}
                            disabled
                        />
                    </div>

                    {isEditing ? (
                        <div className="button-group">
                            <button
                                type="submit"
                                className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="button-group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setIsEditing(true)}
                            >
                                Update Profile
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserProfile;