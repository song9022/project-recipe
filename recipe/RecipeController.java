package com.mysite.project6.recipe;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping("/recipes")
    public ResponseEntity<Recipe> createRecipe(@RequestParam("name") String name,
                                              @RequestParam("photo") MultipartFile photo,
                                              @RequestParam("introduction") String introduction,
                                              @RequestParam("category") String category,
                                              @RequestParam("amount") Integer amount,
                                              @RequestParam("time") Integer time,
                                              @RequestParam("level") String level) {

        byte[] photoBytes = null;
        try {
            photoBytes = photo.getBytes(); // MultipartFile을 byte[]로 변환
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        Recipe newRecipe = new Recipe();
        newRecipe.setName(name);
        newRecipe.setPhoto(photoBytes); // 이미지 바이트 배열 저장
        newRecipe.setIntroduction(introduction);
        newRecipe.setCategory(category);
        newRecipe.setAmount(amount);
        newRecipe.setTime(time);
        newRecipe.setLevel(level);

        // RecipeRepository를 통해 직접 저장소에 저장
        Recipe savedRecipe = recipeRepository.save(newRecipe);

        return ResponseEntity.ok(savedRecipe);
    }

    // 다른 컨트롤러 메서드들...
}
