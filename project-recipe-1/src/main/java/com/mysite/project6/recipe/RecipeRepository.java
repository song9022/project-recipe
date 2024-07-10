package com.mysite.project6.recipe;

import java.awt.print.Pageable;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Integer>{

//	Page<Recipe> findAll(Pageable pageable);
	Optional<Recipe> findById(Long id);
}
