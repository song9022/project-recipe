package com.mysite.project6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.ingredient.IngredientRepository;
import com.mysite.project6.recipe.Recipe;
import com.mysite.project6.recipe.RecipeRepository;

@RestController
public class MainController {

	@Autowired
	private RecipeRepository recipeRepository;
	
	@Autowired
	private IngredientRepository ingredientRepository;
	
	@GetMapping("/recipes")
	public Iterable<Recipe> getRecipes() {
		return recipeRepository.findAll();
	}
//	
	@GetMapping("/ingredients")
	public Iterable<Ingredient> getingredients() {
		return ingredientRepository.findAll();
	}
	
	@Autowired
	private CookingStepRepository cookingStepRepository;
	
	@GetMapping("/cookingstep")
	public Iterable<CookingStep> getCookingStep() {
		return cookingStepRepository.findAll();
	}
}
