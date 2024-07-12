import React from 'react';
import { useParams } from 'react-router-dom';
import reviews from '../data/reviews';
import {
  ReviewDetailPage,
  ReviewTitle,
  ReviewContent,
  ReviewAuthor,
  ReviewDate,
  ReviewPic
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
      <ReviewAuthor>{review.author}</ReviewAuthor>
      <ReviewDate>{review.date}</ReviewDate>
      {review.pic && <ReviewPic src={review.pic} alt={review.title} />}
      <ReviewContent>{review.content}</ReviewContent>
    </ReviewDetailPage>
  );
};

export default ReviewDetail;
