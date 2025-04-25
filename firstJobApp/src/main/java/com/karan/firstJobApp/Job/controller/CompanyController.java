package com.karan.firstJobApp.Job.controller;

import com.karan.firstJobApp.Job.model.Company;
import com.karan.firstJobApp.Job.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "http://localhost:3000/*")
public class CompanyController {

    @Autowired
    CompanyService companyService;

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