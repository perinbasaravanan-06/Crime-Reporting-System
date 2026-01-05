package com.crime.reporting.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class ApiWorking {

	@GetMapping("/")
	public String apiWorking() {
		return "Api is Working";
	}
}
