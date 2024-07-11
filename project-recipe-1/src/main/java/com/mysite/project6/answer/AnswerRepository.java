package com.mysite.project6.answer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface AnswerRepository extends JpaRepository<Answer, Integer>{

}
