import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CategoryPage,
  Filters,
  FilterGroup,
  FilterGroupTitle,
  FilterGroupLabel,
  FilterGroupInput,
  FilterGroupRow,
  RankingList,
  RankingItem,
  RankingImage,
  RankingDetails
} from '../styles/Category';
import rankings from '../data/data';
import { FaThumbsUp } from 'react-icons/fa';

const Category = ({ searchQuery }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
  };

  const handleLevelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLevels([...selectedLevels, value]);
    } else {
      setSelectedLevels(selectedLevels.filter((level) => level !== value));
    }
  };

  const filteredRankings = rankings.filter((post) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(post.category);
    const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(post.level);
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && levelMatch && searchMatch;
  });

  return (
    <CategoryPage>
      <h2>🍳 레시피 분류</h2>
      <p>내가 원하는 레시피를 직접 찾아보세요</p>
      <Filters>
        <FilterGroup>
          <div>
            <FilterGroupTitle>카테고리:</FilterGroupTitle>
            <FilterGroupRow>
              <FilterGroupLabel>
                <FilterGroupInput type="checkbox" value="한식" onChange={handleCategoryChange} /> 한식
              </FilterGroupLabel>
              <FilterGroupLabel>
                <FilterGroupInput type="checkbox" value="일식" onChange={handleCategoryChange} /> 일식
              </FilterGroupLabel>
              <FilterGroupLabel>
                <FilterGroupInput type="checkbox" value="중식" onChange={handleCategoryChange} /> 중식
              </FilterGroupLabel>
              <FilterGroupLabel>
                <FilterGroupInput type="checkbox" value="양식" onChange={handleCategoryChange} /> 양식
              </FilterGroupLabel>
            </FilterGroupRow>
          </div>
          <div>
            <FilterGroupTitle>난이도:</FilterGroupTitle>
            <FilterGroupRow>
              <FilterGroupLabel>
                <FilterGroupInput type="checkbox" value="상" onChange={handleLevelChange} /> 상
              </FilterGroupLabel>
              <FilterGroupLabel>
                <FilterGroupInput type="checkbox" value="중" onChange={handleLevelChange} /> 중
              </FilterGroupLabel>
              <FilterGroupLabel>
                <FilterGroupInput type="checkbox" value="하" onChange={handleLevelChange} /> 하
              </FilterGroupLabel>
            </FilterGroupRow>
          </div>
        </FilterGroup>
      </Filters>
      <RankingList>
        {filteredRankings.map((post) => (
          <RankingItem key={post.id}>
            <Link to={`/Recipedetail/${post.id}`}>
              <RankingImage src={post.image} alt={post.title} />
            </Link>
            <RankingDetails>
              <h3>{post.title}</h3>
              <p>작성자: {post.author}</p>
              <p><FaThumbsUp color='#EC9736' /> {post.good}</p>
            </RankingDetails>
          </RankingItem>
        ))}
      </RankingList>
    </CategoryPage>
  );
};

export default Category;
