import React, { useState } from 'react';
import axios from 'axios';

const SearchRecipes = () => {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        axios.get(`http://localhost:8080/api/recipes/search?kw=${keyword}`)
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('Error searching recipes:', error);
            });
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.map(recipe => (
                    <li key={recipe.id}>
                        <p>{recipe.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchRecipes;
