// ==================== Package Declaration ==============================
package com.crime.reporting.service;

// ==================== Import Statements ==============================
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.Evidence;
import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.CrimeRepository;
import com.crime.reporting.repository.EvidenceRepository;
import com.crime.reporting.repository.MissingPersonRepository;
import com.crime.reporting.repository.UserRepository;

// ==================== Service Class Declaration ==============================
@Service
public class EvidenceService {

    // ==================== Repository Dependencies ==============================
    @Autowired
    private EvidenceRepository evidenceRepository;

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private MissingPersonRepository missingPersonRepository;

    @Autowired
    private UserRepository userRepository;

    // ==================== Add Evidence to Crime ==============================
    public Evidence addEvidenceToCrime(@NonNull Long crimeId, Evidence evidence, String email) {

        Crime crime = crimeRepository.findById(crimeId)
                .orElseThrow(() -> new RuntimeException("Crime not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not Found"));

        long count = evidenceRepository.countByCrime(crime) + 1;
        String evidenceCode = crime.getCaseId() + "-EV-" + String.format("%02d", count);

        evidence.setEvidenceCode(evidenceCode);
        evidence.setUploadedBy(user);
        evidence.setCrime(crime);
        evidence.setMissingPerson(null);

        return evidenceRepository.save(evidence);
    }

    // ==================== Add Evidence to Missing Person ==============================
    public Evidence addEvidenceToMissingPerson(@NonNull Long missingPersonId, Evidence evidence, String email) {

        MissingPerson missingPerson = missingPersonRepository.findById(missingPersonId)
                .orElseThrow(() -> new RuntimeException("Missing person not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not Found"));

        long count = evidenceRepository.countByMissingPerson(missingPerson) + 1;
        String evidenceCode = missingPerson.getCaseId() + "-EV-" + String.format("%02d", count);

        evidence.setEvidenceCode(evidenceCode);
        evidence.setUploadedBy(user);
        evidence.setMissingPerson(missingPerson);
        evidence.setCrime(null);

        return evidenceRepository.save(evidence);
    }

    // ==================== Get Evidence by Crime ==============================
    public List<Evidence> getEvidenceByCrime(@NonNull Long crimeId) {

        Crime crime = crimeRepository.findById(crimeId)
                .orElseThrow(() -> new RuntimeException("Crime not found"));

        return evidenceRepository.findByCrime(crime);
    }

    // ==================== Get Evidence by Missing Person ==============================
    public List<Evidence> getEvidenceByMissingPerson(@NonNull Long missingId) {

        MissingPerson missingPerson = missingPersonRepository.findById(missingId)
                .orElseThrow(() -> new RuntimeException("Missing person not found"));

        return evidenceRepository.findByMissingPerson(missingPerson);
    }

    // ==================== Get All Evidence ==============================
    public List<Evidence> getAllEvidence() {
        return evidenceRepository.findAll();
    }

    public List<Evidence> getAllEvidenceById(String email) {
    	User user = userRepository.findByEmail(email).get();
        return evidenceRepository.findByUploadedBy_UserId(user.getUserId());
    }

    // ==================== Update Evidence Status ==============================
    public Evidence updateStatus(@NonNull Long evidenceId, String status) {
        Evidence evidence = evidenceRepository.findById(evidenceId)
                .orElseThrow(() -> new RuntimeException("Evidence not found"));

        if (!status.equals("APPROVED") && !status.equals("REJECTED")) {
            throw new IllegalArgumentException("Invalid status");
        }

        evidence.setStatus(status);
        return evidenceRepository.save(evidence);
    }
}
