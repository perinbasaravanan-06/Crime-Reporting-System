// ==================== Package Declaration ==============================
package com.crime.reporting.service;

// ==================== Import Statements ==============================
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Police;
import com.crime.reporting.repository.PoliceRepository;

// ==================== Service Class Declaration ==============================
@Service
public class PoliceService {

    // ==================== Repository Dependency ==============================
    @Autowired
    private PoliceRepository policeRepository;

    // ==================== Create Police ==============================
    public Police createPolice(@NonNull Police police) {
        return policeRepository.save(police);
    }

    // ==================== Read All Police ==============================
    public List<Police> getAllPolice() {
        return policeRepository.findAll();
    }

    // ==================== Get Police by ID ==============================
    public Police getPoliceById(@NonNull Long id) {
        return policeRepository.findById(id).get();
    }
}
