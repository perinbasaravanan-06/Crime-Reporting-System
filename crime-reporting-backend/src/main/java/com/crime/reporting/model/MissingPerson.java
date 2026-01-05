
package com.crime.reporting.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "missing_persons")
@Data
public class MissingPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long missingId;

    @Column(nullable = false, unique = true)
    private String caseId;
    
    @Column(nullable = false)
    private String name;

    private int age;

    private String gender;

    private String height;
    private String weight;

    private String identificationMarks;

    @Column(nullable = false)
    private String lastSeenLocation;

    private String city;
    private String state;
    private String pincode;
    @Column(name = "photo_url")
    private String photoUrl;

    private LocalDateTime lastSeenDate;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String status; // REPORTED, FOUND, CLOSED

    @Column(nullable = false, updatable = false)
    private LocalDateTime reportedAt;

    //Reported by User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User reportedBy;

    //Assigned Police
    @ManyToOne
    @JoinColumn(name = "police_id")
    private Police assignedPolice;

    //Auto-set on insert
    @PrePersist
    protected void onCreate() {
        this.reportedAt = LocalDateTime.now();
        this.status = "SUBMITTED";
    }
}
