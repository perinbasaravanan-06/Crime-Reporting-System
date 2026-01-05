// ==================== Package Declaration ==============================
package com.crime.reporting.service;

// ==================== Import Statements ==============================
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.User;
import com.crime.reporting.repository.UserRepository;

// ==================== Service Class Declaration ==============================
@Service
public class UserService {

    // ==================== Repository Dependency ==============================
    @Autowired
    private UserRepository userRepository;

    // ==================== Create User ==============================
    @SuppressWarnings("null")
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // ==================== Read All Users ==============================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ==================== Get User by ID ==============================
    public User getUserById(@NonNull Long id) {
        return userRepository.findById(id).get();
    }
}
