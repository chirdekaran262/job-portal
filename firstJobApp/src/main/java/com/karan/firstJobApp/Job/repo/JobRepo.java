package com.karan.firstJobApp.Job.repo;

import com.karan.firstJobApp.Job.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Job,Long> {

    List<Job> findByCompanyId(Long id);


    List<Job> findByLocationContainingIgnoreCase(String location);
}
