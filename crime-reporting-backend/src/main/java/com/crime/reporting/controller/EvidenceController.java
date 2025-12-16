package com.crime.reporting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.Evidence;
import com.crime.reporting.service.EvidenceService;

@RestController
@RequestMapping("/api/evidence")
public class EvidenceController {

    @Autowired
    private EvidenceService evidenceService;

    // Add evidence to crime
    @PostMapping("/crime/{crimeId}")
    public Evidence addEvidenceToCrime(
            @PathVariable Long crimeId,
            @RequestBody Evidence evidence) {

        return evidenceService.addEvidenceToCrime(crimeId, evidence);
    }

    // Add evidence to missing person
    @PostMapping("/missing/{missingId}")
    public Evidence addEvidenceToMissingPerson(
            @PathVariable Long missingId,
            @RequestBody Evidence evidence) {

        return evidenceService.addEvidenceToMissingPerson(missingId, evidence);
    }

    // Get evidence for crime
    @GetMapping("/crime/{crimeId}")
    public List<Evidence> getEvidenceByCrime(@PathVariable Long crimeId) {
        return evidenceService.getEvidenceByCrime(crimeId);
    }

    // Get evidence for missing person
    @GetMapping("/missing/{missingId}")
    public List<Evidence> getEvidenceByMissingPerson(@PathVariable Long missingId) {
        return evidenceService.getEvidenceByMissingPerson(missingId);
    }
}
