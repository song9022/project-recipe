package com.mysite.project6.recipe;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.ingredient.IngredientRepository;
import com.mysite.project6.photo.Photo;
import com.mysite.project6.photo.PhotoRepository;
import com.mysite.project6.user.User;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/recipes")
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
	@GetMapping("/search")
	public List<Recipe> searchRecipes(@RequestParam String keyword, @RequestParam String searchType) {
		if ("name".equals(searchType)) {
			return recipeRepository.findByNameContainingIgnoreCase(keyword);
		} else if ("ingredient".equals(searchType)) {
			return recipeRepository.findByIngredientContaining(keyword);
		} else {
			throw new IllegalArgumentException("Invalid search type: " + searchType);
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Recipe> getRecipeById(@PathVariable Integer id) {
	    Recipe recipe = recipeRepository.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Recipe not found with id: " + id));
	    
	    return ResponseEntity.ok(recipe);
	}
	
	@GetMapping("/{id}/user")
	public ResponseEntity<User> getUserByRecipeId(@PathVariable Integer id) {
	    Recipe recipe = recipeRepository.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Recipe not found with id: " + id));

	    // 레시피에서 사용자 정보를 가져오는 예시 코드
	    User user = recipe.getUser();  // 예시: 레시피가 사용자를 가지고 있다고 가정

	    if (user == null) {
	        throw new EntityNotFoundException("User not found for recipe with id: " + id);
	    }

	    return ResponseEntity.ok(user);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Recipe> updateRecipe(
	        @PathVariable Integer id,
	        @RequestParam(value = "images", required = false) MultipartFile[] images,
	        @RequestParam("recipe") String recipeJson
	) throws JsonMappingException, JsonProcessingException {
	    try {
	        // JSON 문자열을 Recipe 객체로 변환
	        ObjectMapper objectMapper = new ObjectMapper();
	        Recipe updatedRecipe = objectMapper.readValue(recipeJson, Recipe.class);

	        Recipe existingRecipe = recipeRepository.findById(id)
	                .orElseThrow(() -> new EntityNotFoundException("Recipe not found with id: " + id));

	        // 업데이트할 필드 설정
	        existingRecipe.setName(updatedRecipe.getName());
	        existingRecipe.setIntroduction(updatedRecipe.getIntroduction());
	        existingRecipe.setCategory(updatedRecipe.getCategory());
	        existingRecipe.setAmount(updatedRecipe.getAmount());
	        existingRecipe.setTime(updatedRecipe.getTime());
	        existingRecipe.setLevel(updatedRecipe.getLevel());
	        // 필요에 따라 다른 필드들도 업데이트

	        // 기존의 이미지 데이터 삭제
	        existingRecipe.getPhotos().clear(); // 기존의 모든 이미지를 삭제

	        // 새로운 이미지 데이터 추가
	        if (images != null) {
	            for (MultipartFile image : images) {
	                String photoFileName = image.getOriginalFilename();
	                Photo photo = new Photo(photoFileName, existingRecipe); // Photo 엔티티 생성
	                // 필요한 처리 수행 (예: 파일 저장 등)
	                existingRecipe.getPhotos().add(photo); // 새로운 이미지를 추가
	            }
	        }

	        Recipe savedRecipe = recipeRepository.save(existingRecipe);
	        return ResponseEntity.ok(savedRecipe);
	    } catch (EntityNotFoundException e) {
	        return ResponseEntity.notFound().build();
	    }
	}

// 	private RecipeService recipeService;
// 	private UserService userService;

}
