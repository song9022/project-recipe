import React, { useEffect, useState } from 'react';
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
  RecipeInfo,
  CommentsSection,
  CommentForm,
  CommentInput,
  CommentButton,
  CommentList,
  CommentItem
} from '../styles/RecipeDetail';
import { FaThumbsUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const RecipeDetail = () => {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [cookingSteps, setCookingSteps] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipe(data);

        
        // Fetch ingredients using the ingredients.href
        const ingredientsResponse = await fetch(data._links.ingredients.href);
        if (!ingredientsResponse.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const ingredientsData = await ingredientsResponse.json();
        setIngredients(ingredientsData._embedded.ingredients);
        
        const cookingStepsResponse = await fetch(data._links.cookingSteps.href);
        if (!cookingStepsResponse.ok) {
          throw new Error('Failed to fetch cooking steps');
        }
        const cookingStepsData = await cookingStepsResponse.json();
        setCookingSteps(cookingStepsData._embedded.cookingSteps);

    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

    fetchRecipe();
  }, [id]);


  console.log(recipe)
  console.log(cookingSteps)
  console.log(ingredients)

  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('작성자1');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (editingCommentId !== null) {
      setComments(comments.map(comment => 
        comment.id === editingCommentId ? { ...comment, text: editingCommentText } : comment
      ));
      setEditingCommentId(null);
      setEditingCommentText('');
    } else {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        author: commentAuthor
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
      setCommentAuthor(`작성자${comments.length + 2}`);
    }
  };

  const handleCommentEdit = (id, text) => {
    setEditingCommentId(id);
    setEditingCommentText(text);
  };

  const handleCommentDelete = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <RecipeDetailPage>
      <RecipeTitle>{recipe.name}</RecipeTitle>
      <RecipeImage src={recipe.image} alt={recipe.name} />
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
        <p><strong>요리 정보:</strong> {recipe.introduction}</p>
      </RecipeInfo>
      <RecipeSection>
        <h3>작성자: {recipe.author}</h3>
        <p>{recipe.description}</p>
      </RecipeSection>
      <RecipeContent>
         <h3>재료</h3>
         <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.amount} {ingredient.ingredient}
            </li>
          ))}
        </ul>
  <h3>요리 순서</h3>
  <ol>
    {cookingSteps.map((step, index) => (
      <li key={index}>
        <strong>Step {step.stepNumber}:</strong> {step.description}
      </li>
    ))}
  </ol>
      </RecipeContent>
      <CommentsSection>
        <h3>댓글</h3>
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput
            type="text"
            placeholder="댓글을 입력하세요..."
            value={editingCommentId !== null ? editingCommentText : newComment}
            onChange={(e) => editingCommentId !== null ? setEditingCommentText(e.target.value) : setNewComment(e.target.value)}
            required
          />
          <CommentButton type="submit">{editingCommentId !== null ? '수정' : '입력'}</CommentButton>
        </CommentForm>    
      </CommentsSection>
    </RecipeDetailPage>
  );
};


//     <CommentList>
    //       {comments.map((comment) => (
    //         <CommentItem key={comment.id}>
    //           <p><strong>{comment.author}</strong>: {comment.text}</p>
    //           <div>
    //             <CommentButton onClick={() => handleCommentEdit(comment.id, comment.text)}>수정</CommentButton>
    //             <CommentButton onClick={() => handleCommentDelete(comment.id)}>삭제</CommentButton>
    //           </div>
    //         </CommentItem>
    //       ))}
    //     </CommentList>

export default RecipeDetail;
