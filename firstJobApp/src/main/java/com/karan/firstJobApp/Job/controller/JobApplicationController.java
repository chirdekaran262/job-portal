package com.karan.firstJobApp.Job.controller;

import com.karan.firstJobApp.Job.model.Company;
import com.karan.firstJobApp.Job.model.JobApplication;
import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.UserRepository;
import com.karan.firstJobApp.Job.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:3000/*")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepo.findByUsername(userDetails.getUsername());
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        Company company = currentUser.getCompany();

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
            @RequestParam(required = false) String experience,
            @RequestParam(required = false) String coverLetter,
            @RequestParam(required = false) String resumeUrl) {

        System.out.println(jobId);
        boolean applied = jobApplicationService.applyForJob(jobId, userId, experience,coverLetter, resumeUrl);
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

    @GetMapping("/company")
    public ResponseEntity<List<JobApplication>> getApplicationsByCompany(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepo.findByUsername(userDetails.getUsername());
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        Company company = currentUser.getCompany();

        List<JobApplication> applications = jobApplicationService.getApplicationsByCompanyId(company.getId());
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/company/pending")
    public ResponseEntity<List<JobApplication>> getPendingApplicationsByCompany(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepo.findByUsername(userDetails.getUsername());
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        Company company = currentUser.getCompany();

        List<JobApplication> applications = jobApplicationService.getApplicationsByCompanyId(company.getId())
                .stream()
                .filter(app -> "PENDING".equals(app.getStatus()))
                .toList();
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<String> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestBody Map<String, String> statusUpdate,
            Authentication authentication) {

        // Get the logged-in user
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepo.findByUsername(userDetails.getUsername());

        // Check if user is a company
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>("Only companies can update application status", HttpStatus.FORBIDDEN);
        }

        // Get the job application
        JobApplication application = jobApplicationService.getApplicationById(applicationId);
        if (application == null) {
            return new ResponseEntity<>("Application not found", HttpStatus.NOT_FOUND);
        }

        // Check if this application belongs to a job from this company
        if (!application.getJob().getCompany().getId().equals(currentUser.getCompany().getId())) {
            return new ResponseEntity<>("You can only update applications for your own company's jobs",
                    HttpStatus.FORBIDDEN);
        }

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