import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Write.css";

export default function Write({ userData }) {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const userId = !userData ? alert("로그인을 해주세요") : userData.id;
  // // URL에서 숫자 부분 추출
  // const extractUserId = () => {
  //   const match = url.match(/\d+$/);
  //   if (match) {
  //     return parseInt(match[0], 10); // 정수로 변환하여 반환
  //   } else {
  //     return null; // 매치되는 부분이 없으면 null 반환
  //   }
  // };

  console.log("userid", userId);
  console.log(typeof userId);

  const [recipe, setRecipe] = useState({
    name: "",
    introduction: "",
    category: "",
    amount: "",
    time: "",
    level: "",
    user: userId,
    // likedUsers: [],
    cookingSteps: [],
    ingredients: [], // ingredients를 배열로 관리
  });

  console.log(typeof recipe.user);

  const recipeChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // };

  const ingredientChange = (index, e) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [e.target.name]: e.target.value,
    };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { ingredient: "", amount: "" }],
    });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const stepChange = (index, e) => {
    const newSteps = [...recipe.cookingSteps];
    newSteps[index] = { ...newSteps[index], [e.target.name]: e.target.value };
    setRecipe({ ...recipe, cookingSteps: newSteps });
  };

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
      .then(() => {
        navigate("/category");
      })
      .catch((err) => console.error("Failed to save recipe:", err));
  };

  const handleCancel = () => {
    navigate("/category");
  };

  return (
    <>
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
          {/*<div className="form-group">
          <label>작성자:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>  */}
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
            {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            // required
          /> */}
          </div>
          <div className="form-group">
            <label>카테고리:</label>
            <select
              name="category"
              value={recipe.category}
              onChange={recipeChange}
              required
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="한식">한식</option>
              <option value="일식">일식</option>
              <option value="중식">중식</option>
              <option value="양식">양식</option>
            </select>
          </div>
          <div className="form-group">
            <label>요리 수준:</label>
            <select
              name="level"
              value={recipe.level}
              onChange={recipeChange}
              required
            >
              <option value="">요리 수준을 선택하세요</option>
              <option value="상">상</option>
              <option value="중">중</option>
              <option value="하">하</option>
            </select>
          </div>
          <div className="form-group">
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
    </>
  );
}
