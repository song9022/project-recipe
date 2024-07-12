package com.mysite.project6.user;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mysite.project6.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	
	public User getUser(String username) {
		Optional<User> user = this.userRepository.findByUsername(username);
		if(user.isPresent()) {
			return user.get();
		} else {
			throw new DataNotFoundException("siteuser not found");
		}
	}
}
