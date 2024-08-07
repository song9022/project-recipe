package com.mysite.project6.recipe;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mysite.project6.answer.Answer;
import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.image.Image;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Recipe {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    
    private String name;            // 요리 이름
    
//    @Lob
//    private byte[] photo;           // 요리 사진 (이미지 파일의 바이트 배열)
    
    @Column(columnDefinition = "TEXT")
    private String introduction;    // 요리 소개
    
    private String category;        // 요리 카테고리
    
    private Integer amount;         // 요리 몇 인분인지
    
    private Integer time;           // 요리에 걸리는 시간
    
    private String level;          // 요리 난이도
    
//    @JsonIgnore
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CookingStep> cookingSteps = new ArrayList<>();
//    
//    @JsonIgnore
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Ingredient> ingredients = new ArrayList<>();
    
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();
    
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Answer> answers = new ArrayList<>();
   
 // 기본 생성자 
    public Recipe() {
    }
    
    // 생성자
    public Recipe(String name, String introduction, String category, Integer amount, Integer time, String level) {
        this.name = name;
        this.introduction = introduction;
        this.category = category;
        this.amount = amount;
        this.time = time;
        this.level = level;
    }
    
    
    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonBackReference
    private User user;	//레시피는 한 사용자 한테만 종속됨
    
    @ManyToMany(mappedBy = "likedRecipes")
    private Set<User> likedByUsers = new HashSet<>();
    
    @ManyToMany(mappedBy = "bookmarks")
    private Set<User> bookmarkedByUsers = new HashSet<>();
}

