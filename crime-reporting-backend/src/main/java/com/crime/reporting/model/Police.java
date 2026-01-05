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
    @Column(name = "user_id")
    private Long userId;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;
    private String phone;

    @Column(unique = true)
    private String badgeNumber;

    private String stationName;
    private String stationAddress;
    private String city;
    private String state;
    private String pincode;

    @Column(name = "police_rank")
    private String rank;

    private String approvalStatus;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.approvalStatus = "PENDING";
    }
}
