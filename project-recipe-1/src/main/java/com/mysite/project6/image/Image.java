package com.mysite.project6.image;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mysite.project6.recipe.Recipe;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
//	@Lob
//	@Column(name = "image", length = 1048576)
//	private byte[] image;
   
	private String imagePath; // 이미지 파일의 경로

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="recipe_id")
	@JsonBackReference
	private Recipe recipe;
	
	// 기본 생성자
    public Image() {
    }

 // 생성자
    public Image(String imagePath) {
        this.imagePath = imagePath;
    }
}
