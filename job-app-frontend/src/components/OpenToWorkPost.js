import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/opentowork.css';
import { getToken } from '../services/authService';
import OpenToWorkStatus from './OpenToWorkStatus';

const OpenToWorkPost = () => {
    const [post, setPost] = useState({
        name: '',
        description: '',
        location: '',
        jobtypes: '',
        notes: '',
        resumeUrl: '',
        status: 'openToWork',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [existingProfile, setExistingProfile] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const token = getToken('token');

    // Check if we are in update mode
    useEffect(() => {
        if (location.pathname.includes('/update')) {
            setIsEditing(true);
            fetchExistingProfile();
        }
    }, [location.pathname]);

    // Fetch the existing profile if we're in edit mode
    const fetchExistingProfile = async () => {
        try {
            console.log('Fetching existing profile...'); // Debugging line
            setLoading(true);
            const response = await fetch('/opentowork/status', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response); // Debugging line
            if (!response.ok) {
                throw new Error('Failed to fetch your OpenToWork profile');
            }

            const data = await response.json();
            setExistingProfile(data);

            // Set form values from existing profile
            setPost({
                name: data.name || '',
                description: data.description || '',
                location: data.location && data.location.length > 0 ? data.location.join(', ') : '',
                jobtypes: data.jobtypes && data.jobtypes.length > 0 ? data.jobtypes.join(', ') : '',
                notes: data.notes && data.notes.length > 0 ? data.notes[0] : '',
                resumeUrl: data.resumeUrl || '',
                status: data.status || 'openToWork',
            });
        } catch (err) {
            setError('Could not load your existing profile. Please try again later.');
            console.error('Error fetching profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Prepare payload to match backend (arrays for location, jobtypes, notes)
        const payload = {
            ...post,
            location: post.location ? post.location.split(',').map(l => l.trim()) : [],
            jobtypes: post.jobtypes ? post.jobtypes.split(',').map(j => j.trim()) : [],
            notes: post.notes ? [post.notes] : [],
        };

        try {
            const url = isEditing ? '/opentowork/update' : '/opentowork/';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.status === 409) {
                setError('You have already posted OpenToWork. Please update your existing profile instead.');
                setLoading(false);
                return;
            }

            if (response.status === 403) {
                setError('You are not authorized to post. Make sure you are logged in with the correct role.');
                setLoading(false);
                return;
            }

            if (!response.ok) {
                throw new Error(`Failed to ${isEditing ? 'update' : 'create'} OpenToWork profile`);
            }

            setSuccess(true);
            navigate('/opentowork/success', {
                replace: true,
                state: {
                    isNew: !isEditing,
                    message: isEditing
                        ? 'Your OpenToWork profile has been updated successfully!'
                        : 'Your OpenToWork profile has been created successfully!'
                }
            });
        } catch (err) {
            setError(`Failed to ${isEditing ? 'update' : 'create'} OpenToWork profile. Please try again later.`);
            console.error('Error submitting form:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to remove your OpenToWork profile? Farms will no longer be able to find you.')) {
            try {
                setLoading(true);
                const response = await fetch('/opentowork/', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete OpenToWork profile');
                }

                setSuccess(false);
                setPost({
                    name: '',
                    description: '',
                    location: '',
                    jobtypes: '',
                    notes: '',
                    resumeUrl: '',
                    status: 'openToWork',
                });

                alert('Your OpenToWork profile has been removed.');
                navigate('/');
            } catch (err) {
                setError('Failed to remove OpenToWork profile. Please try again later.');
                console.error('Error deleting profile:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading && isEditing && !existingProfile) {
        return (
            <div className="opentowork-container">
                <div className="opentowork-loading">
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="opentowork-container">
            <div className="opentowork-banner">
                <h1 className="banner-title">Let Farms Find You!</h1>
                <p className="banner-desc">
                    Share your skills and availability. Connect with local farms looking for hands like yours.
                </p>
            </div>

            {/* Show OpenToWork Status only on the main page, not in create/update mode */}
            {location.pathname === '/opentowork' && (
                <OpenToWorkStatus />
            )}

            <h2 className="form-title">
                {isEditing ? 'Update Your OpenToWork Profile' : 'Create OpenToWork Profile'}
            </h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="opentowork-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={post.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">About Your Experience</label>
                    <textarea
                        id="description"
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                        placeholder="Describe your farm work experience, skills, and what kind of work you're looking for"
                        required
                    ></textarea>
                    <small>Share details about your skills, past experiences, and availability.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Preferred Locations</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={post.location}
                        onChange={handleChange}
                        placeholder="e.g. Nashik, Pune, Kolhapur"
                    />
                    <small>Where can you work? (separate multiple places with commas)</small>
                </div>

                <div className="form-group">
                    <label htmlFor="jobtypes">Job Types</label>
                    <input
                        type="text"
                        id="jobtypes"
                        name="jobtypes"
                        value={post.jobtypes}
                        onChange={handleChange}
                        placeholder="e.g. Field Worker, Equipment Operator, Harvest Helper"
                        required
                    />
                    <small>For multiple types, separate with commas.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Additional Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={post.notes}
                        onChange={handleChange}
                        placeholder="Any additional information (transportation needs, preferred working hours, etc.)"
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="resumeUrl">Resume or Portfolio URL (Optional)</label>
                    <input
                        type="url"
                        id="resumeUrl"
                        name="resumeUrl"
                        value={post.resumeUrl}
                        onChange={handleChange}
                        placeholder="Link to your resume or work portfolio"
                    />
                    <small>If you have your resume online, provide the link here.</small>
                </div>

                <div className="farm-tips">
                    <h4>Tips for a Great Profile</h4>
                    <ul>
                        <li>Be specific about your skills and experience</li>
                        <li>Mention any farm equipment you can operate</li>
                        <li>Include your availability (seasonal, weekends, etc.)</li>
                        <li>List any certifications or specialized training</li>
                    </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {isEditing ? (
                        <>
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                            <button
                                type="button"
                                className="btn-danger"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Delete Profile'}
                            </button>
                        </>
                    ) : (
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Posting...' : 'Post OpenToWork'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OpenToWorkPost;