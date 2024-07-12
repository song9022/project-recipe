import React from 'react';
import { Link } from 'react-router-dom';
import rankings from '../data/data';
import {
  RankingPage,
  RankingList,
  RankingItem,
  RankingImage,
  RankingDetails
} from '../styles/Ranking';
import { FaThumbsUp} from 'react-icons/fa';

const Ranking = () => {
  return (
    <RankingPage>
      <h2>랭킹 페이지</h2>
      <RankingList>
        {rankings.map((post) => (
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
    </RankingPage>
  );
};

export default Ranking;
