package com.karan.firstJobApp.Job.service;

import com.karan.firstJobApp.Job.model.Company;
import com.karan.firstJobApp.Job.model.Job;

import java.util.List;

public interface JobService {
    List<Job> findAll();
    String addJob(Job job);

    Job findbyId(Long id);

    boolean deleteJob(Long id);

    List<Job> findByLocation(String location);

    boolean updateJob(Long id, Job job, Company company);

    List<Job> findbyCompanyId(Long id);
}
