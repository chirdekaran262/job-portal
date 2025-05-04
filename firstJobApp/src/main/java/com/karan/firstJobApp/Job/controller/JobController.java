package com.karan.firstJobApp.Job.controller;


import com.karan.firstJobApp.Job.model.Company;
import com.karan.firstJobApp.Job.model.Job;
import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.UserRepository;
import com.karan.firstJobApp.Job.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin("http://localhost:3000/*")
public class JobController {

    @Autowired
    private JobService jobService;
    @Autowired
    private UserRepository userRepo;
    @GetMapping
    public ResponseEntity<List<Job>> findAll(){
        List<Job> jobs = jobService.findAll();
        System.out.println(jobs.get(2).getCompany().getName());
        return  new ResponseEntity<>(jobService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> AddJob(@RequestBody Job job, Authentication authentication) {
        try {
            // Get the currently authenticated user
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userRepo.findByUsername(userDetails.getUsername());

            // Check if user exists
            if (currentUser == null) {
                return new ResponseEntity<>("User not found", HttpStatus.FORBIDDEN);
            }

            // Check if user has ROLE_COMPANY
            if (!currentUser.getRole().equals("ROLE_COMPANY")) {
                return new ResponseEntity<>("Only companies can post jobs. Current role: " + currentUser.getRole(), HttpStatus.FORBIDDEN);
            }

            // Get the company associated with this user
            Company company = currentUser.getCompany();

            if (company == null) {
                return new ResponseEntity<>("User doesn't have an associated company", HttpStatus.BAD_REQUEST);
            }

            // Set the company for this job
            job.setCompany(company);

            // Add the job
            jobService.addJob(job);
            return new ResponseEntity<>("Job added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Find job By the company
    @GetMapping("/company")
    public ResponseEntity<List<Job>> findAllJobByCompany(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepo.findByUsername(userDetails.getUsername());
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }
        Company company = currentUser.getCompany();
        if (company == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        List<Job> job=jobService.findbyCompanyId(company.getId());
        if (job == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(job,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> findById(@PathVariable Long id){
        Job job= jobService.findbyId(id);
        if(job!=null){
            return new ResponseEntity<>(job,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/location")
    public ResponseEntity<List<Job>> findAllByLocation(@RequestParam(required = false) String location) {
        if (location == null || location.trim().isEmpty()) {
            System.out.println("location is null");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Return 400 if location is null or empty
        }

        List<Job> jobs = jobService.findByLocation(location.trim());


        return new ResponseEntity<>(jobs, HttpStatus.OK); // Return 200 with the list of jobs
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id,Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepo.findByUsername(userDetails.getUsername());
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>("Only companies can delete jobs", HttpStatus.FORBIDDEN);
        }
        Company company = currentUser.getCompany();
        if (company == null) {
            return new ResponseEntity<>("User doesn't have an associated company", HttpStatus.BAD_REQUEST);
        }
        if(!jobService.findbyId(id).getCompany().getId().equals(company.getId())){
            return new ResponseEntity<>("Only companies can delete jobs", HttpStatus.FORBIDDEN);
        }
        boolean job=jobService.deleteJob(id);
        if(job){
            return new ResponseEntity<>("Job deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Job does not exist", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateJob(@PathVariable Long id,@RequestBody Job job,Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepo.findByUsername(userDetails.getUsername());
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>("Only companies can update jobs", HttpStatus.FORBIDDEN);
        }
        Company company = currentUser.getCompany();
        if (company == null) {
            return new ResponseEntity<>("User doesn't have an associated company", HttpStatus.BAD_REQUEST);
        }
        if(!jobService.findbyId(id).getCompany().getId().equals(company.getId())){
            return new ResponseEntity<>("Only companies can update jobs", HttpStatus.FORBIDDEN);
        }
        boolean job1=jobService.updateJob(id,job,company);
        if(job1){
            return new ResponseEntity<>("Job updated", HttpStatus.OK);
        }
        return new ResponseEntity<>("Job does not exist", HttpStatus.NOT_FOUND);
    }
}
