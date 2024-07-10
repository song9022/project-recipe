package com.mysite.project6.answer;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mysite.project6.recipe.Recipe;
import com.mysite.project6.recipe.RecipeRepository;
import com.mysite.project6.user.User;
import com.mysite.project6.user.UserRepository;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class AnswerController {

	@Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private RecipeRepository recipeRepository;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/answers/add")
    public ResponseEntity<Answer> addAnswerToRecipe(@RequestParam Integer recipeId, @RequestParam String content, @RequestParam Long userId) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
        if (recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Answer answer = new Answer();
                answer.setContent(content);
                answer.setCreateDate(LocalDateTime.now());
                answer.setRecipe(recipe);
                answer.setAuthor(user);
                Answer savedAnswer = answerRepository.save(answer);
                return new ResponseEntity<>(savedAnswer, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/answers/{answerId}/like")
    public ResponseEntity<String> likeAnswer(@PathVariable Integer answerId, @RequestParam Long userId) {
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        if (answerOptional.isPresent()) {
            Answer answer = answerOptional.get();
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                answer.getLikedByUsers().add(user);
                user.getLikedAnswers().add(answer);
                answerRepository.save(answer);
                userRepository.save(user);
                return new ResponseEntity<>("Answer liked successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>("Answer not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/answers/{answerId}/unlike")
    public ResponseEntity<String> unlikeAnswer(@PathVariable Integer answerId, @RequestParam Long userId) {
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        if (answerOptional.isPresent()) {
            Answer answer = answerOptional.get();
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                answer.getLikedByUsers().remove(user);
                user.getLikedAnswers().remove(answer);
                answerRepository.save(answer);
                userRepository.save(user);
                return new ResponseEntity<>("Answer unliked successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>("Answer not found", HttpStatus.NOT_FOUND);
        }
    }
}
