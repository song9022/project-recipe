import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Write.css";

const Write = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    introduction: "",
    category: "",
    amount: "",
    time: "",
    level: "",
    cookingSteps: [],
    ingredients: [], // ingredients를 배열로 관리
  });

  console.log(recipe);

  const recipeChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // 레시피에 재료 추가
  const ingredientChange = (index, e) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [e.target.name]: e.target.value,
    };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  // recipe.ingredient에 배열 추가
  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { ingredient: "", amount: "" }],
    });
  };

  // recipe.ingredient에 생성된 배열 삭제하기
  const handleRemoveIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  // 레시피에 순서 추가
  const stepChange = (index, e) => {
    const newSteps = [...recipe.cookingSteps];
    newSteps[index] = { ...newSteps[index], [e.target.name]: e.target.value };
    setRecipe({ ...recipe, cookingSteps: newSteps });
  };

  // recipe.cookingSteps에 배열 추가
  const handleAddStep = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      cookingSteps: [
        ...prevRecipe.cookingSteps,
        { stepNumber: prevRecipe.cookingSteps.length + 1, description: "" },
      ],
    }));
  };

  const handleRemoveStep = (index) => {
    console.log(recipe.cookingSteps);
    const newSteps = recipe.cookingSteps.filter((_, i) => i !== index);
    setRecipe({ ...recipe, cookingSteps: newSteps });
  };

  const handleSave = () => {
    console.log(recipe);
    fetch("http://localhost:8080/recipes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Recipe saved:", data);
        // 저장 후 필요한 동작 수행
      })
      .then(() => {
        navigate("/category");
      })
      .catch((err) => console.error("Failed to save recipe:", err));
  };

  // 회원 데이터베이스가 되면 추가
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/category");
  };

  return (
    <div className="write-page">
      <h2>글 작성</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="form-group">
          <label>레시피 제목:</label>
          <input name="name" value={recipe.name} onChange={recipeChange} />
        </div>
        <div className="form-group">
          <label>작성자:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>요리 소개:</label>
          <textarea
            name="introduction"
            value={recipe.introduction}
            onChange={recipeChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>요리 대표 사진:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="이미지 URL을 입력하세요"
            // required
          />
        </div>
        <div className="form-group">
          <label>카테고리:</label>
          <input
            placeholder="Category"
            name="category"
            value={recipe.category}
            onChange={recipeChange}
          />
        </div>
        <div className="form-group">
          {/* 단어 변경 필요 */}
          <label>몇 인분:</label>
          <input
            placeholder="Amount"
            name="amount"
            value={recipe.amount}
            onChange={recipeChange}
          />
        </div>
        <div className="form-group">
          <label>요리 시간:</label>
          <input
            placeholder="Time"
            name="time"
            value={recipe.time}
            onChange={recipeChange}
          />
        </div>
        <div className="form-group">
          <label>요리 수준:</label>
          <input
            placeholder="Level"
            name="level"
            value={recipe.level}
            onChange={recipeChange}
          />
        </div>

        <div className="form-group">
          <label>재료:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                placeholder="Ingredient Name"
                name="ingredient"
                value={ingredient.ingredient}
                onChange={(e) => ingredientChange(index, e)}
              />
              <input
                placeholder="Amount"
                name="amount"
                value={ingredient.amount}
                onChange={(e) => ingredientChange(index, e)}
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
              >
                삭제
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            재료 추가
          </button>
        </div>
        <div className="form-group">
          <label>요리 순서:</label>
          {recipe.cookingSteps.map((step, index) => (
            <div key={index}>
              <input
                name="stepNumber"
                defaultValue={(step.stepNumber = index + 1)}
                // onChange={(e) => stepChange(index, e)}
              />
              <input
                placeholder="description"
                name="description"
                value={step.description}
                onChange={(e) => stepChange(index, e)}
              />
              <button type="button" onClick={() => handleRemoveStep(index)}>
                삭제
              </button>
            </div>
          ))}

          <button type="button" onClick={handleAddStep}>
            순서 추가
          </button>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            작성 완료
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
