// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import rankings from '../data/data';
// import '../styles/Category.css';

// const Category = () => {
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedLevels, setSelectedLevels] = useState([]);

//   const handleCategoryChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedCategories([...selectedCategories, value]);
//     } else {
//       setSelectedCategories(selectedCategories.filter((category) => category !== value));
//     }
//   };

//   const handleLevelChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedLevels([...selectedLevels, value]);
//     } else {
//       setSelectedLevels(selectedLevels.filter((level) => level !== value));
//     }
//   };

//   const filteredRankings = rankings.filter((post) => {
//     const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(post.category);
//     const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(post.level);
//     return categoryMatch && levelMatch;
//   });

//   return (
//     <div className="category-page">
//       <h2>분류 페이지</h2>
//       <div className="filters">
//         <div className="filter-group">
//           <h3>카테고리</h3>
//           <label>
//             <input type="checkbox" value="한식" onChange={handleCategoryChange} /> 한식
//           </label>
//           <label>
//             <input type="checkbox" value="일식" onChange={handleCategoryChange} /> 일식
//           </label>
//           <label>
//             <input type="checkbox" value="중식" onChange={handleCategoryChange} /> 중식
//           </label>
//           <label>
//             <input type="checkbox" value="양식" onChange={handleCategoryChange} /> 양식
//           </label>
//         </div>
//         <div className="filter-group">
//           <h3>난이도</h3>
//           <label>
//             <input type="checkbox" value="상" onChange={handleLevelChange} /> 상
//           </label>
//           <label>
//             <input type="checkbox" value="중" onChange={handleLevelChange} /> 중
//           </label>
//           <label>
//             <input type="checkbox" value="하" onChange={handleLevelChange} /> 하
//           </label>
//         </div>
//       </div>
//       <div className="category-list">
//         {filteredRankings.map((post) => (
//           <div key={post.id} className="category-item">
//             <Link to={`/Recipedetail/${post.id}`}>
//               <img src={post.image} alt={post.title} className="category-image" />
//             </Link>
//             <div className="category-details">
//               <h3>{post.title}</h3>
//               <p>작성자: {post.author}</p>
//               <p>별점: {post.good}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Category;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import rankings from '../data/data';
import '../styles/Category';

const Category = ({ searchQuery }) => {
  const [filteredRecipes, setFilteredRecipes] = useState(rankings);

  useEffect(() => {
    if (searchQuery) {
      setFilteredRecipes(
        rankings.filter(recipe =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredRecipes(rankings);
    }
  }, [searchQuery]);

  return (
    <div className="category-page">
      <h2>분류 페이지</h2>
      <div className="category-list">
        {filteredRecipes.map((post) => (
          <div key={post.id} className="category-item">
            <Link to={`/category/${post.id}`}>
              <img src={post.image} alt={post.title} className="category-image" />
            </Link>
            <div className="category-details">
              <h3>{post.title}</h3>
              <p>작성자: {post.author}</p>
              <p>좋아요: {post.good}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;