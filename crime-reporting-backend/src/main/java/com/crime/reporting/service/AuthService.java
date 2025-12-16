package com.crime.reporting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Admin;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.AdminRepository;
import com.crime.reporting.repository.PoliceRepository;
import com.crime.reporting.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PoliceRepository policeRepository;
    
    // ==== NORMAL REGESTRATION USER ONLY ====
    
    public void registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        userRepository.save(user);
    }
    // ==== POLICE REGESTRATION USER ONLY ====
    
    public void registerPolice(Police police) {

        if (policeRepository.findByEmail(police.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        if (policeRepository.findByBadgeNumber(police.getBadgeNumber()).isPresent()) {
            throw new RuntimeException("Badge number already exists");
        }

        // approvalStatus defaults to PENDING (via @PrePersist)
        policeRepository.save(police);
    }


    // ===== NORMAL LOGIN (ADMIN / USER) =====
    
    public String normalLogin(String email, String password) {

        //  Check Admin
        Admin admin = adminRepository.findByEmail(email).orElse(null);
        if (admin != null && admin.getPassword().equals(password)) {
            return "ADMIN";
        }

        //  Check User
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            return "USER";
        }

        throw new RuntimeException("Invalid credentials");
    }

    // ===== POLICE LOGIN =====
    
    public String policeLogin(String email, String password) {

        Police police = policeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!police.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!"APPROVED".equals(police.getApprovalStatus())) {
            throw new RuntimeException("Police not approved by admin");
        }

        return "POLICE";
    }
}
