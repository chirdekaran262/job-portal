package com.karan.firstJobApp.Job.repo;

import com.karan.firstJobApp.Job.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByJobId(Long jobId);
    List<JobApplication> findByUsersId(Long userId);
    List<JobApplication> findByJobCompanyId(Long companyId);
    List<JobApplication> findByJobCompanyIdAndStatus(Long companyId, String status);
}