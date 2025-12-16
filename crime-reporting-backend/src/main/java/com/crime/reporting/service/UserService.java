package com.crime.reporting.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.crime.reporting.model.User;
import com.crime.reporting.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private  UserRepository userRepository;
	
	@SuppressWarnings("null")
	public User createUser(User user) {
		return userRepository.save(user);
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUserById(@NonNull Long id) {
		return userRepository.findById(id).get();
	}
}
