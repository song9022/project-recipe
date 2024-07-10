package com.mysite.project6.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @PostMapping("/users/signup")
    public ResponseEntity<String> signUp(@RequestBody UserDto userDto) {
        // 사용자 정보를 받아와서 저장하는 로직
        try {
            User newUser = new User();
            newUser.setUsername(userDto.getUsername());
            newUser.setPassword(userDto.getPassword());
            newUser.setEmail(userDto.getEmail());
            
            // 다른 필드들도 필요에 따라 추가할 수 있습니다.

            userRepository.save(newUser);

            return ResponseEntity.ok("회원가입이 성공적으로 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("회원가입 중 오류가 발생하였습니다.");
        }
    }
    
}
