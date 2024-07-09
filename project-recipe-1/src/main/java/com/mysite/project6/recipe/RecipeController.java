package com.mysite.project6.recipe;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.ingredient.IngredientRepository;

//@RestController
//@RequestMapping("/recipes")
//public class RecipeController {
//
//    @Autowired
//    private RecipeRepository recipeRepository;
//    
//    @PostMapping
//    @CrossOrigin(origins = "http://localhost:3000")
//    public Recipe createRecipe(@RequestBody Recipe recipe) {
//    	
//    		for (Ingredient ingredient : recipe.getIngredients()) {
//                ingredient.setRecipe(recipe);
//    		}
//    	
//        
//        return recipeRepository.save(recipe);
//    }
//}

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return recipeRepository.save(recipe);
    }
    
}

