import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import rankings from '../data/data';
import './Ranking.css';

const Category = ({ searchQuery }) => {
  const [filteredRecipes, setFilteredRecipes] = useState(rankings);

  useEffect(() => {
    if (searchQuery) {
      setFilteredRecipes(
        rankings.filter(recipe =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredRecipes(rankings);
    }
  }, [searchQuery]);

  return (
    <div className="ranking-page">
      <h2>분류 페이지</h2>
      <div className="ranking-list">
        {filteredRecipes.map((post) => (
          <div key={post.id} className="ranking-item">
            <Link to={`/ranking/${post.id}`}>
              <img src={post.image} alt={post.title} className="ranking-image" />
            </Link>
            <div className="ranking-details">
              <h3>{post.title}</h3>
              <p>작성자: {post.author}</p>
              <p>별점: {post.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
