package com.karan.firstJobApp.Job.controller;

import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.UserRepository;
import com.karan.firstJobApp.Job.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class GoogleAuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/google")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody Map<String, String> requestBody) {
        String googleToken = requestBody.get("token");

        if (googleToken == null || googleToken.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Google token is required"));
        }

        try {
            // Validate the Google token and get user info
            GoogleUserInfo googleUserInfo = validateGoogleToken(googleToken);

            if (googleUserInfo == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid Google token"));
            }

            // Check if user exists
            Users user = userRepository.findByEmail(googleUserInfo.getEmail());

            if (user == null) {
                // Create new user
                user = new Users();
                user.setEmail(googleUserInfo.getEmail());
                user.setFullName(googleUserInfo.getName());

                // Create username from email (part before @)
                String emailUsername = googleUserInfo.getEmail().split("@")[0];
                // Add random suffix to ensure uniqueness
                String uniqueUsername = emailUsername + UUID.randomUUID().toString().substring(0, 5);
                user.setUsername(uniqueUsername);

                // Set random password (user won't need it for OAuth login)
                user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));

                // Set default role
                user.setRole("ROLE_USER");

                // Save user
                userRepository.save(user);
            }

            // Generate JWT token
            String jwt = jwtUtil.generateToken(user);

            // Return user info and token
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Authentication failed: " + e.getMessage()));
        }
    }

    private GoogleUserInfo validateGoogleToken(String token) {
        try {
            // Use Google's tokeninfo endpoint to validate the token
            RestTemplate restTemplate = new RestTemplate();
            String googleTokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;

            return restTemplate.getForObject(googleTokenInfoUrl, GoogleUserInfo.class);
        } catch (Exception e) {
            return null;
        }
    }

    // Inner class to represent Google user info
    private static class GoogleUserInfo {
        private String email;
        private String name;
        private String picture;
        private boolean email_verified;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPicture() {
            return picture;
        }

        public void setPicture(String picture) {
            this.picture = picture;
        }

        public boolean isEmail_verified() {
            return email_verified;
        }

        public void setEmail_verified(boolean email_verified) {
            this.email_verified = email_verified;
        }
    }
}