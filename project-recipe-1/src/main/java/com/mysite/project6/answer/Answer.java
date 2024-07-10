package com.mysite.project6.answer;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mysite.project6.recipe.Recipe;
import com.mysite.project6.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Answer {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(columnDefinition = "TEXT")
	private String content;	//댓글
	
	private LocalDateTime createDate;	//댓글 단 날짜
	
	@ManyToOne
    @JoinColumn(name="recipe_id")
    @JsonBackReference
    private Recipe recipe;
	
	@ManyToOne
	@JoinColumn(name="user_id")
    @JsonBackReference
	private User author;
	
	private LocalDateTime modifyDate;	//댓글 수정 날짜
	
	@ManyToMany(mappedBy = "likedAnswers")
    private Set<User> likedByUsers = new HashSet<>();
	
	// 기본 생성자 
    public Answer() {
    }

    // 생성자
    public Answer(String content, LocalDateTime createDate, Recipe recipe, User author) {
        this.content = content;
        this.createDate = createDate;
        this.recipe = recipe;
        this.author = author;
    }
}
