package com.crime.reporting.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.crime.reporting.model.Admin;
import com.crime.reporting.repository.AdminRepository;

@Configuration
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public void run(String... args) {

        if (adminRepository.findByEmail("admin@gov.in").isEmpty()) {

            Admin admin = new Admin();
            admin.setName("Government");
            admin.setEmail("admin@gov.in");
            admin.setPassword("admin@123"); // encrypt later

            adminRepository.save(admin);

            System.out.println("✅ Default ADMIN created");
        }
    }
}
