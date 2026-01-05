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
@Table(name = "evidences")
@Data
public class Evidence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evidenceId;
    
    @Column(nullable = false, unique = true)
    private String evidenceCode; // TH-01-EV-01

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileType; 
    // IMAGE, VIDEO, DOCUMENT

    @Column(nullable = false)
    private String fileUrl; 
    // local path now, S3 URL later

    @Column(nullable = false, updatable = false)
    private LocalDateTime uploadedAt;

    @Column(nullable = false)
    private String status; // PENDING, APPROVED, REJECTED
    // 🔗 Evidence related to Crime (optional)
    @ManyToOne
    @JoinColumn(name = "crime_id")
    private Crime crime;

    // 🔗 Evidence related to Missing Person (optional)
    @ManyToOne
    @JoinColumn(name = "missing_id")
    private MissingPerson missingPerson;
    
    @ManyToOne
    private User uploadedBy;

    @PrePersist
    protected void onCreate() {
        this.uploadedAt = LocalDateTime.now();
        this.status = "PENDING";
    }
}
