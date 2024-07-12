package com.mysite.project6.recipe;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mysite.project6.DataNotFoundException;
import com.mysite.project6.user.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RecipeService {

	private RecipeRepository recipeRepository;
	
	public void like(Recipe recipe, User user) {
		recipe.getLikedByUsers().add(user);
		this.recipeRepository.save(recipe);
	}
	
	public Recipe getRecipe(Integer id) {
		Optional<Recipe> recipe = this.recipeRepository.findById(id);
		if (recipe.isPresent()) {
			return recipe.get();
		} else {
			throw new DataNotFoundException("question not found");
		}
	}
	
	@Autowired
	public RecipeService(RecipeRepository recipeRepository) {
		this.recipeRepository = recipeRepository;
	}
	
	@Transactional
    public void saveRecipe(Recipe recipe) {
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe object must not be null");
        }

        // 데이터 유효성 검사 예시
        if (recipe.getName() == null || recipe.getName().isEmpty()) {
            throw new IllegalArgumentException("Recipe name must not be empty");
        }


        recipeRepository.save(recipe);
    }
}
