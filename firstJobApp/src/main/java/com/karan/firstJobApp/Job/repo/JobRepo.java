package com.karan.firstJobApp.Job.repo;

import com.karan.firstJobApp.Job.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepo extends JpaRepository<Job,Long> {

}
