package com.karan.firstJobApp.Job.service.Impl;

import com.karan.firstJobApp.Job.model.Company;
import com.karan.firstJobApp.Job.model.Job;
import com.karan.firstJobApp.Job.repo.JobRepo;
import com.karan.firstJobApp.Job.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepo jobRepo;
    private List<Job> jobs=new ArrayList<>();
    private Long nextJobId=1L;
    @Override
    public List<Job> findAll() {
        return jobRepo.findAll();
    }

    @Override
    public String addJob(Job job) {
        if(job!=null){
            jobRepo.save(job);
            return "Job added successfully";
        }
        return "id is null";
    }

    @Override
    public Job findbyId(Long id) {
        return jobRepo.findById(id).get();
    }



    @Override
    public boolean deleteJob(Long id) {
        Job job=jobRepo.findById(id).get();
        if(job!=null){
            jobRepo.delete(job);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateJob(Long id, Job job, Company company) {
        Optional<Job> job1 =jobRepo.findById(id);
        if(job1.isPresent()){
            Job job2=job1.get();
            job2.setTitle(job.getTitle());
            job2.setDescription(job.getDescription());
            job2.setLocation(job.getLocation());
            job2.setMinSalary(job.getMinSalary());
            job2.setMaxSalary(job.getMaxSalary());
            job2.setCompany(company);
            jobRepo.save(job2);
            return true;
        }
        return false;
    }

    @Override
    public List<Job> findbyCompanyId(Long id) {
        return jobRepo.findByCompanyId(id);
    }
}
