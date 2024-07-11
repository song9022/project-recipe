package com.mysite.project6.recipe;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.image.Image;
import com.mysite.project6.image.ImageRepository;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.ingredient.IngredientRepository;
import com.mysite.project6.user.User;
import com.mysite.project6.user.UserRepository;

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

//@RestController
//@CrossOrigin(origins = "http://localhost:3000")
//public class RecipeController {
//
//    @Autowired
//    private RecipeRepository recipeRepository;
//
//    @Autowired
//    private IngredientRepository ingredientRepository;
//    
//    @Autowired
//    private CookingStepRepository cookingStepRepository;
//
//    //사진 넣기 전
//    @PostMapping("/recipes/add")
//    public Recipe createRecipe(@RequestBody Recipe recipe) {
//        
//    	
//    	// 재료들이 속한 레시피를 설정
//        List<Ingredient> ingredients = recipe.getIngredients();
//        if (ingredients != null) {
//            for (Ingredient ingredient : ingredients) {
//                ingredient.setRecipe(recipe);
//            }
//        }
//        
//        // 요리 단계들이 속한 레시피를 설정
//        List<CookingStep> cookingSteps = recipe.getCookingSteps();
//        if (cookingSteps != null) {
//            for (CookingStep step : cookingSteps) {
//                step.setRecipe(recipe);
//            }
//        }
//        Recipe savedRecipe = recipeRepository.save(recipe);
//        return recipeRepository.save(recipe);
//    }
//    
//}

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

	@Autowired
	private RecipeRepository recipeRepository;

	@Autowired
	private IngredientRepository ingredientRepository;

	@Autowired
	private CookingStepRepository cookingStepRepository;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private UserRepository userRepository;

//    // 사진이 없는 경우의 레시피 생성
//    @PostMapping("/recipes/add")
//    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
//        
//        // 재료들이 속한 레시피를 설정
//        List<Ingredient> ingredients = recipe.getIngredients();
//        if (ingredients != null) {
//            for (Ingredient ingredient : ingredients) {
//                ingredient.setRecipe(recipe);
//            }
//        }
//        
//        // 요리 단계들이 속한 레시피를 설정
//        List<CookingStep> cookingSteps = recipe.getCookingSteps();
//        if (cookingSteps != null) {
//            for (CookingStep step : cookingSteps) {
//                step.setRecipe(recipe);
//            }
//        }
//
//        Recipe savedRecipe = recipeRepository.save(recipe);
//        return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
//    }

	// 사진과 함께 레시피 생성
	@PostMapping("/recipes/add")
	public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {

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

		// 사진들이 속한 레시피를 설정
		List<Image> images = recipe.getImages();
		if (images != null) {
			for (Image image : images) {
				image.setRecipe(recipe);
			}
		}

		Recipe savedRecipe = recipeRepository.save(recipe);
		return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
	}

	// 이미지 파일 업로드 처리
	@PostMapping("/recipes/upload-photos")
	public ResponseEntity<List<Image>> uploadPhotos(@RequestParam("file") List<MultipartFile> files,
			@RequestParam("recipeId") Integer recipeId) {
		try {
			Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
			if (!recipeOptional.isPresent()) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			Recipe recipe = recipeOptional.get();

			List<Image> savedImages = new ArrayList<>();

			for (MultipartFile file : files) {
				byte[] photoData = file.getBytes();
				Image image = new Image(photoData, recipe); // 레시피 설정
				imageRepository.save(image);
				savedImages.add(image);
			}

			// 저장된 이미지 목록을 반환
			return new ResponseEntity<>(savedImages, HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/recipes/{recipeId}/like")
	public ResponseEntity<String> likeRecipe(@PathVariable Integer recipeId, @RequestParam Long userId) {
		Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
		if (recipeOptional.isPresent()) {
			Recipe recipe = recipeOptional.get();
			Optional<User> userOptional = userRepository.findById(userId);
			if (userOptional.isPresent()) {
				User user = userOptional.get();
				recipe.getLikedByUsers().add(user);
				user.getLikedRecipes().add(recipe);
				recipeRepository.save(recipe);
				userRepository.save(user);
				return new ResponseEntity<>("Recipe liked successfully", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/recipes/{recipeId}/unlike")
	public ResponseEntity<String> unlikeRecipe(@PathVariable Integer recipeId, @RequestParam Long userId) {
		Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
		if (recipeOptional.isPresent()) {
			Recipe recipe = recipeOptional.get();
			Optional<User> userOptional = userRepository.findById(userId);
			if (userOptional.isPresent()) {
				User user = userOptional.get();
				recipe.getLikedByUsers().remove(user);
				user.getLikedRecipes().remove(recipe);
				recipeRepository.save(recipe);
				userRepository.save(user);
				return new ResponseEntity<>("Recipe unliked successfully", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
		}
	}

	
//	// 검색 기능 구현
//	@GetMapping("/api/recipes/search")
//	public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam(value = "kw") String keyword) {
//		List<Recipe> recipes = recipeRepository.findByNameContainingIgnoreCase(keyword);
//		return ResponseEntity.ok(recipes);
//	}
	
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
