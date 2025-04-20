package com.karan.firstJobApp.Job.service;

import com.karan.firstJobApp.Job.model.Company;

import java.util.List;

public interface CompanyService {
    List<Company> getAllCompany();
    Company getCompanyById(Long id);
    Company createCompany(Company company);
    boolean updateCompany(Company company,Long id);
    boolean deleteCompany(Long id);
}
