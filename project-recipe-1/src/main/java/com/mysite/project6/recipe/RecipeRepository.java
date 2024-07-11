package com.mysite.project6.recipe;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

//	Page<Recipe> findAll(Pageable pageable);
	Optional<Recipe> findById(Long id);

	// 레시피 제목으로 검색
	List<Recipe> findByNameContainingIgnoreCase(String name);

//    // 레시피 제목 또는 재료로 검색
//    @Query("SELECT DISTINCT r FROM Recipe r LEFT JOIN r.ingredients i WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(i.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
//    List<Recipe> findByNameOrIngredient(@Param("keyword") String keyword);

	// 재료 이름으로 검색
	@Query("SELECT DISTINCT r FROM Recipe r JOIN r.ingredients i WHERE LOWER(i.ingredient) LIKE LOWER(concat('%', :ingredient, '%'))")
	List<Recipe> findByIngredientContaining(@Param("ingredient") String ingredient);
	
	// 레시피 이름 또는 재료 이름으로 검색
    @Query("SELECT DISTINCT r FROM Recipe r LEFT JOIN r.ingredients i WHERE LOWER(r.name) LIKE LOWER(concat('%', :keyword, '%')) OR LOWER(i.ingredient) LIKE LOWER(concat('%', :keyword, '%'))")
    List<Recipe> findByKeyword(@Param("keyword") String keyword);
}
