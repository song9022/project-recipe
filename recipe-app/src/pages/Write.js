import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Write.css';

const Write = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState(''); // 난이도 상태 추가
  const [info, setInfo] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      id: Date.now(), // 임시 ID
      title,
      author,
      description,
      image,
      category,
      level, // 난이도 추가
      info,
      ingredients: ingredients.split('\n'),
      steps: steps.split('\n'),
    };

    fetch('http://localhost:5000/rankings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    }).then(() => {
      navigate('/category');
    });
  };

  const handleCancel = () => {
    navigate('/category');
  };

  return (
    <div className="write-page">
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>레시피 제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>작성자:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>요리 소개:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>요리 대표 사진:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="이미지 URL을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label>카테고리:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">카테고리를 선택하세요</option>
            <option value="한식">한식</option>
            <option value="일식">일식</option>
            <option value="중식">중식</option>
            <option value="양식">양식</option>
          </select>
        </div>
        <div className="form-group">
          <label>난이도:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} required>
            <option value="">난이도를 선택하세요</option>
            <option value="상">상</option>
            <option value="중">중</option>
            <option value="하">하</option>
          </select>
        </div>
        <div className="form-group">
          <label>요리 정보:</label>
          <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>재료:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="각 재료를 줄바꿈으로 구분하여 입력하세요"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>요리 순서:</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="각 순서를 줄바꿈으로 구분하여 입력하세요"
            required
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">작성 완료</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default Write;
