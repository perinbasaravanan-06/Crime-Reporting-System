package com.crime.reporting.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ================= DASHBOARD =================

    // Get admin dashboard statistics
    @GetMapping("/dashboard")
    public Map<String, Long> getDashboardStats() {
        return adminService.getDashboardStats();
    }

    // ================= USER MANAGEMENT =================

    // Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    // ================= POLICE MANAGEMENT =================

    // Get all police
    
    @GetMapping("/police")
    public List<Police> getAllPolice() {
        return adminService.getAllPolice();
    }

    // Get pending police approvals
    
    @GetMapping("/police/pending")
    public List<Police> getPendingPolice() {
        return adminService.getPendingPoliceApprovals();
    }

    // Approve police
    
    @PutMapping("/police/{policeId}/approve")
    public Police approvePolice(@PathVariable Long policeId) {
        return adminService.approvePolice(policeId);
    }

    // Reject police
    @PutMapping("/police/{policeId}/reject")
    public Police rejectPolice(@PathVariable Long policeId) {
        return adminService.rejectPolice(policeId);
    }

    // ================= CRIME MANAGEMENT =================

    // Get all crimes
    
    @GetMapping("/crimes")
    public List<Crime> getAllCrimes() {
        return adminService.getAllCrimes();
    }

    // Get crimes by status (PENDING / SUBMITTED / CLOSED)
    
    @GetMapping("/crimes/status/{status}")
    public List<Crime> getCrimesByStatus(@PathVariable String status) {
        return adminService.getCrimesByStatus(status);
    }

    // ================= MISSING PERSON MANAGEMENT =================

    // Get all missing persons
    
    @GetMapping("/missing-persons")
    public List<MissingPerson> getAllMissingPersons() {
        return adminService.getAllMissingPersons();
    }
}
