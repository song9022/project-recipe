// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import rankings from '../data/data';
// import '../styles/Category.css';

// const Ranking = () => {

//   const [recipes, setRecipes] = useState([]); // 상태로 레시피 데이터를 관리합니다.
//   const [images, setImages] = useState([]);

//     const fetchData = () => {
//       fetch('http://localhost:8080/api/recipes')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => setRecipes(data._embedded.recipes))
//       .catch(error => {
//         console.error('Error fetching recipes:', error);
//       })
//     }

//     useEffect(()=>{
//       fetchData()
//     },[])

//   console.log(recipes)

//   const imageGet = () =>{
//     const imagesResponse = fetch("http://localhost:8080/api/photos/2");
//           if (!imagesResponse.ok) {
//             throw new Error("Failed to fetch images");
//           }
//           const imagesData = imagesResponse.json();
//           setImages(imagesData._embedded.photos);
//   }

//   useEffect(()=>{
//     imageGet()
//   },[])

//   console.log(images)


//   return (
//     <div className="category-page">
//       <h2>랭킹 페이지</h2>
//       <div className="category-list">
//       {recipes.map((post) => {
//         const match = post._links.self.href.match(/\d+$/);
//         const id = match ? parseInt(match[0], 10) : null;

//         return (
//           <div key={id} className="category-item">
//             <Link to={`/Recipedetail/${id}`}>
//               <img src={post.image} alt={post.name} className="category-image" />
//             </Link>
//             <div className="category-details">
//               <h3>{post.name}</h3>
//               <p>작성자: {post.author}</p>
//               <p>좋아요: {post.good}</p>
//             </div>
//           </div>
//         )})}
//       </div>
//     </div>
//   );
// };

// export default Ranking;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Category.css';

const Ranking = () => {
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesResponse = await axios.get('http://localhost:8080/api/recipes');
        if (!recipesResponse.data) {
          throw new Error('Failed to fetch recipes');
        }
        setRecipes(recipesResponse.data._embedded.recipes);

        // 각 레시피의 이미지 가져오기
        const imageRequests = recipesResponse.data._embedded.recipes.map(recipe =>
          axios.get(`http://localhost:8080/api/photos/${recipe.id}`)
        );
        const imageResponses = await axios.all(imageRequests);
        const imageData = imageResponses.reduce((acc, response, index) => {
          const recipeId = recipesResponse.data._embedded.recipes[index].id;
          acc[recipeId] = response.data._embedded.photos;
          return acc;
        }, {});
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="category-page">
      <h2>랭킹 페이지</h2>
      <div className="category-list">
        {recipes.map(post => {
          const id = post.id;
          const recipeImages = images[id] || [];

          return (
            <div key={id} className="category-item">
              <Link to={`/Recipedetail/${id}`}>
                {recipeImages.length > 0 && (
                  <img src={`http://localhost:8080${recipeImages[0].photo}`} alt={post.name} className="category-image" />
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
