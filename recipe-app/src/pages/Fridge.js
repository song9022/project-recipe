import React from 'react';
import { Link } from 'react-router-dom';
import fridge from '../data/data';
import '../styles/Fridge.css';

const Fridge = () => {
  return (
    <div className="fridge-page">
      <h2>냉장고 털이 페이지</h2>
      <div className="fridge-list">
        {fridge.map((post) => (
          <div key={post.id} className="fridge-item">
            <Link to={`/fridge/${post.id}`}>
              <img src={post.image} alt={post.title} className="ranking-image" />
            </Link>
            <div className="fridge-details">
              <h3>{post.title}</h3>
              <p>작성자: {post.author}</p>
              <p>별점: {post.good}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fridge;
