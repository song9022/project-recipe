package com.mysite.project6.user;

import java.util.ArrayList;
import java.util.List;

import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.recipe.Recipe;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique=true)
	private String username;
	
	private String password;
	
	@Column(unique = true)
	private String email;
	
	
}
