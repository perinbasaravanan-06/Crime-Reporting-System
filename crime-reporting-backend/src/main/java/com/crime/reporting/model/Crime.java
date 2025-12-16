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
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;
	
	@Entity
	@Table(name = "crimes")
	@Data
	public class Crime {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long crimeId;
	
	    @Column(nullable = false)
	    private String crimeType;   // Theft, Murder, Assault, etc.
	
	    @Column(length = 1000)
	    private String description;
	
	    @Column(nullable = false)
	    private String location;
	    private String city;
	    private String state;
	    private String pincode;
	
	    @Column(nullable = false)
	    private String status;   // PENDING, VERIFIED, CLOSED
	
	    @Column(nullable = false, updatable = false)
	    private LocalDateTime reportedAt;
	
	    private LocalDateTime updatedAt;
	
	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    private User reportedBy;
	
	    // 🔗 Crime assigned to a Police officer
	    @ManyToOne
	    @JoinColumn(name = "police_id")
	    private Police assignedPolice;
	
	    @PrePersist
	    protected void onCreate() {
	        this.reportedAt = LocalDateTime.now();
	        this.status = "CRIME REPORTED";
	    }
	
	    // ✅ Automatically set when updated
	    @PreUpdate
	    protected void onUpdate() {
	        this.updatedAt = LocalDateTime.now();
	    }
	}
