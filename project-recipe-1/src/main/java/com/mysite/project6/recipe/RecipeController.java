package com.mysite.project6.recipe;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.image.Image;
import com.mysite.project6.image.ImageRepository;
import com.mysite.project6.image.ImageService;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.ingredient.IngredientRepository;
import com.mysite.project6.user.User;
import com.mysite.project6.user.UserRepository;
import com.mysite.project6.user.UserService;

import jakarta.validation.Valid;

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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

	@Autowired
	private RecipeRepository recipeRepository;

	@Autowired
	private RecipeService recipeService;

	@Autowired
	private IngredientRepository ingredientRepository;

	@Autowired
	private CookingStepRepository cookingStepRepository;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private UserRepository userRepository;

	// 사진과 함께 레시피 생성
//	@PostMapping("/recipes/add")
//	public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
//
//		// 재료들이 속한 레시피를 설정
//		List<Ingredient> ingredients = recipe.getIngredients();
//		if (ingredients != null) {
//			for (Ingredient ingredient : ingredients) {
//				ingredient.setRecipe(recipe);
//			}
//		}
//
//		// 요리 단계들이 속한 레시피를 설정
//		List<CookingStep> cookingSteps = recipe.getCookingSteps();
//		if (cookingSteps != null) {
//			for (CookingStep step : cookingSteps) {
//				step.setRecipe(recipe);
//			}
//		}
//
//		// 사진들이 속한 레시피를 설정
//		List<Image> images = recipe.getImages();
//		if (images != null) {
//			for (Image image : images) {
//				image.setRecipe(recipe);
//			}
//		}
//
//		Recipe savedRecipe = recipeRepository.save(recipe);
//		return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
//	}

	// 사진과 함께 레시피 저장
	@PostMapping("/recipes/add")
	public ResponseEntity<Recipe> createRecipe(@RequestPart("recipe") @Valid Recipe recipe,
			@RequestPart(value = "file", required = false) MultipartFile file) {
		Recipe savedRecipe = recipeService.saveRecipe(recipe, file);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
	}

//	// 이미지 업로드
//    @PostMapping("/recipes/{id}/upload-image")
//    public ResponseEntity<String> uploadRecipeImage(@PathVariable Integer id,
//                                                    @RequestParam("file") MultipartFile file) {
//        imageService.uploadRecipeImage(id, file);
//        return ResponseEntity.ok("Image uploaded successfully");
//    }
	// 이미지 파일 업로드 처리
//	@PostMapping("/recipes/upload-photos")
//	public ResponseEntity<List<Image>> uploadPhotos(@RequestParam("file") List<MultipartFile> files,
//			@RequestParam("id") Integer recipeId) {
//		try {
//			Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
//			if (!recipeOptional.isPresent()) {
//				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//			}
//			Recipe recipe = recipeOptional.get();
//
//			List<Image> savedImages = new ArrayList<>();
//
//			for (MultipartFile file : files) {
//				byte[] imageData = file.getBytes();
//				Image image = new Image(imageData, recipe); // 레시피 설정
//				imageRepository.save(image);
//				savedImages.add(image);
//			}
//
//			// 저장된 이미지 목록을 반환
//			return new ResponseEntity<>(savedImages, HttpStatus.OK);
//		} catch (IOException e) {
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

//	// 이미지 파일 업로드 처리
//	@PostMapping("/images/upload")
//	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
//	    if (!file.isEmpty()) {
//	        try {
//	            byte[] bytes = file.getBytes();
//	            // 파일 저장 로직
//	            // 예: Files.write(Paths.get("파일경로"), bytes);
//	            return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
//	        } catch (IOException e) {
//	            return new ResponseEntity<>("Failed to upload file", HttpStatus.INTERNAL_SERVER_ERROR);
//	        }
//	    } else {
//	        return new ResponseEntity<>("File is empty", HttpStatus.BAD_REQUEST);
//	    }
//	}

