import React, { useState } from "react";

export default function Main2() {
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
      .catch((err) => console.error("Failed to save recipe:", err));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <h1>레시피</h1>
        <input
          placeholder="Name"
          name="name"
          value={recipe.name}
          onChange={recipeChange}
        />
        <input
          placeholder="Introduction"
          name="introduction"
          value={recipe.introduction}
          onChange={recipeChange}
        />
        <input
          placeholder="Category"
          name="category"
          value={recipe.category}
          onChange={recipeChange}
        />
        <input
          placeholder="Amount"
          name="amount"
          value={recipe.amount}
          onChange={recipeChange}
        />
        <input
          placeholder="Time"
          name="time"
          value={recipe.time}
          onChange={recipeChange}
        />
        <input
          placeholder="Level"
          name="level"
          value={recipe.level}
          onChange={recipeChange}
        />
        <h1>순서</h1>
        {recipe.cookingSteps.map((step, index) => (
          <div key={index}>
            <input
              name="stepNumber"
              value={step.stepNumber}
              onChange={(e) => stepChange(index, e)}
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

        <h1>재료</h1>
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
            <button type="button" onClick={() => handleRemoveIngredient(index)}>
              삭제
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          재료 추가
        </button>

        <button type="submit">저장</button>
      </form>
    </>
  );
}
