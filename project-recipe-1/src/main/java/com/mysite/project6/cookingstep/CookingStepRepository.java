package com.mysite.project6.cookingstep;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface CookingStepRepository extends JpaRepository<CookingStep, Integer> {

}
