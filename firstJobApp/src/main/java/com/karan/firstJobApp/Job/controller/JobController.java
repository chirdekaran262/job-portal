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
public class JobController {

    @Autowired
    private JobService jobService;
    @Autowired
    private UserRepository userRepo;
    @GetMapping
    public ResponseEntity<List<Job>> findAll(){
        return  new ResponseEntity<>(jobService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> AddJob(@RequestBody Job job, Authentication authentication) {
        // Get the currently authenticated user
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepo.findByUsername(userDetails.getUsername());

        // Check if user has ROLE_COMPANY
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>("Only companies can post jobs", HttpStatus.FORBIDDEN);
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
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> findById(@PathVariable Long id){
        Job job= jobService.findbyId(id);
        if(job!=null){
            return new ResponseEntity<>(job,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id){
        boolean job=jobService.deleteJob(id);
        if(job){
            return new ResponseEntity<>("Job deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Job does not exist", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateJob(@PathVariable Long id,@RequestBody Job job){
        boolean job1=jobService.updateJob(id,job);
        if(job1){
            return new ResponseEntity<>("Job updated", HttpStatus.OK);
        }
        return new ResponseEntity<>("Job does not exist", HttpStatus.NOT_FOUND);
    }
}
