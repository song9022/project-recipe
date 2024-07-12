import React from "react";

export default function SearchRecipes({ searchResults }) {
    console.log(searchResults)
  return (
    <div>
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
