import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Write.css";

export default function Editform({ userData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = !userData ? alert("로그인을 해주세요") : userData.id;

  const [images, setImages] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [cookingSteps, setCookingSteps] = useState([]);
  const [recipe, setRecipe] = useState({
    name: "",
    introduction: "",
    category: "",
    amount: "",
    time: "",
    level: "",
    user: userId,
    cookingSteps: [],
    ingredients: [],
  });

  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8024/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipe(data);

        console.log("확인")
        console.log(data.ingredients)

        // const ingredientsResponse = await fetch(data.ingredients);
        // if (!ingredientsResponse.ok) {
        //   throw new Error("Failed to fetch ingredients");
        // }
        // const ingredientsData = await ingredientsResponse.json();
        // setIngredients(ingredientsData._embedded.ingredients);

        setIngredients(data.ingredients)

        // const cookingStepsResponse = await fetch(data._links.cookingSteps.href);
        // if (!cookingStepsResponse.ok) {
        //   throw new Error("Failed to fetch cooking steps");
        // }
        // const cookingStepsData = await cookingStepsResponse.json();
        // setCookingSteps(cookingStepsData._embedded.cookingSteps);

        setCookingSteps(data.cookingSteps)

        // const imagesResponse = await fetch(data._links.photos.href);
        // if (!imagesResponse.ok) {
        //   throw new Error("Failed to fetch images");
        // }
        // const imagesData = await imagesResponse.json();
        // setImages(imagesData._embedded.photos);

        setImages(data.photos)

      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const recipeChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const ingredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [e.target.name]: e.target.value,
    };
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredient: "", amount: "" }
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const stepChange = (index, e) => {
    const newSteps = [...cookingSteps];
    newSteps[index] = { ...newSteps[index], [e.target.name]: e.target.value };
    setCookingSteps(newSteps);
  };

  const handleAddStep = () => {
    setCookingSteps([
      ...cookingSteps,
      { stepNumber: cookingSteps.length + 1, description: "" }
    ]);
  };

  const handleRemoveStep = (index) => {
    const newSteps = cookingSteps.filter((_, i) => i !== index);
    setCookingSteps(newSteps);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipe", JSON.stringify(recipe)); // 레시피 데이터 추가

    // 새로운 이미지 파일 추가
    images.forEach((image) => {
        formData.append("images", image); // 새로운 이미지 파일 추가
    });

    fetch(`http://localhost:8024/api/recipes/${id}`, {
        method: "PUT",
        body: formData
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to update recipe");
        }
        return response.json(); // 서버에서 Recipe를 정상적으로 받으면 JSON으로 파싱
    })
    .then((data) => {
        console.log("Recipe updated:", data);
        navigate("/mypage"); // 수정 후 페이지 이동
    })
    .catch((err) => console.error("Failed to update recipe:", err));
};


      //   fetch(`http://localhost:8024/api/recipes/${id}`, {
      //     method: "PUT",
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(recipe) // 서버에서 Recipe를 기대하므로, JSON.stringify(recipe)를 사용
      // })
      // .then((response) => {
      //     if (!response.ok) {
      //         throw new Error("Failed to update recipe");
      //     }
      //     return response.json(); // 서버에서 Recipe를 정상적으로 받으면 JSON으로 파싱
      // })
      // .then((data) => {
      //     console.log("Recipe updated:", data);
      //     navigate("/mypage"); // 수정 후 페이지 이동
      // })
      // .catch((err) => console.error("Failed to update recipe:", err));
      // };


  const handleCancel = () => {
    navigate("/mypage"); // 취소 버튼 클릭 시 이동할 페이지로 이동
  };

  return (
    <div className="write-page">
      <h2>글 작성</h2>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <div className="form-group">
          <label>레시피 제목:</label>
          <input name="name" value={recipe.name} onChange={recipeChange} />
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
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            multiple
          />
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
          {ingredients.map((ingredient, index) => (
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
          {cookingSteps.map((step, index) => (
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
  );
}
