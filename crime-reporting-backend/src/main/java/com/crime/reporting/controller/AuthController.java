package com.crime.reporting.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.service.AuthService;

@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private AuthService authService;


    // ==================== USER REGISTER ====================
    @PostMapping("/register/user")
    public String registerUser(@RequestBody User user) {
        authService.registerUser(user);
        return "User registered successfully";
    }

    // ==================== POLICE REGISTER ====================
    @PostMapping("/register/police")
    public String registerPolice(@RequestBody Police police) {
        authService.registerPolice(police);
        return "Police registration submitted for admin approval";
    }

    // ==================== USER / ADMIN LOGIN ====================
    @PostMapping("/login")
    public Map<String, Object> normalLogin(
            @RequestParam String email,
            @RequestParam String password) {

        //Service returns { token, user }
        return authService.normalLogin(email, password);
    }

    // ==================== POLICE LOGIN ====================
    @PostMapping("/police/login")
    public Map<String, Object> policeLogin(
            @RequestParam String email,
            @RequestParam String password) {

        return authService.policeLogin(email, password);
    }
}
