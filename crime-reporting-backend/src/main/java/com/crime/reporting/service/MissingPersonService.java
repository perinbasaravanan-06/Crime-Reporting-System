// ==================== Package Declaration ==============================
package com.crime.reporting.service;

// ==================== Import Statements ==============================
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.MissingPersonRepository;
import com.crime.reporting.repository.PoliceRepository;
import com.crime.reporting.repository.UserRepository;

// ==================== Service Class Declaration ==============================
@Service
public class MissingPersonService {

    // ==================== Repository Dependencies ==============================
    @Autowired
    private MissingPersonRepository missingPersonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PoliceRepository policeRepository;

    // ==================== Create Missing Person ==============================
    public MissingPerson createMissingPerson(MissingPerson missingPerson, String userEmail) {

        // Assign reporting user
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        missingPerson.setReportedBy(user);

        Police assignedSI = assignPolice();
        missingPerson.setAssignedPolice(assignedSI);

        long count = missingPersonRepository.count() + 1;
        missingPerson.setCaseId("MISS-" + String.format("%02d", count));

        // Save
        return missingPersonRepository.save(missingPerson);
    }

    // ==================== Read All Missing Persons ==============================
    public List<MissingPerson> getAllMissingPersons() {
        return missingPersonRepository.findAll();
    }

    // ==================== Get Missing Persons Submitted by User ==============================
    public List<MissingPerson> getMissingByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return missingPersonRepository.findByReportedBy_UserId(user.getUserId());
    }
    // ==================== Core Logic to Assign Least Busy Sub Inspector ==============================
    private Police assignPolice() {
        List<Police> eligiblePolice = policeRepository.findAll()
                .stream()
                .filter(p -> "APPROVED".equals(p.getApprovalStatus()))
                .toList();

        if (eligiblePolice.isEmpty()) {
            throw new RuntimeException(
                    "No APPROVED police found");
        }

        Police selected = null;
        long minCrimeCount = Long.MAX_VALUE;

        for (Police police : eligiblePolice) {

            long crimeCount = missingPersonRepository.countByAssignedPolice(police);

            if (selected == null || crimeCount < minCrimeCount) {
                minCrimeCount = crimeCount;
                selected = police;
            } else if (crimeCount == minCrimeCount &&
                       police.getCreatedAt().isBefore(selected.getCreatedAt())) {
                selected = police;
            }
        }

        return selected;
    }


    // ==================== Update Missing Person Status ==============================
    public MissingPerson updateMissingStatus(
            @NonNull Long missingId,
            String status,
            String policeEmail
    ) {
        MissingPerson m = missingPersonRepository.findById(missingId)
                .orElseThrow(() -> new RuntimeException("Missing case not found"));

        Police police = policeRepository.findByEmail(policeEmail)
                .orElseThrow(() -> new RuntimeException("Police not found"));

        if (!m.getAssignedPolice().getUserId().equals(police.getUserId())) {
            throw new RuntimeException("Not authorized for this case");
        }

        m.setStatus(status);
        return missingPersonRepository.save(m);
    }

    // ==================== Get Missing Persons Assigned to Police ==============================
    public List<MissingPerson> getAssignedMissing(String policeEmail) {

        Police police = policeRepository.findByEmail(policeEmail)
                .orElseThrow(() -> new RuntimeException("Police not found"));

        return missingPersonRepository
                .findByAssignedPolice_UserId(police.getUserId());
    }
}
