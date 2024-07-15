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
  RecipeInfo,
  CommentsSection,
  CommentForm,
  CommentInput,
  CommentButton,
  CommentList,
  CommentItem,
  CommentButtonGroup,
  EditButton
} from '../styles/RecipeDetail';
import { FaThumbsUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = rankings.find((recipe) => recipe.id === parseInt(id));

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

  const handleEditPost = () => {
    // 여기에 게시글 수정 로직을 추가합니다.
    alert('게시글 수정 기능이 구현되었습니다.');
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
      <EditButton onClick={handleEditPost}>게시글 수정</EditButton>
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
              <CommentButtonGroup>
                <CommentButton onClick={() => handleCommentEdit(comment.id, comment.text)}>수정</CommentButton>
                <CommentButton onClick={() => handleCommentDelete(comment.id)}>삭제</CommentButton>
              </CommentButtonGroup>
            </CommentItem>
          ))}
        </CommentList>
      </CommentsSection>
    </RecipeDetailPage>
  );
};

export default RecipeDetail;
