package com.mysite.project6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mysite.project6.recipe.Recipe;
import com.mysite.project6.recipe.RecipeRepository;

@RestController
public class MainController {

	@Autowired
	private RecipeRepository recipeRepository;
	
	@GetMapping("/recipes")
	public Iterable<Recipe> getRecipes() {
		return recipeRepository.findAll();
	}
}
