import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Recommend from '../pages/Recommend';
import Category from '../pages/Category';
import Ranking from '../pages/Ranking';
import RecipeDetail from '../pages/RecipeDetail';
import Review from '../pages/Review';
import ReviewDetail from '../pages/ReviewDetail';
import ReviewWrite from '../pages/ReviewWrite';
import Write from '../pages/Write';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyPage from '../pages/MyPage';
import SearchRecipes from '../pages/SearchRecipes';

const RouterConfig = ({ searchQuery, setIsLoggedIn, isLoggedIn }) => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/recommend" element={<Recommend />} />
    <Route path="/category" element={<Category searchQuery={searchQuery} />} />
    <Route path="/ranking" element={<Ranking />} />
    <Route path="/Recipedetail/:id" element={<RecipeDetail />} />
    <Route path="/review" element={<Review />} />
    <Route path="/review/:id" element={<ReviewDetail />} />
    <Route path="/review/write" element={<ReviewWrite />} />
    <Route path="/write" element={<Write />} />
    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/search-results" element={<SearchRecipes searchQuery={searchQuery} />} /> {/* SearchResults 경로 추가 */}
  </Routes>
);

export default RouterConfig;
