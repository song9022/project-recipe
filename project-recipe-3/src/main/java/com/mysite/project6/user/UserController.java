package com.mysite.project6.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        // 사용자 정보를 받아와서 저장하는 로직
        try {
            User newUser = new User();
            newUser.setUserID(user.getUserID());
            newUser.setUsername(user.getUsername());
            newUser.setPassword(user.getPassword());
            newUser.setEmail(user.getEmail());
            
            // 다른 필드들도 필요에 따라 추가할 수 있습니다.

            userRepository.save(newUser);

            return ResponseEntity.ok("회원가입이 성공적으로 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("회원가입 중 오류가 발생하였습니다.");
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        // Update fields
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        // Update other fields as needed

        // Save updated user
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
    
}
