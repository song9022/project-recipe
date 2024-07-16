package com.mysite.project6.recipe;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.ingredient.IngredientRepository;
import com.mysite.project6.photo.PhotoRepository;

import jakarta.persistence.EntityNotFoundException;

@RestController
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
	
	@PutMapping("/recipes/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable Integer id, @RequestBody RecipeDto updatedRecipeDto) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found with id: " + id));

        // RecipeDto에서 amount와 time을 Integer로 변환하여 엔티티에 설정
        recipe.setName(updatedRecipeDto.getName());
        recipe.setIntroduction(updatedRecipeDto.getIntroduction());
        recipe.setCategory(updatedRecipeDto.getCategory());
        recipe.setAmount(Integer.parseInt(updatedRecipeDto.getAmount())); // String을 Integer로 변환
        recipe.setTime(Integer.parseInt(updatedRecipeDto.getTime()));     // String을 Integer로 변환
        recipe.setLevel(updatedRecipeDto.getLevel());
        // 필요한 경우 다른 필드들도 업데이트

        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.ok(savedRecipe);
    }

// 	private RecipeService recipeService;
// 	private UserService userService;

}
