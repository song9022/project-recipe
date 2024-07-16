// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   WritePage,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Textarea,
//   Select,
//   FormButtons,
//   SubmitButton,
//   CancelButton,
//   FormRow,
//   AddButton,
//   RemoveButton,
// } from "../styles/Write";

// export default function Write({ userData }) {
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const userId = !userData ? alert("로그인을 해주세요") : userData.id;

//   const [recipe, setRecipe] = useState({
//     name: "",
//     introduction: "",
//     category: "",
//     amount: "",
//     time: "",
//     level: "",
//     user: userId,
//     cookingSteps: [],
//     ingredients: [],
//   });

//   const recipeChange = (e) => {
//     setRecipe({ ...recipe, [e.target.name]: e.target.value });
//   };

//   const ingredientChange = (index, e) => {
//     const newIngredients = [...recipe.ingredients];
//     newIngredients[index] = {
//       ...newIngredients[index],
//       [e.target.name]: e.target.value,
//     };
//     setRecipe({ ...recipe, ingredients: newIngredients });
//   };

//   const handleAddIngredient = () => {
//     setRecipe({
//       ...recipe,
//       ingredients: [...recipe.ingredients, { ingredient: "", amount: "" }],
//     });
//   };

//   const handleRemoveIngredient = (index) => {
//     const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
//     setRecipe({ ...recipe, ingredients: newIngredients });
//   };

//   const stepChange = (index, e) => {
//     const newSteps = [...recipe.cookingSteps];
//     newSteps[index] = { ...newSteps[index], [e.target.name]: e.target.value };
//     setRecipe({ ...recipe, cookingSteps: newSteps });
//   };

//   const handleAddStep = () => {
//     setRecipe((prevRecipe) => ({
//       ...prevRecipe,
//       cookingSteps: [
//         ...prevRecipe.cookingSteps,
//         { stepNumber: prevRecipe.cookingSteps.length + 1, description: "" },
//       ],
//     }));
//   };

//   const handleRemoveStep = (index) => {
//     const newSteps = recipe.cookingSteps.filter((_, i) => i !== index);
//     setRecipe({ ...recipe, cookingSteps: newSteps });
//   };

//   const handleSave = () => {
//     fetch("http://localhost:8080/recipes/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(recipe),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Recipe saved:", data);
//       })
//       .then(() => {
//         navigate("/category");
//       })
//       .catch((err) => console.error("Failed to save recipe:", err));
//   };

//   const handleCancel = () => {
//     navigate("/category");
//   };

//   return (
//     <WritePage>
//       <h2>글 작성</h2>
//       <Form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSave();
//         }}
//       >
//         <FormGroup>
//           <Label>레시피 제목:</Label>
//           <Input name="name" value={recipe.name} onChange={recipeChange} />
//         </FormGroup>
//         <FormGroup>
//           <Label>요리 소개:</Label>
//           <Textarea
//             name="introduction"
//             value={recipe.introduction}
//             onChange={recipeChange}
//           ></Textarea>
//         </FormGroup>
//         <FormGroup>
//           <Label>카테고리:</Label>
//           <Select
//             name="category"
//             value={recipe.category}
//             onChange={recipeChange}
//             required
//           >
//             <option value="">카테고리를 선택하세요</option>
//             <option value="한식">한식</option>
//             <option value="일식">일식</option>
//             <option value="중식">중식</option>
//             <option value="양식">양식</option>
//           </Select>
//         </FormGroup>
//         <FormGroup>
//           <Label>요리 수준:</Label>
//           <Select
//             name="level"
//             value={recipe.level}
//             onChange={recipeChange}
//             required
//           >
//             <option value="">요리 수준을 선택하세요</option>
//             <option value="상">상</option>
//             <option value="중">중</option>
//             <option value="하">하</option>
//           </Select>
//         </FormGroup>
//         <FormGroup>
//           <Label>몇 인분:</Label>
//           <Input
//             placeholder="Amount"
//             name="amount"
//             value={recipe.amount}
//             onChange={recipeChange}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label>요리 시간:</Label>
//           <Input
//             placeholder="Time"
//             name="time"
//             value={recipe.time}
//             onChange={recipeChange}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label>재료:</Label>
//           {recipe.ingredients.map((ingredient, index) => (
//             <FormRow key={index}>
//               <Input
//                 placeholder="Ingredient Name"
//                 name="ingredient"
//                 value={ingredient.ingredient}
//                 onChange={(e) => ingredientChange(index, e)}
//               />
//               <Input
//                 placeholder="Amount"
//                 name="amount"
//                 value={ingredient.amount}
//                 onChange={(e) => ingredientChange(index, e)}
//               />
//               <RemoveButton
//                 type="button"
//                 onClick={() => handleRemoveIngredient(index)}
//               >
//                 삭제
//               </RemoveButton>
//             </FormRow>
//           ))}
//           <AddButton type="button" onClick={handleAddIngredient}>
//             재료 추가
//           </AddButton>
//         </FormGroup>
//         <FormGroup>
//           <Label>요리 순서:</Label>
//           {recipe.cookingSteps.map((step, index) => (
//             <FormRow key={index}>
//               <Input
//                 name="stepNumber"
//                 defaultValue={(step.stepNumber = index + 1)}
//               />
//               <Input
//                 placeholder="description"
//                 name="description"
//                 value={step.description}
//                 onChange={(e) => stepChange(index, e)}
//               />
//               <RemoveButton
//                 type="button"
//                 onClick={() => handleRemoveStep(index)}
//               >
//                 삭제
//               </RemoveButton>
//             </FormRow>
//           ))}
//           <AddButton type="button" onClick={handleAddStep}>
//             순서 추가
//           </AddButton>
//         </FormGroup>
//         <FormButtons>
//           <SubmitButton type="submit">작성 완료</SubmitButton>
//           <CancelButton type="button" onClick={handleCancel}>
//             취소
//           </CancelButton>
//         </FormButtons>
//       </Form>
//     </WritePage>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Write.css";

export default function Write({ userData }) {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const userId = !userData ? alert("로그인을 해주세요") : userData.id;

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

  const recipeChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    //const file = e.target.files[0];
    const files = Array.from(e.target.files)
    setImages(files);
  };

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

  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`files`, image); // 사진 파일 추가
    });
    //formData.append("file", image); // 사진 파일 추가
    formData.append("recipe", JSON.stringify(recipe)); // 레시피 데이터 추가

    fetch("http://localhost:8080/recipes/add", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Recipe saved:", data);
        // 저장 후 필요한 동작 수행
        navigate("/mypage"); // 저장 후 페이지 이동
      })
      .catch((err) => console.error("Failed to save recipe:", err));
  };

  const handleCancel = () => {
    navigate("/mypage"); // 취소 버튼 클릭 시 이동할 페이지로 이동
  };

  return (
    <>
      <div className="write-page">
        <h2>글 작성</h2>
        <form onSubmit={handleSave} encType="multipart/form-data">
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
