package com.karan.firstJobApp.Job.service.Impl;

import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.UserRepository;
import com.karan.firstJobApp.Job.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    public UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<Users> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Users findByUsername(String username) {
        return  userRepository.findByUsername(username);
    }

    @Override
    public void UserAdd(Users users) {
        userRepository.save(users);
    }

    @Override
    public void UserUpdate(Users users) {
//        userRepository.save(users);
    }

    @Override
    @Transactional
    public void UserDelete(String username) {
        userRepository.deleteByUsername(username);
    }
}
