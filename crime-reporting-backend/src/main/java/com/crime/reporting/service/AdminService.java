// ==================== Package Declaration ==============================
package com.crime.reporting.service;

// ==================== Import Statements ==============================
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.CrimeRepository;
import com.crime.reporting.repository.MissingPersonRepository;
import com.crime.reporting.repository.PoliceRepository;
import com.crime.reporting.repository.UserRepository;

// ==================== Service Class Declaration ==============================
@Service
public class AdminService {

    // ==================== Repository Dependencies ==============================
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PoliceRepository policeRepository;

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private MissingPersonRepository missingPersonRepository;

    // ==================== User Management Services ==============================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ==================== Police Management Services ==============================
    public List<Police> getAllPolice() {
        return policeRepository.findAll();
    }

    public Police approvePolice(@NonNull Long policeId) {

        Police police = policeRepository.findById(policeId)
                .orElseThrow(() -> new RuntimeException("Police not found"));

        police.setApprovalStatus("APPROVED");
        return policeRepository.save(police);
    }

    public Police rejectPolice(@NonNull Long policeId) {

        Police police = policeRepository.findById(policeId)
                .orElseThrow(() -> new RuntimeException("Police not found"));

        police.setApprovalStatus("REJECTED");
        return policeRepository.save(police);
    }

    // ==================== Crime Management Services ==============================
    public List<Crime> getAllCrimes() {
        return crimeRepository.findAll();
    }

    public List<Crime> getCrimesByStatus(String status) {
        return crimeRepository.findAll()
                .stream()
                .filter(c -> c.getStatus().equalsIgnoreCase(status))
                .toList();
    }

    // ==================== Missing Person Management Services ==============================
    public List<MissingPerson> getAllMissingPersons() {
        return missingPersonRepository.findAll();
    }

    // ==================== Dashboard Statistics Services ==============================
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("totalUsers", userRepository.count());
        stats.put("totalPolice", policeRepository.count());
        stats.put("totalCrimes", crimeRepository.count());
        stats.put("totalMissingPersons", missingPersonRepository.count());

        stats.put(
                "pendingCrimes",
                crimeRepository.findAll()
                        .stream()
                        .filter(c ->
                                c.getStatus().equalsIgnoreCase("SUBMITTED")
                                        || c.getStatus().equalsIgnoreCase("PENDING"))
                        .count()
        );

        stats.put(
                "solvedCrimes",
                crimeRepository.findAll()
                        .stream()
                        .filter(c -> c.getStatus().equalsIgnoreCase("CLOSED"))
                        .count()
        );

        return stats;
    }
}
