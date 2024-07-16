//package com.mysite.project6.user;
//
//import java.util.Optional;
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
////import com.mysite.project2.DataNotFoundException;
////import com.mysite.project2.user.SiteUser;
////import com.mysite.project2.user.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Service
//public class UserService {
//
//	private final UserRepository userRepository;
//	private final PasswordEncoder passwordEncoder;
//	
//	public User create(String username, String email, String password) {
//		User user = new User();
//		user.setUsername(username);
//		user.setEmail(email);
//		user.setPassword(passwordEncoder.encode(password));
//		this.userRepository.save(user);
//		return user;
//	}
//	
////	public User getUser(String username) {
////		Optional<User> siteUser = this.userRepository.findByUsername(username);
////		if(siteUser.isPresent()) {
////			return siteUser.get();
////		} else {
////			throw new DataNotFoundException("siteuser not found");
////		}
////	}
//}
