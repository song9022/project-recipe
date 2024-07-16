package com.mysite.project6.user;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.mysite.project6.comment.Comment;
import com.mysite.project6.recipe.Recipe;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties("defaultReference")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique=true)
	private String userID;
	
	@Column(unique=true)
	private String username;
	
	private String password;
	
	@Column(unique = true)
	private String email;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Recipe> recipes = new ArrayList<>();
	
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
//    private List<Comment> comments = new ArrayList<>();

	public User(String userID, String username, String password, String email, List<Recipe> recipes) {
		super();
		this.userID = userID;
		this.username = username;
		this.password = password;
		this.email = email;
		this.recipes = recipes;
	}
	
	 public User(int id) {
	        this.id = (long) id; // int 타입을 long 타입으로 변환하여 필드에 설정
	    }
	
}
