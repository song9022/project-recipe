import React from 'react';
import { useParams } from 'react-router-dom';
import reviews from '../data/reviews';
import {
  ReviewDetailPage,
  ReviewTitle,
  ReviewContent,
} from '../styles/ReviewDetail';

const ReviewDetail = () => {
  const { id } = useParams();
  const review = reviews.find((review) => review.id === parseInt(id));

  if (!review) {
    return <div>Review not found</div>;
  }

  return (
    <ReviewDetailPage>
      <ReviewTitle>{review.title}</ReviewTitle>
      <p>작성자: {review.author}</p>
      <p>작성일: {review.date}</p>
      <ReviewContent>{review.content}</ReviewContent>
    </ReviewDetailPage>
  );
};

export default ReviewDetail;
