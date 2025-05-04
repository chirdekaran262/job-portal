package com.karan.firstJobApp.Job.service;

import com.karan.firstJobApp.Job.model.JobApplication;
import java.util.List;

public interface JobApplicationService {
    // Apply for a job
    boolean applyForJob(Long jobId, Long userId,String experience, String coverLetter, String resumeUrl);

    // Get all applications
    List<JobApplication> getAllApplications();

    // Get applications by job ID
    List<JobApplication> getApplicationsByJobId(Long jobId);

    // Get applications by user ID
    List<JobApplication> getApplicationsByUserId(Long userId);

    // Get applications by company ID
    List<JobApplication> getApplicationsByCompanyId(Long companyId);

    // Get application by ID
    JobApplication getApplicationById(Long id);

    // Update application status (confirm or reject)
    boolean updateApplicationStatus(Long applicationId, String status);

    // Delete application
    boolean deleteApplication(Long id);
}