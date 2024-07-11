import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import rankings from '../data/data';
import '../styles/Category';

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
    <div className="category-page">
      <h2>분류 페이지</h2>
      <div className="category-list">
        {filteredRecipes.map((post) => (
          <div key={post.id} className="category-item">
            <Link to={`/category/${post.id}`}>
              <img src={post.image} alt={post.title} className="category-image" />
            </Link>
            <div className="category-details">
              <h3>{post.title}</h3>
              <p>작성자: {post.author}</p>
              <p>좋아요: {post.good}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
