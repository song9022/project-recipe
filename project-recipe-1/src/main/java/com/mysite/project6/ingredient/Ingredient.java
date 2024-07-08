package com.mysite.project6.ingredient;

import com.mysite.project6.recipe.Recipe;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    private String ingredient;  // 요리 제료
    
    private String amount;      // 재료 양
    
    @ManyToOne
    private Recipe recipe;      
    
}