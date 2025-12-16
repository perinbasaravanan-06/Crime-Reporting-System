package com.crime.reporting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.service.MissingPersonService;

@RestController
@RequestMapping("/api/missing-persons")
public class MissingPersonController {

    @Autowired
    private MissingPersonService missingPersonService;

    // Create missing person report
    @PostMapping("/user/{userId}")
    public MissingPerson createMissingPerson(
            @PathVariable Long userId,
            @RequestBody MissingPerson missingPerson) {

        return missingPersonService.createMissingPerson(missingPerson, userId);
    }

    // Get all missing persons
    @GetMapping
    public List<MissingPerson> getAllMissingPersons() {
        return missingPersonService.getAllMissingPersons();
    }

    // Get missing person by ID
    @GetMapping("/{id}")
    public MissingPerson getMissingPersonById(@PathVariable Long id) {
        return missingPersonService.getMissingPersonById(id);
    }
}
