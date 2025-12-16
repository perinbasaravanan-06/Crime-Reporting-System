package com.crime.reporting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.Evidence;
import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.repository.CrimeRepository;
import com.crime.reporting.repository.EvidenceRepository;
import com.crime.reporting.repository.MissingPersonRepository;

@Service
public class EvidenceService {

    @Autowired
    private EvidenceRepository evidenceRepository;

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private MissingPersonRepository missingPersonRepository;

    // ================= ADD EVIDENCE TO CRIME =================
    public Evidence addEvidenceToCrime(Long crimeId, Evidence evidence) {

        Crime crime = crimeRepository.findById(crimeId)
                .orElseThrow(() -> new RuntimeException("Crime not found"));

        evidence.setCrime(crime);
        evidence.setMissingPerson(null);

        return evidenceRepository.save(evidence);
    }

    // ================= ADD EVIDENCE TO MISSING PERSON =================
    public Evidence addEvidenceToMissingPerson(Long missingId, Evidence evidence) {

        MissingPerson missingPerson = missingPersonRepository.findById(missingId)
                .orElseThrow(() -> new RuntimeException("Missing person not found"));

        evidence.setMissingPerson(missingPerson);
        evidence.setCrime(null);

        return evidenceRepository.save(evidence);
    }

    // ================= GET =================
    public List<Evidence> getEvidenceByCrime(Long crimeId) {

        Crime crime = crimeRepository.findById(crimeId)
                .orElseThrow(() -> new RuntimeException("Crime not found"));

        return evidenceRepository.findByCrime(crime);
    }

    public List<Evidence> getEvidenceByMissingPerson(Long missingId) {

        MissingPerson missingPerson = missingPersonRepository.findById(missingId)
                .orElseThrow(() -> new RuntimeException("Missing person not found"));

        return evidenceRepository.findByMissingPerson(missingPerson);
    }
}
