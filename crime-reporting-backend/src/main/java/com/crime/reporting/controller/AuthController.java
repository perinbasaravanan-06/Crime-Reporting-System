package com.crime.reporting.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "*") // adjust later for frontend URL
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * ================= NORMAL REGESTRATION =================
     */
    @PostMapping("/register/user")
    public String registerUser(@RequestBody User user) {
        authService.registerUser(user);
        return "User registered successfully";
    }
    /**
     * ================= POLICE REGESTRATION =================
     */
    @PostMapping("/register/police")
    public String registerPolice(@RequestBody Police police) {
        authService.registerPolice(police);
        return "Police registration submitted for admin approval";
    }
	
    /**
     * ================= NORMAL LOGIN =================
     * Used by:
     *  - Admin
     *  - Citizen (User)
     *
     * Frontend decides dashboard based on "role"
     */
    @PostMapping("/login")
    public Map<String, String> normalLogin(
            @RequestParam String email,
            @RequestParam String password) {

        String role = authService.normalLogin(email, password);

        Map<String, String> response = new HashMap<>();
        response.put("role", role); // ADMIN or USER

        return response;
    }

    /**
     * ================= POLICE LOGIN =================
     * Admin approval is mandatory
     */
    @PostMapping("/police/login")
    public Map<String, String> policeLogin(
            @RequestParam String email,
            @RequestParam String password) {

        String role = authService.policeLogin(email, password);

        Map<String, String> response = new HashMap<>();
        response.put("role", role); // POLICE

        return response;
    }
}
