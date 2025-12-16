package com.crime.reporting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.model.Police;

@Repository
public interface MissingPersonRepository extends JpaRepository<MissingPerson, Long> {
	public long countByAssignedPolice(Police police);
}
