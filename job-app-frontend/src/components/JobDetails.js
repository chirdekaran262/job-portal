"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getJobById } from "../services/jobService"
import { applyForJob } from "../services/applicationService"
import { useAuth } from "../context/AuthContext"
import "../styles/farm-theme.css"

const JobDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [applyStatus, setApplyStatus] = useState(null)
    const [showApplyForm, setShowApplyForm] = useState(false)
    const [application, setApplication] = useState({
        coverLetter: "",
        resumeUrl: "",
        experience: "",
    })

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true)
                const data = await getJobById(id)
                setJob(data)
            } catch (err) {
                setError("Failed to load farm job details")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchJob()
        } else {
            setError("Invalid farm job ID")
            setLoading(false)
        }
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setApplication((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleApply = async (e) => {
        if (e) e.preventDefault()

        if (!user) {
            alert("You must be logged in to apply for a farm job.")
            navigate("/login")
            return
        }

        try {
            await applyForJob(id, user.id, application.experience, application.coverLetter, application.resumeUrl)
            console.log("Application submitted successfully")
            setApplyStatus("Your farm job application was submitted successfully!")
            setShowApplyForm(false)
        } catch (err) {
            console.error("Error applying for the farm job:", err)
            setApplyStatus(err.message || "Failed to submit application. Please try again.")
        }
    }

    if (loading) {
        return (
            <div className="farm-loading">
                <div className="tractor-loader"></div>
                <p>Harvesting job details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="farm-error">
                <div className="error-icon"></div>
                <p>{error}</p>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Back to Farm Jobs
                </button>
            </div>
        )
    }

    if (!job) {
        return (
            <div className="farm-error">
                <div className="error-icon"></div>
                <p>Farm job not found</p>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Back to Farm Jobs
                </button>
            </div>
        )
    }

    return (
        <div className="farm-job-details">
            <div className="farm-job-container">
                {/* Main Content */}
                <div className="farm-job-main">
                    <div className="farm-job-card">
                        <div className="farm-job-header">
                            <div className="farm-job-badges">
                                <span className="farm-badge job-type">{job.jobType || "Full-time"}</span>
                                <span className="farm-badge job-date">
                                    Posted {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "Recently"}
                                </span>
                            </div>
                            <h1 className="farm-job-title">{job.title}</h1>
                            <div className="farm-job-meta">
                                <div className="farm-job-company">
                                    <span className="icon-company"></span>
                                    <span>{job.company?.name || "Farm name not available"}</span>
                                </div>
                                <div className="farm-job-location">
                                    <span className="icon-location"></span>
                                    <span>{job.location}</span>
                                </div>
                                <div className="farm-job-salary">
                                    <span className="icon-salary"></span>
                                    <span>
                                        ${job.minSalary} - ${job.maxSalary} per hour
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="farm-job-section">
                            <h3 className="section-title">
                                <span className="icon-sun"></span>
                                Job Description
                            </h3>
                            <p className="farm-job-description">{job.description}</p>
                        </div>

                        <div className="farm-divider"></div>

                        <div className="farm-job-section">
                            <h3 className="section-title">
                                <span className="icon-leaf"></span>
                                Requirements
                            </h3>
                            <ul className="farm-requirements-list">
                                {job.requirements ? (
                                    job.requirements.split("\n").map((req, index) => <li key={index}>{req}</li>)
                                ) : (
                                    <>
                                        <li>Experience with agricultural work</li>
                                        <li>Knowledge of farm safety procedures</li>
                                        <li>Ability to work in various weather conditions</li>
                                        <li>Physical stamina and strength</li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="farm-divider"></div>

                        <div className="farm-job-section">
                            <h3 className="section-title">
                                <span className="icon-rain"></span>
                                Benefits
                            </h3>
                            <ul className="farm-benefits-list">
                                <li>Competitive pay based on experience</li>
                                <li>Opportunities for growth and training</li>
                                <li>Fresh farm produce allowance</li>
                                <li>Rural living experience</li>
                            </ul>
                        </div>

                        <div className="farm-job-footer">
                            <div className="farm-job-deadline">
                                <span className="icon-calendar"></span>
                                <span>
                                    Apply by: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "Open until filled"}
                                </span>
                            </div>

                            <div className="farm-job-actions">
                                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                                    Back to Farm Jobs
                                </button>
                                {!showApplyForm && (
                                    <button className="btn btn-primary" onClick={() => setShowApplyForm(true)}>
                                        Apply Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {applyStatus && <div className="farm-status-message">{applyStatus}</div>}
                </div>

                {/* Sidebar */}
                <div className="farm-job-sidebar">
                    {showApplyForm ? (
                        <div className="farm-application-card">
                            <div className="farm-application-header">
                                <h3>Apply for this Farm Position</h3>
                                <p>Fill out the form below to apply</p>
                            </div>

                            <form onSubmit={handleApply} className="farm-application-form">
                                <div className="form-group">
                                    <label htmlFor="coverLetter">Why are you interested in this farm job?</label>
                                    <textarea
                                        id="coverLetter"
                                        name="coverLetter"
                                        rows="5"
                                        value={application.coverLetter}
                                        onChange={handleInputChange}
                                        placeholder="Tell us about your interest in this position..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="experience">Farm Experience</label>
                                    <select
                                        id="experience"
                                        name="experience"
                                        value={application.experience}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select your level of experience</option>
                                        <option value="none">No prior farm experience</option>
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
                                        value={application.startDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="resumeUrl">Resume URL (optional)</label>
                                    <input
                                        type="url"
                                        id="resumeUrl"
                                        name="resumeUrl"
                                        value={application.resumeUrl}
                                        onChange={handleInputChange}
                                        placeholder="Link to your online resume"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowApplyForm(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="farm-company-card">
                            <div className="farm-company-header">
                                <div className="farm-company-logo">
                                    <img src={job.company?.logo} alt={job.company?.name || "Farm logo"} />
                                </div>
                                <div>
                                    <h3>{job.company?.name || "Farm Information"}</h3>
                                    <p>Farm Information</p>
                                </div>
                            </div>

                            <div className="farm-company-content">
                                <div className="farm-company-about">
                                    <h4>About the Farm</h4>
                                    <p>
                                        {job.company?.description ||
                                            "This farm is committed to sustainable agricultural practices, producing quality crops while respecting the environment and supporting the local community."}
                                    </p>
                                </div>

                                <div className="farm-company-highlights">
                                    <h4>Farm Highlights</h4>
                                    <div className="farm-highlights-grid">
                                        <div className="farm-highlight-item">
                                            <span className="highlight-label">Established</span>
                                            <span className="highlight-value">{job.company?.established || "1985"}</span>
                                        </div>
                                        <div className="farm-highlight-item">
                                            <span className="highlight-label">Farm Size</span>
                                            <span className="highlight-value">{job.company?.size || "200 acres"}</span>
                                        </div>
                                        <div className="farm-highlight-item">
                                            <span className="highlight-label">Organic</span>
                                            <span className="highlight-value">{job.company?.organic ? "Yes" : "No"}</span>
                                        </div>
                                        <div className="farm-highlight-item">
                                            <span className="highlight-label">Employees</span>
                                            <span className="highlight-value">{job.company?.employees || "15-30"}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-primary btn-full" onClick={() => setShowApplyForm(true)}>
                                    Apply for this Position
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Farm Worker Resources */}
                    <div className="farm-resources">
                        <h3>Farm Worker Resources</h3>
                        <ul className="farm-resources-list">
                            <li>
                                <a href="#" className="farm-resource-link">
                                    <span className="icon-calendar"></span>
                                    Seasonal Work Calendar
                                </a>
                            </li>
                            <li>
                                <a href="#" className="farm-resource-link">
                                    <span className="icon-document"></span>
                                    Agricultural Skills Guide
                                </a>
                            </li>
                            <li>
                                <a href="#" className="farm-resource-link">
                                    <span className="icon-leaf"></span>
                                    Farm Safety Tips
                                </a>
                            </li>
                            <li>
                                <a href="#" className="farm-resource-link">
                                    <span className="icon-sun"></span>
                                    Worker Rights
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
