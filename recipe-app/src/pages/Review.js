import React from 'react';
import { Link } from 'react-router-dom';
import rankings from '../data/data';
import './Ranking.css';

const Review = () => {
  return (
    <div className="ranking-page">
      <h2>후기 페이지</h2>
      <div className="ranking-list">
        {rankings.map((post) => (
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

export default Review;
