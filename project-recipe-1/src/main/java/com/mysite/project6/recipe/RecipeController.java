package com.mysite.project6.recipe;

import java.io.IOException;
import java.util.List;

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
  
  
  //이미지 파일 업로드 처리
  @PostMapping("/recipes/upload-photos")
  public ResponseEntity<List<Image>> uploadPhotos(@RequestParam("file") List<MultipartFile> files) {
      try {
          // 각 파일을 Image 엔티티로 변환하여 저장
          for (MultipartFile file : files) {
              byte[] photoData = file.getBytes();
              Image image = new Image(photoData, null); // Recipe는 나중에 설정
              imageRepository.save(image);
          }
      } catch (IOException e) {
          return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // 저장된 이미지 목록을 반환
      List<Image> savedImages = imageRepository.findAll();
      return new ResponseEntity<>(savedImages, HttpStatus.OK);
  }
}

