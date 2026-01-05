// ==================== Package Declaration ==============================
package com.crime.reporting.controller;

// ==================== Import Statements ==============================
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.Police;
import com.crime.reporting.service.PoliceService;

// ==================== Controller Class Declaration ==============================
@RestController
@RequestMapping("/api/police")

public class PoliceController {

    // ==================== Dependency Injection ==============================
    @Autowired
    private PoliceService policeService;

    // ==================== Police Retrieval APIs ==============================
    @GetMapping
    public List<Police> getAllPolice() {
        return policeService.getAllPolice();
    }

    @GetMapping("/{id}")
    public Police getPoliceById(@PathVariable @NonNull Long id) {
        return policeService.getPoliceById(id);
    }
}
