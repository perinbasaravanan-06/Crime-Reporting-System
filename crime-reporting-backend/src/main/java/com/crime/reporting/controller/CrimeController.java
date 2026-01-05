package com.crime.reporting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.Crime;
import com.crime.reporting.service.CrimeService;

@RestController
@RequestMapping("/api/crimes")

public class CrimeController {

    @Autowired
    private CrimeService crimeService;

    // ==================== USER: CREATE CRIME (JWT) ====================
    @PostMapping
    public Crime createCrime(
            @RequestBody Crime crime,
            Authentication authentication) {
    	System.out.println("Inside Controller");
        String email = authentication.getName();
        return crimeService.createCrime(crime, email);
    }

    // ==================== USER: VIEW OWN CRIMES ====================
    @GetMapping("/my")
    public List<Crime> getMyCrimes(Authentication authentication) {
    	
        String email = authentication.getName();
        return crimeService.getCrimesByUserEmail(email);
    }

    // ==================== POLICE: VIEW ASSIGNED CRIMES ====================
    @GetMapping("/police")
    public List<Crime> getCrimesForPolice(Authentication authentication) {
        String email = authentication.getName();
        return crimeService.getCrimesForPoliceByEmail(email);
    }

    // ==================== POLICE: UPDATE STATUS ====================
    @PutMapping("/{crimeId}/status")
    public Crime updateCrimeStatus(
            @PathVariable @NonNull Long crimeId,
            @RequestParam String status,
            Authentication authentication) {
    	String policeEmail = authentication.getName();
        return crimeService.updateCrimeStatus(crimeId, status,policeEmail);
    }

    // ==================== ADMIN: VIEW ALL ====================
    @GetMapping
    public List<Crime> getAllCrimes() {
        return crimeService.getAllCrimes();
    }
}
