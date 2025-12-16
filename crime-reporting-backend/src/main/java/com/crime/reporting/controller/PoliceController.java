package com.crime.reporting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.Police;
import com.crime.reporting.service.PoliceService;

@RestController
@RequestMapping("/api/police")
public class PoliceController {

    @Autowired
    private PoliceService policeService;

    // ================= READ =================

    // Get all police (Admin use mostly)
    @GetMapping
    public List<Police> getAllPolice() {
        return policeService.getAllPolice();
    }

    // Get police by ID
    @GetMapping("/{id}")
    public Police getPoliceById(@PathVariable Long id) {
        return policeService.getPoliceById(id);
    }
}
