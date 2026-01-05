package com.crime.reporting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crime.reporting.model.MissingPerson;
import com.crime.reporting.model.Police;

@Repository
public interface MissingPersonRepository extends JpaRepository<MissingPerson, Long> {
	public long countByAssignedPolice(Police police);
	public long count();
	public List<MissingPerson> findByReportedBy_UserId(Long userId);
	public List<MissingPerson> findByAssignedPolice_UserId(Long userId);

}
