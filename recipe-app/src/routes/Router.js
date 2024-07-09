import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Recommend from '../pages/Recommend';
import Category from '../pages/Category';
import Ranking from '../pages/Ranking';
import RecipeDetail from '../pages/RecipeDetail';
import Review from '../pages/Review';
import Write from '../pages/Write';
import Fridge from '../pages/Fridge';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyPage from '../pages/MyPage';

const RouterConfig = ({ searchQuery, setIsLoggedIn, isLoggedIn }) => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/recommend" element={<Recommend />} />
    <Route path="/category" element={<Category searchQuery={searchQuery} />} />
    <Route path="/ranking" element={<Ranking />} />
    <Route path="/ranking/:id" element={<RecipeDetail />} />
    <Route path="/review" element={<Review />} />
    <Route path="/write" element={<Write />} />
    <Route path="/fridge" element={<Fridge />} />
    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/mypage" element={<MyPage />} />
  </Routes>
);

export default RouterConfig;
