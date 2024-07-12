// import React, { useState } from 'react';
// import axios from 'axios';

// const SearchRecipes = () => {
//     const [keyword, setKeyword] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     const handleSearch = () => {
//         axios.get(`http://localhost:8080/api/recipes/search?kw=${keyword}`)
//             .then(response => {
//                 setSearchResults(response.data);
//             })
//             .catch(error => {
//                 console.error('Error searching recipes:', error);
//             });
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={keyword}
//                 onChange={(e) => setKeyword(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//             <ul>
//                 {searchResults.map(recipe => (
//                     <li key={recipe.id}>
//                         <p>{recipe.name}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SearchRecipes;

import React, { useState } from "react";
import axios from "axios";

export default function SearchRecipes() {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("name"); // 기본적으로는 레시피 이름으로 검색

  const handleSearch = () => {
    axios
      .get(
        `http://localhost:8080/api/recipes/search?keyword=${keyword}&searchType=${searchType}`
      )
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error searching recipes:", error);
      });
  };

  console.log(keyword);

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="name">Recipe Name</option>
        <option value="ingredient">Ingredient Name</option>
      </select>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((recipe) => (
          <li key={recipe.id}>
            <p>{recipe.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
