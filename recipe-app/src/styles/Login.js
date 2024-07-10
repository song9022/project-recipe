import styled from 'styled-components';

export const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

export const LoginContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const LoginTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const LoginInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;

  &:focus {
    border-color: #93A9D1;
    outline: none;
  }
`;

export const LoginButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #93A9D1;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
