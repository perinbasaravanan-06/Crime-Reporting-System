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
@Data
@Table(name = "users") 
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;
    @Column(nullable = false, unique = true)
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private LocalDateTime createAt;
    
    
    @PrePersist
    protected void onCreate() {
    	this.createAt = LocalDateTime.now();
    }
}
