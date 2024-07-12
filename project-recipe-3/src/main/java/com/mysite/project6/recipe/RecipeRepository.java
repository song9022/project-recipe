package com.mysite.project6.recipe;

import java.awt.print.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface RecipeRepository extends JpaRepository<Recipe, Integer>{

//	Page<Recipe> findAll(Pageable pageable);
}
