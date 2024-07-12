import styled from 'styled-components';

export const ReviewDetailPage = styled.div`
  padding: 20px;
`;

export const ReviewTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const ReviewContent = styled.div`
  font-size: 16px;
  margin-top: 20px;
`;

export const ReviewAuthor = styled.p`
  font-size: 16px; /* 기본 폰트 크기 */
`;

export const ReviewDate = styled.p`
  font-size: 12px; /* 더 작은 폰트 크기 */
  color: gray;
  margin-top: -5px; /* 작성자와 가까워지도록 마진 조정 */
`;

export const ReviewPic = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
`;
