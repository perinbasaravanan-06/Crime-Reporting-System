package com.crime.reporting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crime.reporting.model.Crime;
import com.crime.reporting.model.Evidence;
import com.crime.reporting.model.MissingPerson;

@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, Long> {

    List<Evidence> findByCrime(Crime crime);

    List<Evidence> findByMissingPerson(MissingPerson missingPerson);
    public long countByCrime(Crime crime);

    public long countByMissingPerson(MissingPerson missingPerson);
    
    public List<Evidence> findByUploadedBy_UserId(Long userId);
}
