import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Category.css';

const Ranking = () => {
  const [recipes, setRecipes] = useState([]); // 레시피 데이터 상태
  const [images, setImages] = useState([]); // 이미지 데이터 상태

  useEffect(() => {
    // 레시피 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/recipes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data._embedded.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData(); // 컴포넌트가 마운트될 때 데이터를 가져옴
  }, []);

  useEffect(() => {
    // 이미지 데이터를 가져오는 함수
    const fetchImages = async () => {
      try {
        const imageResponses = await Promise.all(
          recipes.map(async post => {
            const match = post._links.self.href.match(/\d+$/);
            const id = match ? parseInt(match[0], 10) : null;
            const response = await fetch(`http://localhost:8080/api/recipes/${id}/photos`);
            if (!response.ok) {
              throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            return data._embedded.photos[0]; // 첫 번째 이미지만 사용
          })
        );
        setImages(imageResponses);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (recipes.length > 0) {
      fetchImages(); // recipes 상태가 변경될 때마다 이미지를 가져옴
    }
  }, [recipes]);


  return (
    <div className="category-page">
      <h2>랭킹 페이지</h2>
      <div className="category-list">
        {recipes.map((post, index) => {
          const match = post._links.self.href.match(/\d+$/);
          const id = match ? parseInt(match[0], 10) : null;
          const filename = images[index] ? images[index].photo.substring(images[index].photo.lastIndexOf("/") + 1) : '';

          return (
            <div key={id} className="category-item">
              <Link to={`/Recipedetail/${id}`}>
                {images.length > 0 && images[index] && (
                  <img src={`/static/files/${encodeURIComponent(filename)}`} alt={post.name} className="category-image" />
                )}
              </Link>
              <div className="category-details">
                <h3>{post.name}</h3>
                <p>작성자: {post.author}</p>
                <p>좋아요: {post.good}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ranking;

