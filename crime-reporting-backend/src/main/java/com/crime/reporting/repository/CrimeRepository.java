package com.crime.reporting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.Police;

@Repository
public interface CrimeRepository extends JpaRepository<Crime, Long> {

    public long countByAssignedPolice(Police police);
}
