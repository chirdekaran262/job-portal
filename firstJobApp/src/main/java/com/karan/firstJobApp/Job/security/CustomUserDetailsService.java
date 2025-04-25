package com.karan.firstJobApp.Job.security;

import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = userRepo.findByUsername(username);
        if (users == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return users;
    }
}