package com.mysite.project6.recipe;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.ingredient.IngredientRepository;
import com.mysite.project6.user.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;
    
    @Autowired
    private CookingStepRepository cookingStepRepository;

    @PostMapping("/recipes/add")
    @Transactional
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        // 재료들이 속한 레시피를 설정
        List<Ingredient> ingredients = recipe.getIngredients();
        if (ingredients != null) {
            for (Ingredient ingredient : ingredients) {
                ingredient.setRecipe(recipe);
            }
        }
        
        // 요리 단계들이 속한 레시피를 설정
        List<CookingStep> cookingSteps = recipe.getCookingSteps();
        if (cookingSteps != null) {
            for (CookingStep step : cookingSteps) {
                step.setRecipe(recipe);
            }
        }
        
        // user id 설정
        User user = recipe.getUser();
        recipe.setUser(user);
        
        return recipeRepository.save(recipe);
    }
    
}

