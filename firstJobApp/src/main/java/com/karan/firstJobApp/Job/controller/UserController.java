package com.karan.firstJobApp.Job.controller;


import com.karan.firstJobApp.Job.model.Users;
import com.karan.firstJobApp.Job.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    public UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public ResponseEntity<List<Users>> getUsers() {
        List<Users> users = userService.findAll();
        if(users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/username")
    public ResponseEntity<Users> getUser(@RequestParam("username") String username) {
        Users users=userService.findByUsername(username);
        if(users == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Users> addUser(@RequestBody Users user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        userService.UserAdd(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(@RequestParam("username") String username) {
        if (userService.findByUsername(username) == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        userService.UserDelete(username);
        return new ResponseEntity<>("DELETED",HttpStatus.OK);
    }

}
