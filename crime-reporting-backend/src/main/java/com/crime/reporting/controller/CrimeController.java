package com.crime.reporting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.Crime;
import com.crime.reporting.service.CrimeService;

@RestController
@RequestMapping("/api/crimes")
public class CrimeController {

    @Autowired
    private CrimeService crimeService;

    
    @PostMapping("/user/{userId}")
    public Crime createCrime(
            @PathVariable Long userId,
            @RequestBody Crime crime) {

        return crimeService.createCrime(crime, userId);
    }

    @GetMapping
    public List<Crime> getAllCrimes() {
        return crimeService.getAllCrimes();
    }

    @GetMapping("/{id}")
    public Crime getCrimeById(@PathVariable Long id) {
        return crimeService.getCrimeById(id);
    }
}
