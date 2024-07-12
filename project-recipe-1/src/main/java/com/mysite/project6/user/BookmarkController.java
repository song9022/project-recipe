package com.mysite.project6.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mysite.project6.recipe.Recipe;
import com.mysite.project6.recipe.RecipeRepository;

@RestController
public class BookmarkController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RecipeRepository recipeRepository;

	@PostMapping("/bookmarks/add")
	public ResponseEntity<Void> addBookmark(@RequestParam Long userId, @RequestParam Long recipeId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
		Recipe recipe = recipeRepository.findById(recipeId)
				.orElseThrow(() -> new IllegalArgumentException("Recipe not found"));

		user.getBookmarks().add(recipe);
		userRepository.save(user);

		return ResponseEntity.ok().build();
	}

	@PostMapping("/bookmarks/remove")
	public ResponseEntity<Void> removeBookmark(@RequestParam Long userId, @RequestParam Long recipeId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
		Recipe recipe = recipeRepository.findById(recipeId)
				.orElseThrow(() -> new IllegalArgumentException("Recipe not found"));

		user.getBookmarks().remove(recipe);
		userRepository.save(user);

		return ResponseEntity.ok().build();
	}
}
