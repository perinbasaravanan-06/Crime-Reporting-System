// ==================== Package Declaration ==============================
package com.crime.reporting.controller;

// ==================== Import Statements ==============================
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.service.AdminService;

// ==================== Controller Class Declaration ==============================
@RestController
@RequestMapping("/api/admin")

public class AdminController {

    // ==================== Dependency Injection ==============================
    @Autowired
    private AdminService adminService;

    // ==================== Dashboard APIs ==============================
    @GetMapping("/dashboard")
    public Map<String, Long> getDashboardStats() {
        return adminService.getDashboardStats();
    }

    // ==================== User Management APIs ==============================
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }
    
    
    
    // ==================== Police Management APIs ==============================
    @GetMapping("/police/total")
    public List<Police> getAllPolice() {
        return adminService.getAllPolice();
    }

    

    @PutMapping("/police/approve/{policeId}")
    public Police approvePolice(@PathVariable @NonNull Long policeId) {
        return adminService.approvePolice(policeId);
    }

    @PutMapping("/police/reject/{policeId}")
    public Police rejectPolice(@PathVariable @NonNull Long policeId) {
        return adminService.rejectPolice(policeId);
    }

    // ==================== Crime Management APIs ==============================
    @GetMapping("/crimes")
    public List<Crime> getAllCrimes() {
        return adminService.getAllCrimes();
    }


    // ==================== Missing Person Management APIs ==============================
    @GetMapping("/missing-persons")
    public List<MissingPerson> getAllMissingPersons() {
        return adminService.getAllMissingPersons();
    }
}
