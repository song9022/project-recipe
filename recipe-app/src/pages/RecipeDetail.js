import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import rankings from '../data/data';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const foundRecipe = rankings.find(r => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="recipe-detail-page">
      {recipe ? (
        <>
          <div className="card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          </div>
          <div className="card">
            <h3>요리 소개</h3>
            <p>{recipe.description}</p>
          </div>
          <div className="card">
            <h3>카테고리</h3>
            <p>{recipe.category}</p>
          </div>
          <div className="card">
            <h3>난이도</h3>
            <p>{recipe.difficulty}</p>
          </div>
          <div className="card">
            <h3>요리 정보</h3>
            <p>{recipe.info}</p>
          </div>
          <div className="card">
            <h3>재료</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>요리 순서</h3>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="card">
            <h3>댓글</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="댓글을 작성하세요"
                required
              ></textarea>
              <button type="submit">댓글 작성</button>
            </form>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetail;
