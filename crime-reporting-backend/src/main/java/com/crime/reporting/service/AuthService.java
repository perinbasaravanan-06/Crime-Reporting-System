package com.crime.reporting.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Admin;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.AdminRepository;
import com.crime.reporting.repository.PoliceRepository;
import com.crime.reporting.repository.UserRepository;
import com.crime.reporting.security.JwtUtil;

@Service
public class AuthService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PoliceRepository policeRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtil jwtUtil;

	// ==================== USER REGISTER ====================
	public void registerUser(User user) {

		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new RuntimeException("Email already registered");
		}

		// 🔐 PASSWORD ENCODE
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}

	// ==================== POLICE REGISTER ====================
	public void registerPolice(Police police) {

		if (policeRepository.findByEmail(police.getEmail()).isPresent()) {
			throw new RuntimeException("Email already registered");
		}

		if (policeRepository.findByBadgeNumber(police.getBadgeNumber()).isPresent()) {
			throw new RuntimeException("Badge number already exists");
		}

		// 🔐 PASSWORD ENCODE
		police.setPassword(passwordEncoder.encode(police.getPassword()));
		policeRepository.save(police);
	}

	// ==================== USER / ADMIN LOGIN ====================
	public Map<String, Object> normalLogin(String email, String password) {

	    Map<String, Object> response = new HashMap<>();

	    // ===== ADMIN LOGIN =====
	    Admin admin = adminRepository.findByEmail(email).orElse(null);

	    if (admin != null &&
	        passwordEncoder.matches(password, admin.getPassword())) {

	        String token = jwtUtil.generateToken(admin.getEmail(), "ADMIN");

	        response.put("token", token);
	        response.put("user", Map.of(
	                "role", "ADMIN",
	                "name", admin.getName(),
	                "email", admin.getEmail()
	        ));
	        return response;
	    }

	    // ===== USER LOGIN =====
	    User user = userRepository.findByEmail(email).orElse(null);

	    if (user != null &&
	        passwordEncoder.matches(password, user.getPassword())) {

	        String token = jwtUtil.generateToken(user.getEmail(), "USER");

	        response.put("token", token);
	        response.put("user", Map.of(
	                "role", "USER",
	                "userId", user.getUserId(),
	                "name", user.getName(),
	                "email", user.getEmail()
	        ));
	        return response;
	    }

	    throw new RuntimeException("Invalid credentials");
	}

	// ==================== POLICE LOGIN ====================
	public Map<String, Object> policeLogin(String email, String password) {

	    Map<String, Object> response = new HashMap<>();

	    Police police = policeRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

	    if (!passwordEncoder.matches(password, police.getPassword())) {
	        throw new RuntimeException("Invalid credentials");
	    }

	    if (!"APPROVED".equals(police.getApprovalStatus())) {
	        throw new RuntimeException("Police not approved by admin");
	    }

	    // 🔐 Generate JWT
	    String token = jwtUtil.generateToken(police.getEmail(), "POLICE");

	    response.put("token", token);
	    response.put("user", Map.of(
	            "role", "POLICE",
	            "userId", police.getUserId(),
	            "rank", police.getRank(),
	            "name", police.getName(),
	            "email", police.getEmail()
	    ));

	    return response;
	}
}
