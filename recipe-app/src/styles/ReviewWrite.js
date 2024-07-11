import styled from 'styled-components';

export const ReviewWritePage = styled.div`
  padding: 20px;
`;

export const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReviewInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const ReviewTextarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 150px;
  resize: vertical;
`;

export const ReviewButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #DD6213;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
