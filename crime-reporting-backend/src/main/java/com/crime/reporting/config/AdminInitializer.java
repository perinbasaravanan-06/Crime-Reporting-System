// ==================== Package Declaration ==============================
package com.crime.reporting.config;

// ==================== Import Statements ==============================
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.crime.reporting.model.Admin;
import com.crime.reporting.repository.AdminRepository;

// ==================== Configuration Class Declaration ==============================
@Configuration
public class AdminInitializer implements CommandLineRunner {

    // ==================== Dependency Injection ==============================
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    // ==================== Application Startup Logic ==============================
    @Override
    public void run(String... args) {

        if (adminRepository.findByEmail("admin@gov.in").isEmpty()) {

            Admin admin = new Admin();
            admin.setName("Government");
            admin.setEmail("admin@gov.in");
            admin.setPassword(passwordEncoder.encode("12345"));

            adminRepository.save(admin);

            System.out.println("Default ADMIN created");
        }
    }
}
