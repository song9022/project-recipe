import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ReviewWritePage, 
  ReviewForm, 
  ReviewInput, 
  ReviewTextarea, 
  ReviewButton, 
  ReviewButtonContainer 
} from '../styles/ReviewWrite';

const ReviewWrite = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 리뷰 데이터를 저장하는 로직을 추가합니다. 예: API 호출
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('content', content);

    // 예시로, formData를 서버로 전송하는 로직을 작성합니다.
    // fetch('http://localhost:5000/reviews', {
    //   method: 'POST',
    //   body: formData,
    // }).then(() => {
    //   navigate('/review');
    // });

    console.log({ title, image, content });
    navigate('/review');
  };

  return (
    <ReviewWritePage>
      <h2>🍳 후기란</h2>
      <p>직접 만들어본 요리의 후기를 작성해 보세요.</p>
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
          <label>이미지 업로드:</label>
          <ReviewInput 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            required 
          />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
        </div>
        <div>
          <label>내용:</label>
          <ReviewTextarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <ReviewButtonContainer>
          <ReviewButton type="submit">작성</ReviewButton>
        </ReviewButtonContainer>
      </ReviewForm>
    </ReviewWritePage>
  );
};

export default ReviewWrite;
