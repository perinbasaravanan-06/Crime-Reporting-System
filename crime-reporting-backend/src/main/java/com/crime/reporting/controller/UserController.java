// ==================== Package Declaration ==============================
package com.crime.reporting.controller;

// ==================== Import Statements ==============================
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.User;
import com.crime.reporting.service.UserService;

// ==================== Controller Class Declaration ==============================
@RestController
@RequestMapping("/api/users")
public class UserController {

    // ==================== Dependency Injection ==============================
    @Autowired
    private UserService userService;

    // ==================== User Retrieval APIs ==============================
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @SuppressWarnings("null")
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
