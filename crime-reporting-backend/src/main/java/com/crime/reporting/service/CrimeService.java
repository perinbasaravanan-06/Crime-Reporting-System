package com.crime.reporting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.CrimeRepository;
import com.crime.reporting.repository.PoliceRepository;
import com.crime.reporting.repository.UserRepository;
import com.crime.reporting.util.CaseIdUtil;

@Service
public class CrimeService {

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PoliceRepository policeRepository;

    // ==================== CREATE CRIME (JWT BASED) ====================
    public Crime createCrime(Crime crime, String userEmail) {
    	System.out.println("Creating crime....");
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        crime.setReportedBy(user);

        Police assignedPolice = assignPoliceStrict(crime.getCrimeType());
        crime.setAssignedPolice(assignedPolice);

        String prefix = CaseIdUtil.getCrimePrefix(crime.getCrimeType());
        long count = crimeRepository.countByCrimeType(crime.getCrimeType()) + 1;

        String caseId = prefix + "-" + String.format("%02d", count);
        crime.setCaseId(caseId);

        crime.setStatus("PENDING");

        return crimeRepository.save(crime);
    }

    // ==================== USER: OWN CRIMES ====================
    public List<Crime> getCrimesByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return crimeRepository.findByReportedBy_UserId(user.getUserId());
    }

    // ==================== POLICE: ASSIGNED CRIMES ====================
    public List<Crime> getCrimesForPoliceByEmail(String email) {

        Police police = policeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Police not found"));

        return crimeRepository.findByAssignedPolice(police);
    }

    // ==================== UPDATE STATUS ====================
    public Crime updateCrimeStatus(@NonNull Long crimeId, String status, String policeEmail) {

        Crime crime = crimeRepository.findById(crimeId)
                .orElseThrow(() -> new RuntimeException("Crime not found"));

        Police police = policeRepository.findByEmail(policeEmail)
                .orElseThrow(() -> new RuntimeException("Police not found"));

        // 🔐 SECURITY CHECK
        if (!crime.getAssignedPolice().getUserId().equals(police.getUserId())) {
            throw new RuntimeException("You are not assigned to this case");
        }

        crime.setStatus(status);
        return crimeRepository.save(crime);
    }

    // ==================== ADMIN ====================
    public List<Crime> getAllCrimes() {
        return crimeRepository.findAll();
    }

    // ==================== POLICE ASSIGNMENT LOGIC (UNCHANGED) ====================
    private Police assignPoliceStrict(String crimeType) {

        String requiredRank = getRequiredRank(crimeType);

        List<Police> eligiblePolice = policeRepository.findAll()
                .stream()
                .filter(p -> p.getRank().equalsIgnoreCase(requiredRank))
                .filter(p -> "APPROVED".equals(p.getApprovalStatus()))
                .toList();

        if (eligiblePolice.isEmpty()) {
            throw new RuntimeException(
                    "No APPROVED police found with rank " + requiredRank);
        }

        Police selected = null;
        long minCrimeCount = Long.MAX_VALUE;

        for (Police police : eligiblePolice) {

            long crimeCount = crimeRepository.countByAssignedPolice(police);

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

    // ==================== RANK MAPPING ====================
    private String getRequiredRank(String crimeType) {

        switch (crimeType.toUpperCase()) {

            case "THEFT": return "CONSTABLE";
            case "ROBBERY": return "HEAD CONSTABLE";
            case "CYBER_CRIME": return "SUB INSPECTOR";
            case "KIDNAPPING": return "INSPECTOR";
            case "ASSAULT": return "ASSISTANT COMMISSIONER";
            case "MURDER": return "COMMISSIONER";

            default:
                throw new RuntimeException(
                        "Unsupported crime type: " + crimeType);
        }
    }
}
