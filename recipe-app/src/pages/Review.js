import React from 'react';
import reviews from '../data/reviews';
import {
  ReviewPage,
  ReviewList,
  ReviewItem,
  ReviewButton,
  ReviewButtonContainer,
  ReviewLink,
} from '../styles/Review';

const Review = () => {
  return (
    <ReviewPage>
      <h2>🍳 나의 요리 이야기</h2>
      <p>세상에는 요리한 사람의 수만큼의 새로운 레시피가 존재한다<br/>나의 시도, 나의 레시피, 나의 팁을 공유해 보세요🌭🥞🥟🍙</p>
      <br/>
      <ReviewButtonContainer>
        <ReviewButton to="/review/write">글쓰기</ReviewButton>
      </ReviewButtonContainer>
      <ReviewList>
        {reviews.map((review) => (
          <ReviewItem key={review.id}>
            <ReviewLink to={`/review/${review.id}`}>
              <h3>{review.title}</h3>
              <p>작성자: {review.author}</p>
              <p>작성일: {review.date}</p>
            </ReviewLink>
          </ReviewItem>
        ))}
      </ReviewList>
    </ReviewPage>
  );
};

export default Review;
