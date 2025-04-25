package com.karan.firstJobApp.Job.service;

import com.karan.firstJobApp.Job.model.Users;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<Users> findAll();
    Users findByUsername(String username);
    void UserAdd(Users users);
    void UserUpdate(Users users);
    void UserDelete(String username);

}
