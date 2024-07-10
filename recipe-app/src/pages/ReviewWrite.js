import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ReviewWritePage, 
  ReviewForm, 
  ReviewInput, 
  ReviewTextarea, 
  ReviewButton 
} from '../styles/ReviewWriteStyles';

const ReviewWrite = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 리뷰 데이터를 저장하는 로직을 추가합니다. 예: API 호출
    console.log({ title, image, content });
    navigate('/review');
  };

  return (
    <ReviewWritePage>
      <h2>리뷰 작성</h2>
      <ReviewForm onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <ReviewInput 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>이미지 URL:</label>
          <ReviewInput 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>내용:</label>
          <ReviewTextarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <ReviewButton type="submit">작성</ReviewButton>
      </ReviewForm>
    </ReviewWritePage>
  );
};

export default ReviewWrite;
