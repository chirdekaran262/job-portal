package com.karan.firstJobApp.Job.controller;

import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.UserRepository;
import com.karan.firstJobApp.Job.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users users) {
        // Check if username already exists
        try{
            if (userRepo.findByUsername(users.getUsername()) != null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Username already exists");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Check if email already exists
            if (userRepo.findByEmail(users.getEmail())!=null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Email already exists");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Encode password
            users.setPassword(passwordEncoder.encode(users.getPassword()));

            // Set default role if not specified
            if (users.getRole() == null || users.getRole().isEmpty()) {
                users.setRole("ROLE_USER");
            }

            // Save user
            userRepo.save(users);

            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        catch(Exception e){
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.get("username"),
                            loginRequest.get("password")
                    )
            );

            // If authentication was successful
            final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            final String jwt = jwtUtil.generateToken(userDetails);

            Users users = userRepo.findByUsername(userDetails.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("id", users.getId());
            response.put("username", users.getUsername());
            response.put("email", users.getEmail());
            response.put("role", users.getRole());

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid username or password");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}