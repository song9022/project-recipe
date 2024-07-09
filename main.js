// import * as React from "react";
import {useEffect, useState} from "react";
import Delete from "./delete";

// 게시글 정보
export default function Main () {
  
  // 주소에서 받아오는 데이터를 저장할 변수
  const [recipes, setRecipes] = useState({
    name: "",
    photo: null,
    introduction: "",
    category: "",
    amount: "",
    time: "",
    level: "",
  })
  const [ingredients, setIngredients] = useState([])
  // 최신 10개를 저장할 변수
  // const [latest, setLatest] = useState([])
  let latest = []


  // 주소에 따라 받아올 정보가 달라짐
  // data에 들어올 데이터의 형식이 다르다면 url을 지우고 각각 해당하는 형식으로 여러 함수를 생성해야 함
  const fetchRecipe = (url) => {
    fetch(url)
      .then(Response => Response.json())
      .then(data => setRecipes(data._embedded.recipes))
      .catch(err => console.error(err))
  }

  useEffect(()=>{
     fetchRecipe()
  },[])

  // 최신순으로 10개 저장
  const reverse = () => {
    if(recipes.length > 10) {
      for(let i=1;i>=10;i++) {
        latest[i-1] = recipes[recipes.length-i]
      }
    }

    else if(recipes.length < 10) {
      for(let i=1;i>=recipes.length;i++) {
        latest[i-1] = recipes[recipes.length-i]
      }
    }
  }

  // 로그인시 로그인 관련 데이터가 있는 주소가 있을 것으로 예상됨
  // 클릭시 호출시키는 방식으로 데이터 출력
  const myInfo = () => {
    if("로그인 정보가 null이 아닌 경우") {
      // 내 레시피 화면의 정보가 출력
      fetchRecipe("내 레시피가 있는 주소")
    }
    else {
      alert("로그인 후 이용가능합니다.")
      return "로그인 화면으로 이동"
    }
  }

  // 입력받은 데이터를 변수에 저장
  const recipeChange = (e) => {
    setRecipes({...recipes, [e.target.name]:e.target.value})
  }

  const ingredientChange = (e) => {
    setIngredients({...ingredients, [e.target.name]:e.target.value})
  }

  // 입력받은 정보를 저장할 때
  const handleSave = () => {
    inputRecipe(recipes)
    inputingredients(ingredients)
    console.log(idRepo)
  }

  let idRepo;

  // DB에 입력받은 정보를 보내는 함수
  const inputRecipe = (recipes) => {
    fetch("http://localhost:8080/api/recipes", {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(recipes),
    })
    .then(idRepo = recipes.id)
    .catch(err=>console.error(err))
  }

  const inputingredients = () => {
    fetch("http://localhost:8080/api/ingredients", {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(ingredients),
    })
  }

  // 테이블 형식인 경우
  const columns=[
    {field:"delete", headName:"Delete",
      renderCell:(row)=>
        <Delete
        data={row}
        fetchRecipe={fetchRecipe}
        />
    },

  ]

  return (
    <>
    <form onSubmit={(e)=>{
      e.preventDefault();
    }}>
    <h1>레시피</h1>
    <input placeholder="name" id="name" name="name" value={recipes.name}  onChange={recipeChange}/>
    <input placeholder="introduction" id="introduction" name="introduction" value={recipes.introduction} onChange={recipeChange}/>
    <input placeholder="category" id="category" name="category" value={recipes.category} onChange={recipeChange}/>
    <input placeholder="amount" id="amount" name="amount" value={recipes.amount} onChange={recipeChange}/>
    <input placeholder="time" id="time" name="time" value={recipes.time} onChange={recipeChange}/>
    <input placeholder="level" id="level" name="level" value={recipes.level} onChange={recipeChange}/>
    </form>

    <h1>재료1</h1>
    <input placeholder="ingredient" id="ingredient" name="ingredient" onChange={ingredientChange}/>
    <input placeholder="amount" id="amount" name="amount" onChange={ingredientChange}/>
    {/* <input placeholder="recip" id="amount" name="amount" onChange={ingredientChange}/> */}

    <h1>재료2</h1>
    <input placeholder="ingredient" id="ingredient" name="ingredient" onChange={ingredientChange}/>
    <input placeholder="amount" id="amount" name="amount" onChange={ingredientChange}/>

    <button onClick={handleSave}>save</button>
    </>

  )
}