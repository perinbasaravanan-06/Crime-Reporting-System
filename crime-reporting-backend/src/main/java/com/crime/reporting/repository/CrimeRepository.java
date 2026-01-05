package com.crime.reporting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.Police;

@Repository
public interface CrimeRepository extends JpaRepository<Crime, Long> {

	public List<Crime> findByReportedBy_UserId(Long userId);

	public List<Crime> findByAssignedPolice(Police police);

	public long countByCrimeType(String crimeType);

	public long countByAssignedPolice(Police police);
    

}
