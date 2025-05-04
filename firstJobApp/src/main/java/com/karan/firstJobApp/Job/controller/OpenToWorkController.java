package com.karan.firstJobApp.Job.controller;


import com.karan.firstJobApp.Job.model.OpenToWork;
import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.repo.OpenToWorkRepo;
import com.karan.firstJobApp.Job.repo.UserRepository;
import com.karan.firstJobApp.Job.service.OpenToWorkService;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/opentowork")
@CrossOrigin(origins = "http://localhost:3000/*")
public class OpenToWorkController {

    OpenToWorkService openToWorkService;
    UserRepository userRepository;
    OpenToWorkRepo openToWorkRepo;
    public OpenToWorkController(OpenToWorkService openToWorkService, UserRepository userRepository, OpenToWorkRepo openToWorkRepo) {
        this.openToWorkService=openToWorkService;
        this.userRepository=userRepository;
        this.openToWorkRepo=openToWorkRepo;
    }


    @GetMapping("/")
    public ResponseEntity<List<OpenToWork>> getOpenToWork() {
        List<OpenToWork> openToWorkList = openToWorkService.getOpenToWork();
        if(openToWorkList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(openToWorkList, HttpStatus.OK);
    }

    @GetMapping("/status")
    public ResponseEntity<OpenToWork> getStatus(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users users = userRepository.findByUsername(userDetails.getUsername());
        if (users == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        OpenToWork openToWork = openToWorkRepo.findByUserId(users.getId());
        System.out.println(openToWork.getName());
        return new ResponseEntity<>(openToWork, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<String> createOpenToWork(Authentication authentication, @RequestBody OpenToWork openToWork) {
        try {
            System.out.println(openToWork.getDescription()+openToWork.getName());
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userRepository.findByUsername(userDetails.getUsername());
            if (currentUser == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            if (!currentUser.getRole().equals("ROLE_USER")) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            OpenToWork openToWork1=openToWorkRepo.findByUserId(currentUser.getId());
            if(openToWork1!=null) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            openToWork.setUser(currentUser);
            openToWorkService.addOpenToWork(openToWork);
            return new ResponseEntity<>("OpenToWork Updated", HttpStatus.CREATED);
        }
        catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateOpenToWork(@RequestBody OpenToWork openToWork, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepository.findByUsername(userDetails.getUsername());
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if(!currentUser.getRole().equals("ROLE_USER")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        openToWorkService.updateOpenToWork(openToWork);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deleteOpenToWork(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users currentUser = userRepository.findByUsername(userDetails.getUsername());
        if (currentUser == null) {
            return new ResponseEntity<>("User not Found",HttpStatus.NOT_FOUND);
        }
        if (!currentUser.getRole().equals("ROLE_USER")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        OpenToWork openToWork = openToWorkRepo.findByUserId(currentUser.getId());
        openToWorkService.deleteOpenToWork(openToWork.getId());
        return new ResponseEntity<>("OpenToWork Deleted", HttpStatus.NO_CONTENT);
    }

}
