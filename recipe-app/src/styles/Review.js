import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ReviewPage = styled.div`
  padding: 20px;
`;

export const ReviewButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #93A9D1;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReviewItem = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
`;

export const ReviewLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 5px 0 0;
  }
`;
