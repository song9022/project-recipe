package com.mysite.project6;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import com.mysite.project6.cookingstep.CookingStep;
import com.mysite.project6.cookingstep.CookingStepRepository;
import com.mysite.project6.ingredient.Ingredient;
import com.mysite.project6.ingredient.IngredientRepository;
import com.mysite.project6.recipe.Recipe;
import com.mysite.project6.recipe.RecipeRepository;

@SpringBootTest
class ProjectRecipe1ApplicationTests {

	@Autowired
	private RecipeRepository recipeRepository;
	
	@Autowired
	private IngredientRepository ingredientRepository;
	
	@Autowired 
	private CookingStepRepository cookingStepRepository;
	
	@Test
	void contextLoads() {
		
//		Recipe recipe = new Recipe("짬뽕", null, "짬뽕입니다", "중식", 3, 30, "중", null);
//		recipeRepository.save(recipe);
		
//		Recipe recipe = new Recipe("우동", null, "우동입니다", "일식", 3, 30, "하", null);
//		recipeRepository.save(recipe);
//		
//		Ingredient ingredient = new Ingredient("면", "1팩", recipe);
//		
//		Recipe recipe = new Recipe();
//		recipe.setName("우동");
//		recipe.setPhoto(null);
//		recipe.setIntroduction("우동입니다");
//		recipe.setCategory("일식");
//		recipe.setAmount(2);
//		recipe.setTime(20);
//		recipe.setLevel("하");
//		recipe.setUser(null);
//		
		
//		CookingStep cookingStep = new CookingStep(1, "안녕하세요", recipe);
//		cookingStepRepository.save(cookingStep);
		
		Optional<Recipe> oi = this.recipeRepository.findById(102);
		assertTrue(oi.isPresent());
		Recipe r = oi.get();
		
		Ingredient i = new Ingredient();
		i.setAmount("조금");
		i.setIngredient("간장");
		i.setRecipe(r);
		this.ingredientRepository.save(i);
//		
//		Optional<Recipe> oc = this.recipeRepository.findById(52);
//		assertTrue(oc.isPresent());
//		Recipe r = oc.get();
//		
//		CookingStep c = new CookingStep();
//		c.setDescription("푹 익혀주세요");
//		c.setStepNumber(1);
//		c.setRecipe(r);
//		this.cookingStepRepository.save(c);
//		
//		assertEquals(3, this.recipeRepository.count());
//		Optional<Recipe> or = this.recipeRepository.findById(52);
//		assertTrue(or.isPresent());
//		Recipe r = or.get();
//		this.recipeRepository.delete(r);
//		assertEquals(1, this.recipeRepository.count());
		
//		Optional<Ingredient> oi = this.ingredientRepository.findById(52);
//		assertTrue(oi.isPresent());
//		Ingredient i = oi.get();
//		this.ingredientRepository.delete(i);
	}
	
//	@Test
//	void put() {
//		//소유자 객체를 추가하고 데이터베이스에 저장
//		Owner owner1=new Owner();
//		owner1.setFirstname("John");
//		owner1.setLastname("Johnson");
//		Owner owner2=new Owner();
//		owner2.setFirstname("Mary");
//		owner2.setLastname("Robinson");
//		//여러 엔티티를 저장하는 saveAll메서드
//		oRepository.saveAll(Arrays.asList(owner1,owner2));
//		//자동차 객체를 추가하고 소유자와 연결한 후 데이터베이스에 저장
//		Car car1=new Car(
//				"Ford","Mustang","Red",
//				"ADF-1121",2021,59000,owner1);
//		Car car2=new Car(
//				"Nissan","Leaf","White",
//				"SSJ-3002",2019,29000,owner2);
//		Car car3=new Car(
//				"Toyota","Prius","Silver",
//				"KKO-0212",2020,39000,owner2);
//		cRepository.saveAll(Arrays.asList(car1,car2,car3));
//		
//		for(Car car:cRepository.findAll()) {
//			log.info(car.toString());
////			System.out.println(car);
//		}
//	}

}
