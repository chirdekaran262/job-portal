package com.karan.firstJobApp.Job.controller;

import com.karan.firstJobApp.Job.model.Company;
import com.karan.firstJobApp.Job.model.JobApplication;
import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.UserRepository;
import com.karan.firstJobApp.Job.service.CompanyService;
import com.karan.firstJobApp.Job.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "http://localhost:3000/*")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobApplicationService jobApplicationService;

    @GetMapping
    public ResponseEntity<List<Company>> getAllcompany(){
        List<Company> companyList = companyService.getAllCompany();
        if(companyList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return empty list with OK status
        }

        return new ResponseEntity<>(companyList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id){
        Company company = companyService.getCompanyById(id);
        if(company == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return NOT_FOUND when company doesn't exist
        }
        return new ResponseEntity<>(company, HttpStatus.OK); // Return OK with company when found
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getCompanyDashboard(Authentication authentication) {
        // Get the logged-in user
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepository.findByUsername(userDetails.getUsername());

        // Check if user is a company
        if (!currentUser.getRole().equals("ROLE_COMPANY")) {
            return new ResponseEntity<>("Only companies can access this dashboard", HttpStatus.FORBIDDEN);
        }

        Long companyId = currentUser.getCompany().getId();

        // Get applications for this company
        List<JobApplication> applications = jobApplicationService.getApplicationsByCompanyId(companyId);

        // Group by status for dashboard view
        Map<String, List<JobApplication>> groupedApplications = applications.stream()
                .collect(Collectors.groupingBy(JobApplication::getStatus));

        return new ResponseEntity<>(groupedApplications, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody Company company){
        Company createdCompany = companyService.createCompany(company);
        return new ResponseEntity<>(createdCompany, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company company){
        boolean isUpdated = companyService.updateCompany(company, id);
        if(isUpdated){
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return NOT_FOUND instead of NO_CONTENT
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable Long id){
        boolean isDeleted = companyService.deleteCompany(id);
        if(isDeleted){
            return new ResponseEntity<>("Company deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return NOT_FOUND instead of NO_CONTENT
    }
}