package com.mysite.project6.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer>{

	Optional<User> findByUsername(String username);
}
