import React, { useState } from "react";

export default function Main() {
  const [recipe, setRecipe] = useState({
    name: "",
    introduction: "",
    category: "",
    amount: "",
    time: "",
    level: "",
    ingredients: [] // ingredients를 배열로 관리
  });

  const recipeChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const ingredientChange = (index, e) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [e.target.name]: e.target.value };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
    // const ingredientChange = (index, e) => {
    //     const newIngredients = [...recipe.ingredients];
    //     newIngredients[index] = { ...newIngredients[index], [e.target.name]: e.target.value };
    //     setRecipe(prevRecipe => ({ ...prevRecipe, ingredients: newIngredients }));
    // };
  

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { ingredient: "", amount: "" }]
    });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleSave = () => {
    fetch("http://localhost:8080/recipes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe)
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
