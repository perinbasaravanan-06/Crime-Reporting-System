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

import com.crime.reporting.model.Evidence;
import com.crime.reporting.service.EvidenceService;

// ==================== Controller Class Declaration ==============================
@RestController
@RequestMapping("/api/evidences")

public class EvidenceController {

    // ==================== Dependency Injection ==============================
    @Autowired
    private EvidenceService evidenceService;

    // ==================== Evidence Submission APIs ==============================
    @PostMapping("/crime/{crimeId}/user")
    public Evidence addEvidenceToCrime(
            @PathVariable @NonNull Long crimeId,
            Authentication authentication,
            @RequestBody Evidence evidence) {
    	 String email = authentication.getName();
        return evidenceService.addEvidenceToCrime(crimeId, evidence, email);
    }

    @PostMapping("/missing/{missingId}/user")
    public Evidence addEvidenceToMissingPerson(
            @PathVariable @NonNull Long missingId,
            Authentication authentication,
            @RequestBody Evidence evidence) {
    	String email = authentication.getName();
        return evidenceService.addEvidenceToMissingPerson(missingId, evidence, email);
    }

    // ==================== Evidence Retrieval APIs ==============================
    @GetMapping("/crime/{crimeId}")
    public List<Evidence> getEvidenceByCrime(@PathVariable @NonNull Long crimeId) {
        return evidenceService.getEvidenceByCrime(crimeId);
    }

    @GetMapping("/missing/{missingId}")
    public List<Evidence> getEvidenceByMissingPerson(@PathVariable @NonNull Long missingId) {
        return evidenceService.getEvidenceByMissingPerson(missingId);
    }

    @GetMapping
    public List<Evidence> getAllEvidence() {
        return evidenceService.getAllEvidence();
    }

    @GetMapping("/user")
    public List<Evidence> getAllEvidenceById(Authentication authentication) {
    	String email = authentication.getName();
        return evidenceService.getAllEvidenceById(email);
    }

    @GetMapping("/police")
    public List<Evidence> getEvidenceForPolice() {
        return evidenceService.getAllEvidence();
    }

    // ==================== Evidence Status Update APIs ==============================
    @PutMapping("/{evidenceId}/status")
    public Evidence updateEvidenceStatus(
            @PathVariable @NonNull Long evidenceId,
            @RequestParam String status
    ) {
        return evidenceService.updateStatus(evidenceId, status);
    }
}
