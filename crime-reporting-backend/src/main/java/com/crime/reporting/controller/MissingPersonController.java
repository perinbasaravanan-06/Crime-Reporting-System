// ==================== Package Declaration ==============================
package com.crime.reporting.controller;

// ==================== Import Statements ==============================
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

import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.service.MissingPersonService;

// ==================== Controller Class Declaration ==============================
@RestController
@RequestMapping("/api/missing-persons")
public class MissingPersonController {

    // ==================== Dependency Injection ==============================
    @Autowired
    private MissingPersonService missingPersonService;

    // ==================== Missing Person Creation APIs ==============================
    @PostMapping
    public MissingPerson createMissingPerson(
            @RequestBody MissingPerson missingPerson,
            Authentication authentication) {
    	String email = authentication.getName();
        return missingPersonService.createMissingPerson(missingPerson,email);
    }

    // ==================== Missing Person Retrieval APIs ==============================
    @GetMapping
    public List<MissingPerson> getAllMissingPersons() {
        return missingPersonService.getAllMissingPersons();
    }

    @GetMapping("/my")
    public List<MissingPerson> getMissingPersons(Authentication authentication) {
    	String email = authentication.getName();
        return missingPersonService.getMissingByUser(email);
    }

    @GetMapping("/police")
    public List<MissingPerson> getAssignedMissingCases(Authentication authentication
    		) {
        String policeEmail = authentication.getName();
        return missingPersonService.getAssignedMissing(policeEmail);
    }

    // ==================== Missing Person Status Update APIs ==============================
    @PutMapping("/{missingId}/status")
    public MissingPerson updateMissingStatus(
            @PathVariable @NonNull Long missingId,
            @RequestParam String status,
            Authentication authentication
    ) {
        String policeEmail = authentication.getName();
        return missingPersonService.updateMissingStatus(missingId, status, policeEmail);
    }
}
