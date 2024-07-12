package com.mysite.project6.recipe;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeForm {

	@NotEmpty(message = "이름은 필수항목입니다.")
	@Size(max = 200)
	private String name;

	@NotEmpty(message = "설명은 필수항목입니다.")
	private String introduction;
}
