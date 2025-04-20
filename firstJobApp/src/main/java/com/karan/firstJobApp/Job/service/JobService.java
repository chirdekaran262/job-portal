package com.karan.firstJobApp.Job.service;

import com.karan.firstJobApp.Job.model.Job;

import java.util.List;

public interface JobService {
    List<Job> findAll();
    String addJob(Job job);

    Job findbyId(Long id);

    boolean deleteJob(Long id);


    boolean updateJob(Long id,Job job);
}
