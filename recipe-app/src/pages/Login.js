import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginPage,
  LoginForm,
  LoginInput,
  LoginButton,
  LoginContainer,
  LoginTitle
} from '../styles/Login';
import { PiBreadBold } from "react-icons/pi";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 추가 (예: API 호출)
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <LoginPage>
      <LoginContainer>
        <PiBreadBold size={60} color='#93A9D1' />
        <LoginTitle>로그인</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <div>
            <label>이메일:</label>
            <LoginInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <LoginInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <LoginButton type="submit">로그인</LoginButton>
        </LoginForm>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
