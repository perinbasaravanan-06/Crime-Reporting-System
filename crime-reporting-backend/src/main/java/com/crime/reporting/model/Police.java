package com.crime.reporting.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "police")
@Data
public class Police {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long policeId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false, unique = true)
    private String badgeNumber;

    @Column(nullable = false)
    private String stationName;

    private String stationAddress;
    private String city;
    private String state;
    private String pincode;

    @Column(nullable = false)
    private String rank; // CONSTABLE, SI, DSP, etc.

    // 🔐 ADMIN APPROVAL STATUS
    @Column(nullable = false)
    private String approvalStatus; // PENDING, APPROVED, REJECTED

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();

        // default status when police registers
        this.approvalStatus = "PENDING";
    }
}
