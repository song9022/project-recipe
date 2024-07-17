package com.mysite.project6.recipe;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.ingredient.IngredientRepository;
import com.mysite.project6.photo.Photo;
import com.mysite.project6.photo.PhotoRepository;
import com.mysite.project6.user.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

	@Autowired
	private RecipeRepository recipeRepository;

	@Autowired
	private IngredientRepository ingredientRepository;

	@Autowired
	private CookingStepRepository cookingStepRepository;

	@Autowired
	private PhotoRepository photoRepository;

	// 레시피 이름 또는 재료 이름으로 검색
	@GetMapping("/api/recipes/search")
	public List<Recipe> searchRecipes(@RequestParam String keyword, @RequestParam String searchType) {
		if ("name".equals(searchType)) {
			return recipeRepository.findByNameContainingIgnoreCase(keyword);
		} else if ("ingredient".equals(searchType)) {
			return recipeRepository.findByIngredientContaining(keyword);
		} else {
			throw new IllegalArgumentException("Invalid search type: " + searchType);
		}
	}

	

	

    

	
}
