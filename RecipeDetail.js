import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const RecipeDetail = ({ setIsLoggedIn, setUserData, userData }) => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [cookingSteps, setCookingSteps] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

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

        // Fetch comments for the recipe
        const commentsResponse = await fetch(`http://localhost:8080/api/comments/recipe/${id}`);
        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleLikeClick = () => {
    // Implement like functionality
    // For demonstration purposes, let's keep it empty for now
  };

  const handleBookmarkClick = () => {
    // Implement bookmark functionality
    // For demonstration purposes, let's keep it empty for now
  };

  console.log(recipe)
  console.log(userData)

  const handleCommentSubmit = async (e) => {
    // 로그인 후 댓글 가능
    if(userData === "") {
      alert("로그인 후 이용가능합니다.")
      return
    }
    // 작성자를 저장하여 수정 가능 여부에 사용
    setCommentAuthor(userData.username)

    console.log(commentAuthor)

    e.preventDefault();

    if (editingCommentId !== null) {
      // If editing existing comment
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${editingCommentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: editingCommentText }),
        });
        if (!response.ok) {
          throw new Error('Failed to update comment');
        }
        const updatedComment = await response.json();
        setComments(comments.map(comment =>
          comment.id === editingCommentId ? { ...comment, text: updatedComment.text } : comment
        ));
        setEditingCommentId(null);
        setEditingCommentText('');
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    } else {
      // If adding new comment
      try {
        const response = await fetch(`http://localhost:8080/api/comments/recipe/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newComment, name: commentAuthor }),
        });
        if (!response.ok) {
          throw new Error('Failed to create comment');
        }
        const newCommentObj = await response.json();
        setComments([...comments, newCommentObj]);
        setNewComment('');
        // setCommentAuthor(`작성자${comments.length + 2}`);
      } catch (error) {
        console.error('Error creating comment:', error);
      }
    }
  };

  const handleCommentEdit = (id, text) => {
    // Set editing state for comment
    setEditingCommentId(id);
    setEditingCommentText(text);
  };

  const handleCommentDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/comments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
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
          <FaThumbsUp /> 0
        </LikeButton>
        <BookmarkButton onClick={handleBookmarkClick}>
          <FaRegBookmark />
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
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <p><strong>{comment.author}</strong>: {comment.text}</p>
              <div>
                <CommentButton onClick={() => handleCommentEdit(comment.id, comment.text)}>수정</CommentButton>
                <CommentButton onClick={() => handleCommentDelete(comment.id)}>삭제</CommentButton>
              </div>
            </CommentItem>
          ))}
        </CommentList>
      </CommentsSection>
    </RecipeDetailPage>
  );
};

export default RecipeDetail;
