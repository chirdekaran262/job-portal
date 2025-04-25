package com.karan.firstJobApp.Job.service.Impl;

import com.karan.firstJobApp.Job.model.Job;
import com.karan.firstJobApp.Job.model.JobApplication;
import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.JobApplicationRepository;
import com.karan.firstJobApp.Job.repo.JobRepo;
import com.karan.firstJobApp.Job.repo.UserRepository;
import com.karan.firstJobApp.Job.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean applyForJob(Long jobId, Long userId, String coverLetter, String resumeUrl) {
        Optional<Job> jobOptional = jobRepo.findById(jobId);
        Optional<Users> userOptional = userRepository.findById(userId);

        if (jobOptional.isPresent() && userOptional.isPresent()) {
            Job job = jobOptional.get();
            Users users = userOptional.get();

            JobApplication application = new JobApplication();
            application.setJob(job);
            application.setUser(users);
            application.setCoverLetter(coverLetter);
            application.setResumeUrl(resumeUrl);
            application.setAppliedDate(LocalDateTime.now());
            application.setStatus("PENDING");

            jobApplicationRepository.save(application);
            return true;
        }
        return false;
    }

    @Override
    public List<JobApplication> getAllApplications() {
        return jobApplicationRepository.findAll();
    }

    @Override
    public List<JobApplication> getApplicationsByJobId(Long jobId) {
        return jobApplicationRepository.findByJobId(jobId);
    }

    @Override
    public List<JobApplication> getApplicationsByUserId(Long userId) {
        return jobApplicationRepository.findByUsersId(userId);
    }

    @Override
    public List<JobApplication> getApplicationsByCompanyId(Long companyId) {
        return jobApplicationRepository.findByJobCompanyId(companyId);
    }

    @Override
    public JobApplication getApplicationById(Long id) {
        return jobApplicationRepository.findById(id).orElse(null);
    }

    @Override
    public boolean updateApplicationStatus(Long applicationId, String status) {
        Optional<JobApplication> applicationOptional = jobApplicationRepository.findById(applicationId);
        if (applicationOptional.isPresent()) {
            JobApplication application = applicationOptional.get();
            application.setStatus(status);
            jobApplicationRepository.save(application);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteApplication(Long id) {
        if (jobApplicationRepository.existsById(id)) {
            jobApplicationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}