//	@PostMapping("/recipes/add")
//    public ResponseEntity<Recipe> createRecipeWithImage(@RequestPart("recipe") Recipe recipe,
//                                                        @RequestPart(value = "file", required = false) MultipartFile file) {
//        try {
//            Recipe savedRecipe = recipeService.saveRecipeWithImage(recipe, file);
//            return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @PostMapping("/recipes/upload-photos")
//    public ResponseEntity<List<Image>> uploadPhotos(@RequestParam("files") List<MultipartFile> files,
//                                                    @RequestParam("recipeId") Integer recipeId) {
//        try {
//            List<Image> savedImages = recipeService.saveRecipeImages(files, recipeId);
//            return new ResponseEntity<>(savedImages, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//	@PostMapping("/recipes/{recipeId}/like")
//	public ResponseEntity<String> likeRecipe(@PathVariable Integer recipeId, @RequestParam Long userId) {
//		Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
//		if (recipeOptional.isPresent()) {
//			Recipe recipe = recipeOptional.get();
//			Optional<User> userOptional = userRepository.findById(userId);
//			if (userOptional.isPresent()) {
//				User user = userOptional.get();
//				recipe.getLikedByUsers().add(user);
//				user.getLikedRecipes().add(recipe);
//				recipeRepository.save(recipe);
//				userRepository.save(user);
//				return new ResponseEntity<>("Recipe liked successfully", HttpStatus.OK);
//			} else {
//				return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
//			}
//		} else {
//			return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
//		}
//	}
//
//	@PostMapping("/recipes/{recipeId}/unlike")
//	public ResponseEntity<String> unlikeRecipe(@PathVariable Integer recipeId, @RequestParam Long userId) {
//		Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
//		if (recipeOptional.isPresent()) {
//			Recipe recipe = recipeOptional.get();
//			Optional<User> userOptional = userRepository.findById(userId);
//			if (userOptional.isPresent()) {
//				User user = userOptional.get();
//				recipe.getLikedByUsers().remove(user);
//				user.getLikedRecipes().remove(recipe);
//				recipeRepository.save(recipe);
//				userRepository.save(user);
//				return new ResponseEntity<>("Recipe unliked successfully", HttpStatus.OK);
//			} else {
//				return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
//			}
//		} else {
//			return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
//		}
//	}

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

	private UserService userService;

	// 좋아요 기능
	@GetMapping("/like/{id}")
	public ResponseEntity<?> recipelike(Principal principal, @PathVariable("id") Integer id) {
		if (principal == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must be logged in to vote.");
		}

		try {
			Recipe recipe = this.recipeService.getRecipe(id);
			User user = this.userService.getUser(principal.getName());

			if (recipe == null || user == null) {
				throw new IllegalArgumentException("Invalid question ID or user.");
			}

			this.recipeService.like(recipe, user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while processing your vote.");
		}

		return ResponseEntity.ok("Vote registered successfully");
	}

	// 레시피 수정
	@Autowired
	public RecipeController(RecipeService recipeService) {
		this.recipeService = recipeService;
	}

	@GetMapping("/api/recipes/{id}")
	public ResponseEntity<RecipeForm> getRecipe(@PathVariable("id") Integer id) {
		Recipe recipe = this.recipeService.getRecipe(id);

		if (recipe == null) {
			return ResponseEntity.notFound().build();
		}

		RecipeForm recipeForm = new RecipeForm();
		recipeForm.setName(recipe.getName());
		recipeForm.setIntroduction(recipe.getIntroduction());

		return ResponseEntity.ok(recipeForm);
	}

	@PostMapping("/api/recipes/modify/{id}")
	public ResponseEntity<?> modifyRecipe(@PathVariable("id") Integer id, @RequestBody RecipeForm recipeForm) {
		Recipe recipe = this.recipeService.getRecipe(id);

		if (recipe == null) {
			return ResponseEntity.notFound().build();
		}

		recipe.setName(recipeForm.getName());
		recipe.setIntroduction(recipeForm.getIntroduction());
		this.recipeService.saveRecipe(recipe, null);

		return ResponseEntity.ok("Recipe modified successfully");
	}

}
