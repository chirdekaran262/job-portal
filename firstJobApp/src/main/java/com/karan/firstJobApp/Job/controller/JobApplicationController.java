package com.karan.firstJobApp.Job.controller;

import com.karan.firstJobApp.Job.model.JobApplication;
import com.karan.firstJobApp.Job.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        List<JobApplication> applications = jobApplicationService.getAllApplications();
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getApplicationById(@PathVariable Long id) {
        JobApplication application = jobApplicationService.getApplicationById(id);
        if (application != null) {
            return new ResponseEntity<>(application, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/apply")
    public ResponseEntity<String> applyForJob(
            @RequestParam Long jobId,
            @RequestParam Long userId,
            @RequestParam(required = false) String coverLetter,
            @RequestParam(required = false) String resumeUrl) {

        boolean applied = jobApplicationService.applyForJob(jobId, userId, coverLetter, resumeUrl);
        if (applied) {
            return new ResponseEntity<>("Application submitted successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Failed to submit application", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByJob(@PathVariable Long jobId) {
        List<JobApplication> applications = jobApplicationService.getApplicationsByJobId(jobId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByUser(@PathVariable Long userId) {
        List<JobApplication> applications = jobApplicationService.getApplicationsByUserId(userId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByCompany(@PathVariable Long companyId) {
        List<JobApplication> applications = jobApplicationService.getApplicationsByCompanyId(companyId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/company/{companyId}/pending")
    public ResponseEntity<List<JobApplication>> getPendingApplicationsByCompany(@PathVariable Long companyId) {
        List<JobApplication> applications = jobApplicationService.getApplicationsByCompanyId(companyId)
                .stream()
                .filter(app -> "PENDING".equals(app.getStatus()))
                .toList();
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<String> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestBody Map<String, String> statusUpdate) {

        String status = statusUpdate.get("status");
        if (status == null || (!status.equals("CONFIRMED") && !status.equals("REJECTED"))) {
            return new ResponseEntity<>("Invalid status. Must be 'CONFIRMED' or 'REJECTED'", HttpStatus.BAD_REQUEST);
        }

        boolean updated = jobApplicationService.updateApplicationStatus(applicationId, status);
        if (updated) {
            return new ResponseEntity<>("Application status updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Application not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {
        boolean deleted = jobApplicationService.deleteApplication(id);
        if (deleted) {
            return new ResponseEntity<>("Application deleted successfully", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>("Application not found", HttpStatus.NOT_FOUND);
    }
}