import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import rankings from '../data/data';
import { 
  RecipeDetailPage, 
  RecipeTitle, 
  RecipeImage, 
  RecipeContent, 
  RecipeSection, 
  LikeButton,
  ButtonGroup,
  BookmarkButton,
  RecipeInfo 
} from '../styles/RecipeDetail';
import { FaThumbsUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = rankings.find((recipe) => recipe.id === parseInt(id));

  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <RecipeDetailPage>
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <ButtonGroup>
        <LikeButton onClick={handleLikeClick}>
          <FaThumbsUp /> {likes}
        </LikeButton>
        <BookmarkButton onClick={handleBookmarkClick}>
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </BookmarkButton>
      </ButtonGroup>
      <RecipeInfo>
        <p><strong>카테고리:</strong> {recipe.category}</p>
        <p><strong>난이도:</strong> {recipe.level}</p>
        <p><strong>요리 정보:</strong> {recipe.info}</p>
      </RecipeInfo>
      <RecipeSection>
        <h3>작성자: {recipe.author}</h3>
        <p>{recipe.description}</p>
      </RecipeSection>
      <RecipeContent>
        <h3>재료</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>요리 순서</h3>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </RecipeContent>
    </RecipeDetailPage>
  );
};

export default RecipeDetail;
