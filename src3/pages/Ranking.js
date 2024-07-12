import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import rankings from '../data/data';
import '../styles/Category.css';

const Ranking = () => {

  const [recipes, setRecipes] = useState([]); // 상태로 레시피 데이터를 관리합니다.

    const fetchData = () => {
      fetch('http://localhost:8080/api/recipes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRecipes(data._embedded.recipes))
      .catch(error => {
        console.error('Error fetching recipes:', error);
      })
    }

    useEffect(()=>{
      fetchData()
    },[])

  console.log(recipes)

  return (
    <div className="category-page">
      <h2>랭킹 페이지</h2>
      <div className="category-list">
      {recipes.map((post) => {
        const match = post._links.self.href.match(/\d+$/);
        const id = match ? parseInt(match[0], 10) : null;

        return (
          <div key={id} className="category-item">
            <Link to={`/Recipedetail/${id}`}>
              <img src={post.image} alt={post.name} className="category-image" />
            </Link>
            <div className="category-details">
              <h3>{post.name}</h3>
              <p>작성자: {post.author}</p>
              <p>좋아요: {post.good}</p>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Ranking;
