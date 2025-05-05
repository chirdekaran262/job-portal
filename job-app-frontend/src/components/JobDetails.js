// src/components/JobDetails.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../services/jobService"; // Assuming path is correct
import { applyForJob } from "../services/applicationService"; // Assuming path is correct
import { useAuth } from "../context/AuthContext"; // Assuming path is correct
import "../styles/farm-theme.css"; // Import the updated CSS

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applyStatus, setApplyStatus] = useState({ message: null, type: null }); // Store message and type (success/error)
    const [isApplying, setIsApplying] = useState(false); // Track application submission state
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [application, setApplication] = useState({
        coverLetter: "",
        resumeUrl: "",
        experience: "",
        startDate: "", // Added start date
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error on new fetch
                setApplyStatus({ message: null, type: null }); // Reset status
                const data = await getJobById(id);
                setJob(data);
            } catch (err) {
                setError("Failed to load farm job details. The job may not exist or there was a network issue.");
                console.error("Fetch Job Error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        } else {
            setError("Invalid farm job ID provided.");
            setLoading(false);
        }
    }, [id]); // Re-fetch if ID changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplication((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleApply = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!user) {
            setApplyStatus({ message: "You must be logged in to apply.", type: "error" });
            // Consider redirecting or showing a login prompt modal
            navigate("/login");
            return;
        }

        if (isApplying) return; // Prevent double submission

        setIsApplying(true);
        setApplyStatus({ message: null, type: null }); // Clear previous status

        try {
            // Construct payload - adjust according to your backend expectations
            const applicationData = {
                jobId: id,
                userId: user.id, // Assuming user object has id
                coverLetter: application.coverLetter,
                experience: application.experience,
                resumeUrl: application.resumeUrl,
                availableStartDate: application.startDate,
                // Add any other relevant fields
            };

            // Call the service function (ensure it matches your backend requirements)
            // The example `applyForJob` function signature might need adjustment
            await applyForJob(applicationData); // Pass the constructed data object

            console.log("Application submitted successfully");
            setApplyStatus({ message: "Your farm job application was submitted successfully!", type: "success" });
            setShowApplyForm(false); // Hide form on success
            // Optionally reset form fields
            setApplication({ coverLetter: "", resumeUrl: "", experience: "", startDate: "" });

        } catch (err) {
            console.error("Error applying for the farm job:", err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to submit application. Please check your details and try again.";
            setApplyStatus({ message: errorMessage, type: "error" });
        } finally {
            setIsApplying(false); // Re-enable button
        }
    };

    // --- Render Loading State ---
    if (loading) {
        return (
            <div className="farm-loading">
                <div className="tractor-loader"></div>
                <p>Harvesting job details...</p>
            </div>
        );
    }

    // --- Render Error State ---
    if (error) {
        return (
            <div className="farm-error">
                <div className="error-icon"></div>
                <p>{error}</p>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Back to Farm Jobs
                </button>
            </div>
        );
    }

    // --- Render Job Not Found (handled within error or if job is null after load) ---
    if (!job) {
        return (
            <div className="farm-error">
                <div className="error-icon"></div>
                <p>Farm job not found.</p>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Back to Farm Jobs
                </button>
            </div>
        );
    }

    // --- Render Job Details ---
    const { title, company, location, minSalary, maxSalary, jobType, postedDate, description, requirements, benefits, deadline } = job;
    const companyName = company?.name || "Farm name not available";
    const companyLogo = company?.logo || 'https://via.placeholder.com/60/a5ce81/ffffff?text=Farm'; // Placeholder logo
    const companyDesc = company?.description || "This farm is committed to sustainable agricultural practices, producing quality crops while respecting the environment and supporting the local community.";
    const established = company?.established || "N/A";
    const farmSize = company?.size || "N/A";
    const organic = company?.organic ? "Yes" : "No";
    const employees = company?.employees || "N/A";

    return (
        <div className="farm-job-details">
            <div className="farm-job-container">

                {/* ======== Main Content Column ======== */}
                <div className="farm-job-main">
                    {/* --- Application Status Message --- */}
                    {applyStatus.message && (
                        <div className={`farm-status-message ${applyStatus.type === 'error' ? 'error-message' : ''}`}>
                            {applyStatus.type === 'error' && '⚠️ '}
                            {applyStatus.type === 'success' && '✅ '}
                            {applyStatus.message}
                        </div>
                    )}

                    <div className="card farm-job-card">
                        {/* --- Job Header --- */}
                        <div className="card-header farm-job-header">
                            <div className="farm-job-badges">
                                <span className="farm-badge job-type">{jobType || "Full-time"}</span>
                                <span className="farm-badge job-date">
                                    Posted {postedDate ? new Date(postedDate).toLocaleDateString() : "Recently"}
                                </span>
                            </div>
                            <h1 className="farm-job-title">{title}</h1>
                            <div className="farm-job-meta">
                                <div className="farm-job-company">
                                    <span className="meta-icon icon-company"></span>
                                    <span>{companyName}</span>
                                </div>
                                <div className="farm-job-location">
                                    <span className="meta-icon icon-location"></span>
                                    <span>{location || "Location not specified"}</span>
                                </div>
                                {(minSalary || maxSalary) && ( // Only show if salary exists
                                    <div className="farm-job-salary">
                                        <span className="meta-icon icon-salary"></span>
                                        <span>
                                            {minSalary && maxSalary ? `$${minSalary} - $${maxSalary}` : (minSalary ? `From $${minSalary}` : `Up to $${maxSalary}`)}
                                            {minSalary || maxSalary ? ' per hour' : 'Salary not specified'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* --- Job Description --- */}
                        {description && (
                            <>
                                <div className="farm-job-section">
                                    <h3 className="section-title">
                                        <span className="section-icon icon-sun"></span>
                                        Job Description
                                    </h3>
                                    {/* Assuming description might be HTML or plain text */}
                                    <div className="farm-job-description" dangerouslySetInnerHTML={{ __html: description }}></div>
                                </div>
                                <hr className="farm-divider" />
                            </>
                        )}

                        {/* --- Job Requirements --- */}
                        {(requirements || []).length > 0 && ( // Check if requirements exist and is an array/string
                            <>
                                <div className="farm-job-section">
                                    <h3 className="section-title">
                                        <span className="section-icon icon-leaf"></span>
                                        Requirements
                                    </h3>
                                    <ul className="styled-list farm-requirements-list">
                                        {typeof requirements === 'string' ? (
                                            requirements.split('\n').map((req, index) => req.trim() && <li key={index}>{req.trim()}</li>)
                                        ) : Array.isArray(requirements) ? (
                                            requirements.map((req, index) => req && <li key={index}>{req}</li>)
                                        ) : (
                                            <li>No specific requirements listed.</li>
                                        )}
                                    </ul>
                                </div>
                                <hr className="farm-divider" />
                            </>
                        )}

                        {/* --- Job Benefits --- */}
                        {(benefits || []).length > 0 && ( // Check if benefits exist
                            <>
                                <div className="farm-job-section">
                                    <h3 className="section-title">
                                        <span className="section-icon icon-rain"></span> {/* Changed to a generic benefit icon maybe? */}
                                        Benefits
                                    </h3>
                                    <ul className="styled-list farm-benefits-list">
                                        {typeof benefits === 'string' ? (
                                            benefits.split('\n').map((ben, index) => ben.trim() && <li key={index}>{ben.trim()}</li>)
                                        ) : Array.isArray(benefits) ? (
                                            benefits.map((ben, index) => ben && <li key={index}>{ben}</li>)
                                        ) : (
                                            <li>No specific benefits listed.</li>
                                        )}
                                        {/* Example default benefits if none provided */}
                                        {!(benefits && benefits.length > 0) && (
                                            <>
                                                <li>Competitive pay based on experience</li>
                                                <li>Opportunities for growth and training</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}

                        {/* --- Job Footer --- */}
                        <div className="farm-job-footer">
                            <div className="farm-job-deadline">
                                <span className="meta-icon icon-calendar"></span>
                                <span>
                                    Apply by: {deadline ? new Date(deadline).toLocaleDateString() : "Open until filled"}
                                </span>
                            </div>
                            <div className="farm-job-actions">
                                <button className="btn btn-secondary" onClick={() => navigate(-1)}> {/* Go back */}
                                    Back
                                </button>
                                {!showApplyForm && (
                                    <button className="btn btn-primary" onClick={() => setShowApplyForm(true)}>
                                        Apply Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div> {/* End farm-job-card */}

                </div> {/* End farm-job-main */}

                {/* ======== Sidebar Column ======== */}
                <div className="farm-job-sidebar">

                    {/* --- Apply Form Card (Conditional) --- */}
                    {showApplyForm ? (
                        <div className="card farm-application-card">
                            <div className="card-header farm-application-header">
                                <h3>Apply for this Farm Position</h3>
                                <p>Fill out the form below</p>
                            </div>
                            {/* --- Application Status within Form Card --- */}
                            {applyStatus.message && applyStatus.type === 'error' && (
                                <div className="error-message" style={{ margin: 'var(--spacing-lg) var(--spacing-lg) 0' }}>
                                    {applyStatus.message}
                                </div>
                            )}
                            <form onSubmit={handleApply} className="farm-application-form">
                                <div className="form-group">
                                    <label htmlFor="coverLetter">Why are you interested?</label>
                                    <textarea
                                        id="coverLetter"
                                        name="coverLetter"
                                        className="form-control" // Add class
                                        rows="5"
                                        value={application.coverLetter}
                                        onChange={handleInputChange}
                                        placeholder="Tell us briefly about your relevant skills or interest..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="experience">Relevant Experience</label>
                                    <select
                                        id="experience"
                                        name="experience"
                                        className="form-control" // Add class
                                        value={application.experience}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select experience level</option>
                                        <option value="none">No prior relevant experience</option>
                                        <option value="beginner">Beginner (0-1 years)</option>
                                        <option value="intermediate">Intermediate (1-3 years)</option>
                                        <option value="experienced">Experienced (3+ years)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="startDate">Available Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        className="form-control" // Add class
                                        value={application.startDate}
                                        onChange={handleInputChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="resumeUrl">Resume/Portfolio URL (optional)</label>
                                    <input
                                        type="url"
                                        id="resumeUrl"
                                        name="resumeUrl"
                                        className="form-control" // Add class
                                        value={application.resumeUrl}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/yourprofile or similar"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => { setShowApplyForm(false); setApplyStatus({ message: null, type: null }); }} // Hide form and clear status
                                        disabled={isApplying}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isApplying}
                                    >
                                        {isApplying ? "Submitting..." : "Submit Application"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* --- Company Info Card (Conditional) --- */
                        <div className="card farm-company-card">
                            <div className="card-header farm-company-header">
                                <div className="farm-company-logo">
                                    <img src={companyLogo} alt={`${companyName} logo`} />
                                </div>
                                <div>
                                    <h3>{companyName}</h3>
                                    <p>About the Employer</p>
                                </div>
                            </div>
                            <div className="farm-company-content">
                                <div className="farm-company-about">
                                    <h4>About Us</h4>
                                    <p>{companyDesc}</p>
                                </div>
                                <div className="farm-company-highlights">
                                    <h4>Highlights</h4>
                                    <div className="farm-highlights-grid">
                                        <div className="farm-highlight-item">
                                            <span className="highlight-label">Established</span>
                                            <span className="highlight-value">{established}</span>
                                        </div>
                                        <div className="farm-highlight-item">
                                            <span className="highlight-label">Size</span>
                                            <span className="highlight-value">{farmSize}</span>
                                        </div>
                                        <div className="farm-highlight-item">
                                            <span className="highlight-label">Organic</span>
                                            <span className="highlight-value">{organic}</span>
                                        </div>
                                        <div className="farm-highlight-item">
                                            <span className="highlight-label">Employees</span>
                                            <span className="highlight-value">{employees}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Button to show form if not already shown */}
                                {!showApplyForm && (
                                    <button className="btn btn-primary btn-full" onClick={() => setShowApplyForm(true)}>
                                        Apply for this Position
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- Farm Worker Resources Card --- */}
                    <div className="card farm-resources">
                        <h3>Worker Resources</h3>
                        <div className="farm-resources-content">
                            <ul className="farm-resources-list">
                                <li>
                                    <a href="#" className="farm-resource-link" target="_blank" rel="noopener noreferrer">
                                        <span className="meta-icon icon-calendar"></span>
                                        Seasonal Work Info
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="farm-resource-link" target="_blank" rel="noopener noreferrer">
                                        <span className="meta-icon icon-document"></span>
                                        Agricultural Skills Guide
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="farm-resource-link" target="_blank" rel="noopener noreferrer">
                                        <span className="meta-icon icon-leaf"></span>
                                        Farm Safety Tips
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="farm-resource-link" target="_blank" rel="noopener noreferrer">
                                        <span className="meta-icon icon-sun"></span> {/* Maybe change icon? */}
                                        Worker Rights Info
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> {/* End farm-resources card */}

                </div> {/* End farm-job-sidebar */}
            </div> {/* End farm-job-container */}
        </div> /* End farm-job-details */
    );
};

export default JobDetails;