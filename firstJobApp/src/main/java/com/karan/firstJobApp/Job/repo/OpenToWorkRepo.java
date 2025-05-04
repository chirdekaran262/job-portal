package com.karan.firstJobApp.Job.repo;

import com.karan.firstJobApp.Job.model.OpenToWork;
import com.karan.firstJobApp.Job.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenToWorkRepo extends JpaRepository<OpenToWork, Integer> {

    OpenToWork findByUserId(Long userId);

}
