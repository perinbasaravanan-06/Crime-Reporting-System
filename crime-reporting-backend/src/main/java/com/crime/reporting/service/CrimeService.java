package com.crime.reporting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.CrimeRepository;
import com.crime.reporting.repository.PoliceRepository;
import com.crime.reporting.repository.UserRepository;

@Service
public class CrimeService {

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PoliceRepository policeRepository;

    // ================= CREATE CRIME =================
    public Crime createCrime(Crime crime, Long userId) {

        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        crime.setReportedBy(user);

        
        Police assignedPolice = assignPoliceStrict(crime.getCrimeType());
        crime.setAssignedPolice(assignedPolice);

        return crimeRepository.save(crime);
    }

    // ================= CORE ASSIGNMENT =================
    private Police assignPoliceStrict(String crimeType) {

        String requiredRank = getRequiredRank(crimeType);

        // Get ONLY police with exact required rank
        List<Police> eligiblePolice = policeRepository.findAll()
                .stream()
                .filter(p -> p.getRank().equalsIgnoreCase(requiredRank))
                .toList();

        if (eligiblePolice.isEmpty()) {
            throw new RuntimeException(
                "No police found with rank " + requiredRank + " for crime " + crimeType
            );
        }

        Police selected = null;
        long minCrimeCount = Long.MAX_VALUE;

        for (Police police : eligiblePolice) {

            long crimeCount = crimeRepository.countByAssignedPolice(police);

            // Least workload
            if (crimeCount < minCrimeCount) {
                minCrimeCount = crimeCount;
                selected = police;
            }
            // Tie-breaker → earlier joining officer
            else if (crimeCount == minCrimeCount) {
                if (police.getCreatedAt()
                        .isBefore(selected.getCreatedAt())) {
                    selected = police;
                }
            }
        }

        return selected;
    }

    // ================= CRIME TYPE → EXACT RANK =================
    private String getRequiredRank(String crimeType) {

        switch (crimeType.toUpperCase()) {

            case "THEFT":
                return "CONSTABLE";

            case "ROBBERY":
            case "ASSAULT":
                return "SI";

            case "MURDER":
                return "DSP";

            default:
                throw new RuntimeException("Unsupported crime type: " + crimeType);
        }
    }

    // ================= READ METHODS =================
    public List<Crime> getAllCrimes() {
        return crimeRepository.findAll();
    }

    public Crime getCrimeById(Long crimeId) {
        return crimeRepository.findById(crimeId)
                .orElseThrow(() -> new RuntimeException("Crime not found"));
    }
}
