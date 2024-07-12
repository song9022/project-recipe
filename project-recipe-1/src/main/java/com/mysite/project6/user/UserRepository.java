package com.mysite.project6.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "http://localhost:3000")
public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);

}
