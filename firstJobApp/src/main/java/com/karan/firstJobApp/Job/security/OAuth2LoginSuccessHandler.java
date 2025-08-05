package com.karan.firstJobApp.Job.security;

import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauth2User = oauthToken.getPrincipal();

        // Extract user information from Google account
        Map<String, Object> attributes = oauth2User.getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        // Check if user already exists in our system
        Users user = userRepository.findByEmail(email);

        if (user == null) {
            // Create new user
            user = new Users();
            user.setEmail(email);
            user.setFullName(name);
            // Generate a random username if not present
            user.setUsername(email.substring(0, email.indexOf('@')) + UUID.randomUUID().toString().substring(0, 5));
            // Set a random password (user won't need it for OAuth login)
            user.setPassword(UUID.randomUUID().toString());
            user.setRole("ROLE_USER");
            userRepository.save(user);
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user);

        // Redirect to frontend with token
        getRedirectStrategy().sendRedirect(request, response,
                "http://localhost:3000/oauth2/redirect?token=" + token);
    }
}
