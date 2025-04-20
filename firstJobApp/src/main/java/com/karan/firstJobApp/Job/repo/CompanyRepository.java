package com.karan.firstJobApp.Job.repo;

import com.karan.firstJobApp.Job.model.Company;
import com.karan.firstJobApp.Job.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CompanyRepository extends JpaRepository<Company,Long> {
    Company getCompanyById(Long companyId);

}
