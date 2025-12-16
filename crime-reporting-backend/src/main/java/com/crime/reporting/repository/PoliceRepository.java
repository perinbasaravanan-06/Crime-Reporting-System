package com.crime.reporting.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crime.reporting.model.Police;

@Repository
public interface PoliceRepository extends JpaRepository<Police, Long> {

	public Optional<Police> findByEmail(String email);

	public List<Police> findByApprovalStatus(String string);

	public Optional<Police> findByBadgeNumber(String badgeNumber);

	
}
