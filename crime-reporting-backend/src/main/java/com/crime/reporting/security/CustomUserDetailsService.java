package com.crime.reporting.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Admin;
import com.crime.reporting.model.Police;
import com.crime.reporting.model.User;
import com.crime.reporting.repository.AdminRepository;
import com.crime.reporting.repository.PoliceRepository;
import com.crime.reporting.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PoliceRepository policeRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        // ===== ADMIN =====
        Admin admin = adminRepository.findByEmail(email).orElse(null);
        if (admin != null) {
            return new org.springframework.security.core.userdetails.User(
                    admin.getEmail(),
                    admin.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
        }

        // ===== POLICE =====
        Police police = policeRepository.findByEmail(email).orElse(null);
        if (police != null) {
            return new org.springframework.security.core.userdetails.User(
                    police.getEmail(),
                    police.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_POLICE"))
            );
        }

        // ===== USER =====
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
