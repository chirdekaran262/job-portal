package com.karan.firstJobApp.Job.repo;

import com.karan.firstJobApp.Job.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);

    void deleteByUsername(String username);


    Users findByEmail(String email);
}