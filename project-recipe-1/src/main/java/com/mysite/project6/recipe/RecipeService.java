package com.mysite.project6.recipe;

import com.mysite.project6.DataNotFoundException;
import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.image.Image;
import com.mysite.project6.image.ImageService;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.user.User;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final ImageService imageService;
    private static String UPLOADED_FOLDER = "C://temp//"; // 저장될 경로 설정

    
    public void like(Recipe recipe, User user) {
        recipe.getLikedByUsers().add(user);
        recipeRepository.save(recipe);
    }

    public Recipe getRecipe(Integer id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Recipe not found with id: " + id));
    }

    @Transactional
    public Recipe saveRecipe(Recipe recipe, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            try {
                // 이미지를 서버에 업로드
                String filename = UUID.randomUUID().toString() + ".jpg";
                Path path = Paths.get(UPLOADED_FOLDER + filename);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                // 이미지 객체를 생성하여 리스트에 추가
                Image image = new Image(filename); // Image 클래스에 맞게 생성자를 수정해야 할 수 있습니다.
                image.setRecipe(recipe); // 이미지가 어떤 레시피에 속하는지 설정
                
                // 레시피에 이미지 추가
                recipe.getImages().add(image);

            } catch (IOException e) {
                throw new RuntimeException("Failed to save image", e);
            }
        }

        // 기타 필요한 처리
        return recipeRepository.save(recipe);
    }

    public List<Image> saveRecipeImages(List<MultipartFile> files, Integer recipeId) {
        Recipe recipe = getRecipe(recipeId);
        return imageService.saveImages(files, recipe);
    }

    private void validateRecipe(Recipe recipe) {
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe object must not be null");
        }

        if (recipe.getName() == null || recipe.getName().isEmpty()) {
            throw new IllegalArgumentException("Recipe name must not be empty");
        }
    }

    private void setRecipeRelationships(Recipe recipe) {
        List<Ingredient> ingredients = recipe.getIngredients();
        if (ingredients != null) {
            ingredients.forEach(ingredient -> ingredient.setRecipe(recipe));
        }

        List<CookingStep> cookingSteps = recipe.getCookingSteps();
        if (cookingSteps != null) {
            cookingSteps.forEach(step -> step.setRecipe(recipe));
        }
    }

    private void saveImageForRecipe(Recipe recipe, MultipartFile file) {
        try {
            String imagePath = "C:\\juni\\repository\\image\\" + file.getOriginalFilename(); // 이미지 파일 경로 설정
            imageService.saveImage(imagePath, recipe); // 이미지 서비스를 통해 이미지 저장
        } catch (Exception e) {
            throw new RuntimeException("Failed to save image for recipe", e);
        }
    }
}
