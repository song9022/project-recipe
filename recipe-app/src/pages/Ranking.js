import React from 'react';
import { Link } from 'react-router-dom';
import rankings from '../data/data';
import '../styles/Category.css';

const Ranking = () => {
  return (
    <div className="category-page">
      <h2>랭킹 페이지</h2>
      <div className="category-list">
        {rankings.map((post) => (
          <div key={post.id} className="category-item">
            <Link to={`/Recipedetail/${post.id}`}>
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

export default Ranking;
