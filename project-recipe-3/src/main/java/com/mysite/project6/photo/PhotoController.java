package com.mysite.project6.photo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.recipe.Recipe;
import com.mysite.project6.recipe.RecipeRepository;
import com.mysite.project6.user.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PhotoController {

	@Autowired
	private RecipeRepository recipeRepository;
	
	@Value("${file.upload.path}")
	private String filepath;
	
	@Autowired
	private PhotoRepository photoRepository;
	
//	@PostMapping("/recipes/add")
//    public ResponseEntity<Recipe> addRecipe(@RequestBody Recipe recipe) {
//        Recipe savedRecipe = recipeRepository.save(recipe);
//        return ResponseEntity.ok().body(savedRecipe);
//    }
//	
//	@PostMapping("/recipes/upload")
//    public ResponseEntity<List<Photo>> uploadFile(@RequestParam(value = "file") MultipartFile[] files,
//    		@RequestParam("recipe") String recipeJson) {
//		
//		Recipe recipe = convertJsonToRecipe(recipeJson); // JSON을 Recipe 객체로 변환
//        
//		if (recipe == null) {
//            throw new RuntimeException("Recipe data is invalid");
//        }
//		
//		List<Photo> entities = new ArrayList<>();
//        for (MultipartFile file : files) {
//            String fileName = generateFileName(Objects.requireNonNull(file.getOriginalFilename()));
//            saveFile(file, fileName);
//
//            Photo photo = new Photo();
//            photo.setPhoto(filepath + fileName); // 파일 경로 설정
//            photo.setRecipe(recipe);
//            entities.add(photo);
//        }
//
//        List<Photo> savedPhotos = photoRepository.saveAll(entities);
//
//        recipe.getPhotos().addAll(savedPhotos);
//        recipeRepository.save(recipe);
//
//        return ResponseEntity.ok().body(savedPhotos);
//    }
	
	@PostMapping("/recipes/add")
	@Transactional
	public ResponseEntity<Recipe> addRecipe(@RequestParam(value = "files") MultipartFile[] files,
	        @RequestParam("recipe") String recipeJson) {
	    
	    // Convert JSON to Recipe object
	    Recipe recipe = convertJsonToRecipe(recipeJson);
	    
	    if (recipe == null) {
	        throw new RuntimeException("Recipe data is invalid");
	    }
	    
	    List<Photo> entities = new ArrayList<>();
	    for (MultipartFile file : files) {
	        String fileName = generateFileName(Objects.requireNonNull(file.getOriginalFilename()));
	        saveFile(file, fileName);

	        Photo photo = new Photo();
	        photo.setPhoto(filepath + fileName); // 파일 경로 설정
	        photo.setRecipe(recipe);
	        entities.add(photo);
	    }

	    List<Photo> savedPhotos = photoRepository.saveAll(entities);

	    // Set photos to recipe
	    recipe.getPhotos().addAll(savedPhotos);

	    // Set ingredients to recipe
	    List<Ingredient> ingredients = recipe.getIngredients();
	    if (ingredients != null) {
	        for (Ingredient ingredient : ingredients) {
	            ingredient.setRecipe(recipe);
	        }
	    }

	    // Set cooking steps to recipe
	    List<CookingStep> cookingSteps = recipe.getCookingSteps();
	    if (cookingSteps != null) {
	        for (CookingStep step : cookingSteps) {
	            step.setRecipe(recipe);
	        }
	    }

	    // Set user to recipe
	    User user = recipe.getUser();
	    recipe.setUser(user);

	    // Save recipe
	    Recipe savedRecipe = recipeRepository.save(recipe);

	    return ResponseEntity.ok().body(savedRecipe);
	}


	
	private String generateFileName(String originalFileName) {
	    int lastIndexOfDot = originalFileName.lastIndexOf(".");
	    String name = originalFileName.substring(0, lastIndexOfDot);
	    // 확장자
	    String extension = originalFileName.substring(lastIndexOfDot);
	    int fileNumber = 1;
	    // 이름 중복 시 증가할 순번
	    String fileSequence = "";
	    while (new File(filepath + name + fileSequence + extension).exists()) {
	        fileSequence = "(" + fileNumber + ")";
	        fileNumber++;
	    }
	    return name + fileSequence + extension;
	}
	
	private void saveFile(MultipartFile file, String fileName) {
	    File targetFile = new File(filepath + fileName);
	    try {
	        file.transferTo(targetFile);
	    } catch (IOException e) {
	        throw new RuntimeException("File not saved");
	    }
	}
	
	private Recipe convertJsonToRecipe(String recipeJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Recipe recipe = objectMapper.readValue(recipeJson, Recipe.class);
            return recipe;
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert JSON to Recipe", e);
        }
    }
}
