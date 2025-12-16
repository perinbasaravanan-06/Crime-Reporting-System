package com.crime.reporting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.Police;
import com.crime.reporting.repository.PoliceRepository;

@Service
public class PoliceService {
	
	@Autowired
	private PoliceRepository policeRepository;
	
	public Police createPolice(Police police) {
		return policeRepository.save(police);
	}
	
	public List<Police> getAllPolice(){
		return policeRepository.findAll();
	}

	public Police getPoliceById(Long id) {
		return policeRepository.findById(id).get();
	}
}
